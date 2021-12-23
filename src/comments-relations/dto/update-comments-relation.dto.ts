import { PartialType } from '@nestjs/swagger';
import { CreateCommentsRelationDto } from './create-comments-relation.dto';

export class UpdateCommentsRelationDto extends PartialType(
  CreateCommentsRelationDto,
) {}
