// src/entities/question.entity.ts
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { QuestionOption } from './question-option.entity';

@Entity()
export class Question extends BaseEntityWithTimestamps {
  @Column('text')
  question: string;

  @Column('text', { nullable: true })
  question_arm: string;

  @Column({ nullable: true })
  question_rus: string;

  @Column({ nullable: true })
  question_ara: string;

  @Column()
  priority: number;

  @OneToMany(() => QuestionOption, (option) => option.question)
  options: QuestionOption[];
}
