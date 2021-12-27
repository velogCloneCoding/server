import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Comments } from '../../comments/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('fk_ARTICLES_USERS_idx', ['usersId'], {})
@Entity('ARTICLES', { schema: 'velog' })
export class Articles {
  @ApiProperty({
    description: '게시글 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
  })
  @Column('varchar', { name: 'TITLE', length: 135 })
  title: string;

  @ApiProperty({
    example: '게시글 내용입니다.',
    description: '게시글 내용',
  })
  @Column('longtext', { name: 'CONTENTS' })
  contents: string;

  @ApiProperty({
    description: '게시글 생성 날짜',
  })
  @Column('timestamp', {
    name: 'CREATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ApiProperty({
    description: '게시글 수정 날짜',
  })
  @UpdateDateColumn({ type: 'timestamp', name: 'UPDATED_AT', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({
    description: '게시글 삭제 날짜',
  })
  @DeleteDateColumn({ type: 'timestamp', name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @ApiProperty({
    description: '게시글 작성자의 아이디',
  })
  @Column('int', { name: 'USERS_ID' })
  usersId: number;

  @ApiProperty({
    example: 10,
    description: '조회수',
  })
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
