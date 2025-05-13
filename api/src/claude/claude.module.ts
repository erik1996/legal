import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from 'src/entities/question-option.entity';
import { Question } from 'src/entities/question.entity';
import { Role } from 'src/entities/role.entity';
import { TopicQuery } from 'src/entities/topic-query.entity';
import { Topic } from 'src/entities/topic.entity';
import { ClaudeController } from './claude.controller';
import { ClaudeService } from './claude.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      Question,
      QuestionOption,
      Topic,
      TopicQuery,
      Role,
    ]),
  ],
  controllers: [ClaudeController],
  providers: [ClaudeService],
})
export class ClaudeModule {}
