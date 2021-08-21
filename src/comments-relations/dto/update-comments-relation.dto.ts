import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsRelationDto } from './create-comments-relation.dto';

export class UpdateCommentsRelationDto extends PartialType(CreateCommentsRelationDto) {}
