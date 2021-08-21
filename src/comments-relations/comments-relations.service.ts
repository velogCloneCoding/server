import { Injectable } from '@nestjs/common';
import { CreateCommentsRelationDto } from './dto/create-comments-relation.dto';
import { UpdateCommentsRelationDto } from './dto/update-comments-relation.dto';

@Injectable()
export class CommentsRelationsService {
  create(createCommentsRelationDto: CreateCommentsRelationDto) {
    return 'This action adds a new commentsRelation';
  }

  findAll() {
    return `This action returns all commentsRelations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentsRelation`;
  }

  update(id: number, updateCommentsRelationDto: UpdateCommentsRelationDto) {
    return `This action updates a #${id} commentsRelation`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentsRelation`;
  }
}
