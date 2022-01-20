import { PickType } from '@nestjs/swagger';
import { Comments } from 'src/entities/comment.entity';

export class CreateCommentDto extends PickType(Comments, [
  'contents',
  'articleId',
  'parentId',
] as const) {}
