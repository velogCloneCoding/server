import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from '../../articles/entities/article.entity';
import { Comments } from '../../comments/entities/comment.entity';

@Index('githubId_UNIQUE', ['githubId'], { unique: true })
@Entity('USERS', { schema: 'velog' })
export class Users {
  @ApiProperty({ description: '유저 index' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @ApiProperty({
    description: '유저 Github 아이디',
    example: '준비중입니다.',
  })
  @Column('int', { name: 'GITHUB_ID', nullable: true, unique: true })
  githubId: number | null;

  @ApiProperty({
    description: 'Github 프로필사진',
    example: '준비중입니다.',
  })
  @Column('longtext', { name: 'GITHUB_PROFILE', nullable: true })
  githubProfile: string | null;

  @ApiProperty({
    description: '회원가입 날짜',
    example: '2022-02-22 22:22:22',
  })
  @Column('timestamp', {
    name: 'CREATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ApiProperty({
    description: '최근 유저정보 수정 날짜',
    example: '2022-02-22 22:22:22',
  })
  @Column('timestamp', { name: 'UPDATED_AT', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({
    description: '회원탈퇴 날짜',
    example: '2022-02-22 22:22:22',
  })
  @Column('timestamp', { name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @ApiProperty({
    description: '이메일',
    example: 'example@gmail.com',
  })
  @Column('varchar', { name: 'EMAIL', nullable: true, length: 45 })
  email: string | null;

  @ApiProperty({
    description: '비밀번호',
    example: '1234567890!',
  })
  @Column('varchar', {
    name: 'PASSWORD',
    nullable: true,
    length: 200,
    select: false,
  })
  password: string | null;

  @OneToMany(() => Articles, (articles) => articles.users)
  @JoinColumn()
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.users)
  @JoinColumn()
  comments: Comments[];
}
