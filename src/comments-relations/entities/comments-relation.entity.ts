import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Comments } from '../../entities/comment.entity';

@Index('CHILD_UNIQUE', ['child'], { unique: true })
@Index('fk_COMMENTS_has_COMMENTS_COMMENTS2_idx', ['child'], {})
@Index('fk_COMMENTS_has_COMMENTS_COMMENTS1_idx', ['parent'], {})
@Entity('COMMENTS_RELATIONS', { schema: 'velog' })
export class CommentsRelations {
  @Column('int', { name: 'PARENT', nullable: true })
  parent: number | null;

  @PrimaryColumn({ type: 'int', name: 'CHILD' })
  child: number | null;

  @ManyToOne(() => Comments, (comments) => comments.commentsRelations, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'PARENT', referencedColumnName: 'id' }])
  parent2: Comments;

  @OneToOne(() => Comments, (comments) => comments.commentsRelations2, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'CHILD', referencedColumnName: 'id' }])
  child2: Comments;
}
