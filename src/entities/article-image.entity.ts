import {
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Articles } from './article.entity';

// @Index('fk_ARTICLE_IMAGES_ARTICLES_idx', ['articleId'], {})
@Entity('ARTICLE_IMAGES', { schema: 'velog' })
export class ArticleImages {
  @PrimaryColumn('int', { name: 'article_id' })
  articleId: number;

  @PrimaryColumn('varchar', { name: 'img_url', length: 500 })
  imgUrl: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Articles, (articles) => articles.articleImages)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  articles: Articles;
}
