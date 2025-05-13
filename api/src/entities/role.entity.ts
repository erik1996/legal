import { Column, Entity } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';

@Entity()
export class Role extends BaseEntityWithTimestamps {
  @Column({ unique: true })
  name: string;

  @Column('text')
  systemMessage: string;
}
