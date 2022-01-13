import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Comments } from './comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ArticleImages } from './article-image.entity';
import { ArticleLikes } from './article-like.entity';
import { ArticleHits } from './article-hit.entity';
import { SeriesArticlesHasArticles } from './relation/series-article-has-article.entity';
import { ArticlesHasHashtags } from './relation/article-has-hashtag.entity';

@Index('fk_ARTICLES_USERS_idx', ['userId'], {})
@Entity('ARTICLES', { schema: 'velog' })
export class Articles {
  @ApiProperty({
    description: '게시글 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
  })
  @Column('varchar', { name: 'title', length: 135 })
  @IsNotEmpty()
  @Length(1, 255)
  @IsString()
  title: string;

  @Column('varchar', { name: 'thumbnail', length: 500, nullable: true })
  thumbnail: string;

  @ApiProperty({
    example: '게시글 내용입니다.',
    description: '게시글 내용',
  })
  @Column('longtext', { name: 'contents' })
  contents: string;

  @ApiProperty({
    description: '게시글 생성 날짜',
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 수정 날짜',
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({
    description: '게시글 삭제 날짜',
  })
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ApiProperty({
    description: '게시글 작성자의 아이디',
  })
  @Column('int', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Comments, (comments) => comments.articles)
  comments: Comments[];

  @OneToMany(() => ArticleImages, (articleImages) => articleImages.articles)
  articleImages: ArticleImages[];

  @OneToMany(() => ArticleLikes, (articleLikes) => articleLikes.articles)
  articleLikes: ArticleLikes[];

  @OneToMany(() => ArticleHits, (articleHits) => articleHits.articles)
  articleHits: ArticleHits[];

  @OneToMany(
    () => SeriesArticlesHasArticles,
    (seriesArticlesHasArticles) => seriesArticlesHasArticles.articles,
  )
  seriesArticlesHasArticles: SeriesArticlesHasArticles[];

  @OneToMany(
    () => ArticlesHasHashtags,
    (articlesHasHashtags) => articlesHasHashtags.articles,
  )
  articlesHasHashtags: ArticlesHasHashtags[];
}
