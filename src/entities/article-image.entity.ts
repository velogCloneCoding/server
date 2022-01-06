import {
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Articles } from './article.entity';

@Entity('ARTICLE_IMAGES', { schema: 'velog' })
export class ArticleImages {
  @PrimaryColumn('int', { name: 'article_id' })
  articleId: number;

  @PrimaryColumn('varchar', { name: 'img_url', length: 500 })
  imgUrl: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Articles, (articles) => articles.id)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  articles: Articles[];
}
