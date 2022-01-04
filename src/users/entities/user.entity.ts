import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ApiProperty({
    description: '회원가입 날짜',
    example: '2022-02-22 22:22:22',
  })
  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date | null;

  @ApiProperty({
    description: '최근 유저정보 수정 날짜',
    example: '2022-02-22 22:22:22',
  })
  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date | null;

  @ApiProperty({
    description: '회원탈퇴 날짜',
    example: '2022-02-22 22:22:22',
  })
  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt: Date | null;

  @OneToMany(() => Articles, (articles) => articles.users)
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.users)
  comments: Comments[];

  // @ManyToMany(() => Desk, (desk) => desk.users)
  // @JoinTable({
  //   name: 'user_has_desks', // 테이블 이름
  //   joinColumn: { name: 'user_id', referencedColumnName: 'idx' },
  //   inverseJoinColumn: { name: 'desk_id', referencedColumnName: 'idx' },
  // })
  // desks: Desk[];
}
