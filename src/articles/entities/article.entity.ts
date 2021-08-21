import { Comments } from '../../comments/entities/comment.entity';
import { Users } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@Index('fk_ARTICLES_USERS_idx', ['usersId'], {})
@Entity('ARTICLES', { schema: 'velog' })
export class Articles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @IsNotEmpty()
  @Length(0, 135)
  @IsString()
  @Column('varchar', { name: 'TITLE', length: 135 })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column('longtext', { name: 'CONTENTS' })
  contents: string;

  @IsOptional()
  @IsString()
  @Column('longtext', { name: 'TAGS', nullable: true })
  tags: string | null;

  @Column('timestamp', {
    name: 'CREATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', { name: 'UPDATED_AT', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp', { name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @IsNumber()
  @Column('int', { name: 'USERS_ID' })
  usersId: number;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'USERS_ID', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Comments, (comments) => comments.articles)
  comments: Comments[];
}
