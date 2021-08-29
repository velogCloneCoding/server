import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from '../../articles/entities/article.entity';
import { Comments } from '../../comments/entities/comment.entity';

@Index('githubId_UNIQUE', ['githubId'], { unique: true })
@Entity('USERS', { schema: 'velog' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'GITHUB_ID', nullable: true, unique: true })
  githubId: number | null;

  @Column('longtext', { name: 'GITHUB_PROFILE', nullable: true })
  githubProfile: string | null;

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

  @Column('varchar', { name: 'EMAIL', nullable: true, length: 45 })
  email: string | null;

  @Column('varchar', { name: 'PASSWORD', nullable: true, length: 200 })
  password: string | null;

  @OneToMany(() => Articles, (articles) => articles.users)
  articles: Articles[];

  @OneToMany(() => Comments, (comments) => comments.users)
  comments: Comments[];
}
