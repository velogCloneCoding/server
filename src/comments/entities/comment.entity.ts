import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from '../../articles/entities/article.entity';
import { CommentsRelations } from '../../comments-relations/entities/comments-relation.entity';

@Index('fk_COMMENTS_ARTICLES1_idx', ['articlesId'], {})
@Entity('COMMENTS', { schema: 'velog' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'USER_ID' })
  userId: number;

  @Column('timestamp', {
    name: 'CREATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', { name: 'UPDATED_AT', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp', { name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'ARTICLES_ID' })
  articlesId: number;

  @ManyToOne(() => Articles, (articles) => articles.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'ARTICLES_ID', referencedColumnName: 'id' }])
  articles: Articles;

  @OneToOne(
    () => CommentsRelations,
    (commentsRelations) => commentsRelations.parent,
  )
  commentsRelations: CommentsRelations;

  @OneToOne(
    () => CommentsRelations,
    (commentsRelations) => commentsRelations.child,
  )
  commentsRelations2: CommentsRelations;
}
