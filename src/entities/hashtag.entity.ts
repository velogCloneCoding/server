import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticlesHasHashtags } from './relation/article-has-hashtag.entity';

@Entity('HASHTAGS', { schema: 'velog' })
export class Hashtags extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 15 })
  name: string;

  @OneToMany(
    () => ArticlesHasHashtags,
    (articlesHasHashtags) => articlesHasHashtags.hashtag,
  )
  articlesHasHashtags: ArticlesHasHashtags[];
}
