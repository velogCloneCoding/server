import {
  Column,
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

  @Column('varchar', { name: 'thumbnail', length: 500 })
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
  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

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

  @ApiProperty({
    example: 10,
    description: '조회수',
  })
  @Column('int', { name: 'hits', default: () => "'0'" })
  hits: number;

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
}
