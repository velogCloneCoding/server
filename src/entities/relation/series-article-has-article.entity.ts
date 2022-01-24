import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Articles } from '../article.entity';
import { SeriesArticles } from '../series-article.entity';

@Entity('SERIES_ARTICLES_HAS_ARTICLES', { schema: 'velog' })
export class SeriesArticlesHasArticles extends BaseEntity {
  @PrimaryColumn('int', { name: 'series_id' })
  seriesId: number;

  @PrimaryColumn('int', { name: 'article_id' })
  articleId: number;

  @ManyToOne(
    () => SeriesArticles,
    (seriesArticles) => seriesArticles.seriesArticlesHasArticles,
  )
  @JoinColumn([{ name: 'series_id', referencedColumnName: 'id' }])
  seriesArticles: SeriesArticles;

  @ManyToOne(() => Articles, (articles) => articles.seriesArticlesHasArticles)
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  articles: Articles;
}
