import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { Question } from './question.entity';
import { Role } from './role.entity';

@Entity()
export class QuestionRole extends BaseEntityWithTimestamps {
  @Column()
  questionId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
