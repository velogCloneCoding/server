import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Articles } from './article.entity';
import { Users } from './user.entity';

@Index('fk_COMMENTS_ARTICLES1_idx', ['articleId'], {})
@Index('fk_COMMENTS_USERS1_idx', ['userId'], {})
@Entity('COMMENTS', { schema: 'velog' })
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('longtext', { name: 'contents' })
  contents: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'article_id' })
  articleId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'parent_id', nullable: true })
  parentId: number;

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

  @OneToOne(() => Comments, (comments) => comments.comments)
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  comments: Comments;
}
