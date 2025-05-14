import { Column, Entity } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';

@Entity()
export class Role extends BaseEntityWithTimestamps {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  name_arm?: string;

  @Column({ nullable: true })
  name_rus?: string;

  @Column({ nullable: true })
  name_ara?: string;

  @Column('text')
  systemMessage: string;
}
