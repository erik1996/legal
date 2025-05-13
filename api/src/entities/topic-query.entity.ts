import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { Topic } from './topic.entity';

@Entity()
export class TopicQuery extends BaseEntityWithTimestamps {
  @Column()
  topicId: number;

  @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
  topic: Topic;

  @Column('text')
  userQuestion: string;

  @Column('text', { nullable: true }) // optional before AI responds
  aiResponse: string;
}
