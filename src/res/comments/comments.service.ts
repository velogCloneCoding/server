import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { UpdateCommentDto } from '../../dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}
  async create(body: CreateCommentDto, userId: number) {
    return await this.commentsRepository.save({
      userId,
      ...body,
    });
  }

  async findByArticleId(articleId: number) {
    const comments = await this.commentsRepository
      .createQueryBuilder('C')
      .select()
      .where('C.articleId = :articleId', { articleId })
      .getMany();

    return comments;
  }

  async findByUserId(userId: number) {
    const comments = await this.commentsRepository
      .createQueryBuilder('C')
      .select()
      .where('C.userId = :userId', { userId })
      .getMany();

    return comments;
  }

  async update(id: number, body: UpdateCommentDto, userId: number) {
    const isExist = await this.commentsRepository
      .createQueryBuilder('C')
      .select()
      .where('C.userId = :userId', { userId })
      .andWhere('C.id = :id', { id })
      .getOne();

    if (isExist) {
      await this.commentsRepository
        .createQueryBuilder()
        .update()
        .set({ contents: body.contents })
        .where('id = :id', { id })
        .execute();
    }
  }

  async remove(id: number, userId: number) {
    const softDeleteComment = await this.commentsRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId })
      .execute();
  }
}
