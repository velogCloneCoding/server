import { PickType } from '@nestjs/swagger';
import { Articles } from '../entities/article.entity';

export class UpdateArticleDto extends PickType(Articles, [
  'title',
  'contents',
] as const) {}
