import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { Question } from './question.entity';

@Entity()
export class QuestionOption extends BaseEntityWithTimestamps {
  @Column('text')
  option: string;

  @Column({ nullable: true })
  option_arm?: string;

  @Column({ nullable: true })
  option_rus?: string;

  @Column({ nullable: true })
  option_ara?: string;

  @Column()
  questionId: number;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: Question;
}
