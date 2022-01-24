import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from './article.entity';
import { Users } from './user.entity';

@Entity('ARTICLE_HITS', { schema: 'velog' })
export class ArticleHits extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'article_id' })
  articleId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => Articles, (articles) => articles.articleHits)
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  articles: Articles;

  @ManyToOne(() => Users, (users) => users.articleHits)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;
}
