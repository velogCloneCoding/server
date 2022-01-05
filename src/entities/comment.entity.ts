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

@Index('fk_COMMENTS_ARTICLES1_idx', ['articlesId'], {})
@Index('fk_COMMENTS_USERS1_idx', ['usersId'], {})
@Entity('COMMENTS', { schema: 'velog' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('longtext', { name: 'CONTENTS' })
  contents: string;

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

  @Column('int', { name: 'USERS_ID' })
  usersId: number;

  @ManyToOne(() => Articles, (articles) => articles.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'ARTICLES_ID', referencedColumnName: 'id' }])
  articles: Articles;

  @ManyToOne(() => Users, (users) => users.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'USERS_ID', referencedColumnName: 'id' }])
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
