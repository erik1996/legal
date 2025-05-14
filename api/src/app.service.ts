/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { QuestionOption } from './entities/question-option.entity';
import { Question } from './entities/question.entity';
import { Role } from './entities/role.entity';
import { Topic } from './entities/topic.entity';

@Injectable()
export class AppService {
  private readonly apiUrl: string;

  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Topic>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('COUNTRY_API') || '';
  }

  async getAllRoles(lang: string) {
    const roles = await this.roleRepo.find();

    return roles.map((role) => ({
      id: role.id,
      name: this.getTranslatedRoleName(role as unknown as Role, lang),
    }));
  }

  private getTranslatedRoleName(role: Role, lang: string): string {
    switch (lang) {
      case 'arm':
        return role.name_arm?.trim() || role.name;
      case 'rus':
        return role.name_rus?.trim() || role.name;
      case 'ara':
        return role.name_ara?.trim() || role.name;
      default:
        return role.name;
    }
  }

  async getCountriesByLangClaudeStyle(
    lang: string,
  ): Promise<{ code: string; name: string }[]> {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (lang === 'arm') {
      lang = 'cym';
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, { headers }),
      );

      const countries = response.data
        .map((country: any) => ({
          code: country.cca2,
          name: country.translations?.[lang]?.common,
        }))
        .filter((c: any) => c.name)
        .sort((a, b) => a.name.localeCompare(b.name, lang));

      if (!countries.length) {
        throw new BadRequestException(
          `No country names found for language code "${lang}"`,
        );
      }

      return countries;
    } catch (error: any) {
      console.error(
        'Error calling country API:',
        error?.response?.data || error,
      );
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new BadRequestException(
        'Something went wrong while fetching countries',
      );
    }
  }

  async getAllQuestionsWithOptions(lang: string) {
    const questions = await this.questionRepo.find({
      order: { priority: 'ASC' },
      relations: ['options'],
    });

    return questions.map((question) => ({
      id: question.id,
      question: this.getTranslatedQuestion(question, lang),
      priority: question.priority,
      options: question.options.map((opt) => ({
        id: opt.id,
        option: this.getTranslatedOption(opt, lang),
      })),
    }));
  }

  private getTranslatedQuestion(question: Question, lang: string): string {
    switch (lang) {
      case 'arm':
        return question.question_arm?.trim() || question.question;
      case 'rus':
        return question.question_rus?.trim() || question.question;
      case 'ara':
        return question.question_ara?.trim() || question.question;
      default:
        return question.question;
    }
  }

  private getTranslatedOption(option: QuestionOption, lang: string): string {
    switch (lang) {
      case 'arm':
        return option.option_arm?.trim() || option.option;
      case 'rus':
        return option.option_rus?.trim() || option.option;
      case 'ara':
        return option.option_ara?.trim() || option.option;
      default:
        return option.option;
    }
  }

  async createTopic(data: CreateTopicDto): Promise<Topic> {
    const topic = this.topicRepo.create(data);
    return await this.topicRepo.save(topic);
  }
}
