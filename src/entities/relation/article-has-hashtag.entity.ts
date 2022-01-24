import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Articles } from '../article.entity';
import { Hashtags } from '../hashtag.entity';

@Index('fk_ARTICLES_HAS_HASHTAGS_TO_HASHTAGS_idx', ['hashtagId'], {})
@Entity('ARTICLES_HAS_HASHTAGS', { schema: 'velog' })
export class ArticlesHasHashtags extends BaseEntity {
  @PrimaryColumn('int', { name: 'article_id' })
  articleId: number;

  @PrimaryColumn('int', { name: 'hashtag_id' })
  hashtagId: number;

  @ManyToOne(() => Articles, (articles) => articles.articlesHasHashtags)
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  articles: Articles;

  @ManyToOne(() => Hashtags, (hashtags) => hashtags.articlesHasHashtags)
  @JoinColumn([{ name: 'hashtag_id', referencedColumnName: 'id' }])
  hashtag: Hashtags;
}
