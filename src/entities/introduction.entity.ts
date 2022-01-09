import {
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
export class Introductions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'contents' })
  contents: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date | null;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToOne(() => Users, (users) => users.introductions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users;
}
