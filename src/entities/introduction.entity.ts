import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('INTRODUCTION', { schema: 'velog' })
export class Introductions extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'contents', nullable: true })
  contents: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToOne(() => Users, (users) => users.introductions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users;
}
