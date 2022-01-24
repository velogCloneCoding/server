import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleHits } from './article-hit.entity';
import { Articles } from './article.entity';
import { Comments } from './comment.entity';
import { Introductions } from './introduction.entity';
import { SeriesArticles } from './series-article.entity';

@Index('oauthId_UNIQUE', ['oauthId'], { unique: true })
@Entity('USERS', { schema: 'velog' })
export class Users extends BaseEntity {
  @ApiProperty({ description: '유저 index' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    description: '유저 OAuth 아이디',
    example: '준비중입니다.',
  })
  @Column('varchar', {
    name: 'oauth_id',
    nullable: true,
    length: 45,
    unique: true,
  })
  oauthId: string | null;

  @ApiProperty({
    description: '프로필사진',
    example: '준비중입니다.',
  })
  @Column('varchar', { name: 'profile', nullable: true, length: 500 })
  profile: string | null;

  @ApiProperty({
    description: '이메일',
    example: 'example@gmail.com',
  })
  @Column('varchar', { name: 'email', nullable: true, length: 45 })
  email: string | null;

  @ApiProperty({
    description: '비밀번호',
    example: '1234567890!',
  })
  @Column('varchar', {
    name: 'password',
    nullable: true,
    length: 200,
    select: false,
  })
  password: string | null;

  @ApiProperty({
    description: '회원가입 날짜',
    example: '2022-02-22 22:22:22',
  })
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: '최근 유저정보 수정 날짜',
    example: '2022-02-22 22:22:22',
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({
    description: '회원탈퇴 날짜',
    example: '2022-02-22 22:22:22',
  })
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Articles, (articles) => articles.users)
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.users)
  comments: Comments[];

  @OneToMany(() => ArticleHits, (articleHits) => articleHits.users)
  articleHits: ArticleHits[];

  @OneToOne(() => Introductions, (introductions) => introductions.users)
  introductions: Introductions;

  @OneToMany(() => SeriesArticles, (seriesArticles) => seriesArticles.users)
  seriesArticles: SeriesArticles[];

  // @ManyToMany(() => Desk, (desk) => desk.users)
  // @JoinTable({
  //   name: 'user_has_desks', // 테이블 이름
  //   joinColumn: { name: 'user_id', referencedColumnName: 'idx' },
  //   inverseJoinColumn: { name: 'desk_id', referencedColumnName: 'idx' },
  // })
  // desks: Desk[];
}
