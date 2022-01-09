import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticlesHasHashtags } from './relation/article-has-hashtag.entity';

@Entity('HASHTAGS', { schema: 'velog' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @OneToMany(
    () => ArticlesHasHashtags,
    (articlesHasHashtags) => articlesHasHashtags.hashtag,
  )
  articlesHasHashtags: ArticlesHasHashtags[];
}
