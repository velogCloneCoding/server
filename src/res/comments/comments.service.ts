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

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
