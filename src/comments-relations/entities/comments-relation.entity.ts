import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Comments } from '../../comments/entities/comment.entity';

@Index('PARENT_UNIQUE', ['parentId'], { unique: true })
@Index('fk_COMMENTS_has_COMMENTS_COMMENTS2_idx', ['childId'], {})
@Index('fk_COMMENTS_has_COMMENTS_COMMENTS1_idx', ['parentId'], {})
@Entity('COMMENTS_RELATIONS', { schema: 'velog' })
export class CommentsRelations {
  @Column('int', { name: 'PARENT_ID', nullable: true, unique: true })
  parentId: number | null;

  @Column('int', { primary: true, name: 'CHILD_ID' })
  childId: number;

  @OneToOne(() => Comments, (comments) => comments.commentsRelations, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'PARENT_ID', referencedColumnName: 'id' }])
  parent: Comments;

  @OneToOne(() => Comments, (comments) => comments.commentsRelations2, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'CHILD_ID', referencedColumnName: 'id' }])
  child: Comments;
}
