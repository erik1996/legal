// src/app.module.ts
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaudeModule } from './claude/claude.module';
import { QuestionOption } from './entities/question-option.entity';
import { Question } from './entities/question.entity';
import { Role } from './entities/role.entity';
import { Topic } from './entities/topic.entity';
import { AppDataSource } from './lib/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ClaudeModule,
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([Question, QuestionOption, Topic, Role]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
