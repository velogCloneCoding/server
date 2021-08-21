import { PickType } from '@nestjs/mapped-types';
import { Articles } from '../entities/article.entity';

export class UpdateArticleDto extends PickType(Articles, [
  'title',
  'contents',
  'tags',
  'usersId',
] as const) {}
