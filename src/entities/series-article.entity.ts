import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeriesArticlesHasArticles } from './relation/series-article-has-article.entity';
import { Users } from './user.entity';

@Entity('SERIES_ARTICLES', { schema: 'velog' })
export class SeriesArticles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'thumbnail', length: 500, nullable: true })
  thumbnail: string;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp', name: ' deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => Users, (users) => users.seriesArticles)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(
    () => SeriesArticlesHasArticles,
    (seriesArticlesHasArticles) => seriesArticlesHasArticles.seriesArticles,
  )
  seriesArticlesHasArticles: SeriesArticlesHasArticles[];
}
