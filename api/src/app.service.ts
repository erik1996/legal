/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
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

  async getAllRoles() {
    return this.roleRepo.find({
      select: ['id', 'name'],
    });
  }

  async getCountriesByLangClaudeStyle(
    lang: string,
  ): Promise<{ code: string; name: string }[]> {
    const headers = {
      'Content-Type': 'application/json',
    };

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

  getAllQuestionsWithOptions() {
    return this.questionRepo.find({
      order: { priority: 'ASC' },
      relations: ['options'],
    });
  }

  async createTopic(data: CreateTopicDto): Promise<Topic> {
    const topic = this.topicRepo.create(data);
    return await this.topicRepo.save(topic);
  }
}
