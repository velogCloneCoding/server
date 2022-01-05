import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from './article.entity';
import { Users } from './user.entity';
import { CommentsRelations } from '../comments-relations/entities/comments-relation.entity';

@Index('fk_COMMENTS_ARTICLES1_idx', ['articleId'], {})
@Index('fk_COMMENTS_USERS1_idx', ['userId'], {})
@Entity('COMMENTS', { schema: 'velog' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('longtext', { name: 'contents' })
  contents: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'article_id' })
  articleId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => Articles, (articles) => articles.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  articles: Articles;

  @ManyToOne(() => Users, (users) => users.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(
    () => CommentsRelations,
    (commentsRelations) => commentsRelations.parent2,
  )
  commentsRelations: CommentsRelations[];

  @OneToOne(
    () => CommentsRelations,
    (commentsRelations) => commentsRelations.child2,
  )
  commentsRelations2: CommentsRelations;
}
