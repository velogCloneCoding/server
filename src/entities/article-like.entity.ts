import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Articles } from './article.entity';

@Entity('ARTICLE_LIKES', { schema: 'velog' })
export class ArticleLikes {
  @PrimaryColumn('int', { name: 'article_id' })
  articleId: number;

  @PrimaryColumn('int', { name: 'user_id' })
  userId: number;

  @Column('tinyint', { name: 'is_like' })
  isLike: boolean;

  @ManyToOne(() => Articles, (articles) => articles.articleLikes)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  articles: Articles;
}
