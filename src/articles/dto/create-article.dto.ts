import { PickType } from '@nestjs/mapped-types';
import { Articles } from '../entities/article.entity';

export class CreateArticleDto extends PickType(Articles, [
  'title',
  'contents',
  'tags',
  'usersId',
] as const) {}
