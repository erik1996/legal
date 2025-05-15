/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { QuestionOption } from 'src/entities/question-option.entity';
import { Question } from 'src/entities/question.entity';
import { Role } from 'src/entities/role.entity';
import { TopicQuery } from 'src/entities/topic-query.entity';
import { Topic } from 'src/entities/topic.entity';
import { In, Repository } from 'typeorm';
import { LegalQueryInput } from './dto/legal-query';

@Injectable()
export class ClaudeService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly fallbackSystemMessage: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
    @InjectRepository(TopicQuery)
    private readonly topicQueryRepo: Repository<TopicQuery>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(QuestionOption)
    private readonly optionRepo: Repository<QuestionOption>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('CLAUDE_API_KEY') || '';
    this.apiUrl = this.configService.get<string>('CLAUDE_API_URL') || '';
    this.fallbackSystemMessage = 'You are a helpful legal assistant.';
  }

  async getAnswerFromClaude(
    input: LegalQueryInput,
    lang: string,
  ): Promise<string> {
    const topic = await this.topicRepo.findOne({
      where: { id: input.topicId },
    });
    if (!topic) return 'Topic not found';

    const role = await this.roleRepo.findOne({ where: { id: topic.roleId } });

    const previousQueries = await this.topicQueryRepo.find({
      where: { topicId: topic.id },
      order: { createdAt: 'ASC' },
    });

    let userPrompt = input.question;

    if (previousQueries.length === 0) {
      const questionIds = topic.questionAnswerMap.map((q) => q.questionId);
      const answerIds = topic.questionAnswerMap.map((q) => q.answerId);

      const [questions, options] = await Promise.all([
        this.questionRepo.find({ where: { id: In(questionIds) } }),
        this.optionRepo.find({ where: { id: In(answerIds) } }),
      ]);

      const answerMap = topic.questionAnswerMap.map((pair) => {
        const question = questions.find(
          (q) => q.id === pair.questionId,
        )?.question;
        const answer = options.find((o) => o.id === pair.answerId)?.option;
        return { question, answer };
      });

      answerMap.unshift({ question: 'Country', answer: topic.country });
      userPrompt = this.buildLegalPrompt(input, answerMap);
    }

    if (lang !== 'cym') {
      userPrompt += `\n\nPlease answer this question in ${this.mapLangToLabel(
        lang,
      )} (${lang}).`;
    }

    const topicQuery = await this.topicQueryRepo.save({
      topicId: topic.id,
      userQuestion: userPrompt,
      aiResponse: '',
    });

    let messages = [
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    if (previousQueries.length > 0) {
      messages = [...this.buildPreviousMessages(previousQueries), ...messages];
    }

    const headers = {
      'x-api-key': this.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    };

    const body = {
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 10000,
      temperature: 0,
      system: role?.systemMessage || this.fallbackSystemMessage,
      messages,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, body, { headers }),
      );

      const aiText =
        response.data?.content?.[0]?.text || 'No response from Claude';

      await this.topicQueryRepo.update(
        { id: topicQuery.id },
        { aiResponse: aiText },
      );

      return aiText as Promise<string>;
    } catch (error: any) {
      console.error(
        'Error calling Claude API:',
        error?.response?.data || error,
      );
      return 'Something went wrong';
    }
  }

  private buildLegalPrompt(
    input: LegalQueryInput,
    answerMap: { question?: string; answer?: string }[],
  ): string {
    const contextLines = answerMap
      .filter((entry) => entry.question && entry.answer)
      .map((entry) => `- ${entry.question}: ${entry.answer}`);

    return `
${contextLines.join('\n')}

The question is:
"${input.question}"
    `.trim();
  }

  private buildPreviousMessages(queries: TopicQuery[]): {
    role: 'user' | 'assistant';
    content: string;
  }[] {
    return queries.flatMap((query) => {
      const messages: { role: 'user' | 'assistant'; content: string }[] = [];

      messages.push({
        role: 'user',
        content: query.userQuestion,
      });

      let aiContent = query.aiResponse;
      try {
        const parsed = JSON.parse(query.aiResponse);
        aiContent = parsed?.content?.[0]?.text ?? query.aiResponse;
      } catch {
        // leave aiContent as-is
      }

      messages.push({
        role: 'assistant',
        content: aiContent,
      });

      return messages;
    });
  }

  private mapLangToLabel(lang: string): string {
    switch (lang) {
      case 'arm':
        return 'Armenian';
      case 'rus':
        return 'Russian';
      case 'ara':
        return 'Arabic';
      default:
        return 'English';
    }
  }
}
