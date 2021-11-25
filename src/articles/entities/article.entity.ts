import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Comments } from '../../comments/entities/comment.entity';

@Index('fk_ARTICLES_USERS_idx', ['usersId'], {})
@Entity('ARTICLES', { schema: 'velog' })
export class Articles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'TITLE', length: 135 })
  title: string;

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

  @DeleteDateColumn({ type: 'timestamp', name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'USERS_ID' })
  usersId: number;

  @Column('int', { name: 'HITS', default: () => "'0'" })
  hits: number;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'USERS_ID', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Comments, (comments) => comments.articles)
  comments: Comments[];
}
