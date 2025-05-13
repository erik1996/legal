import { QuestionAnswerMap } from 'src/types/types';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { Role } from './role.entity';

@Entity()
export class Topic extends BaseEntityWithTimestamps {
  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ type: 'jsonb' })
  questionAnswerMap: QuestionAnswerMap[];

  @Column()
  roleId: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
