import { Module } from '@nestjs/common';
import { CommentsRelationsService } from './comments-relations.service';
import { CommentsRelationsController } from './comments-relations.controller';

@Module({
  controllers: [CommentsRelationsController],
  providers: [CommentsRelationsService]
})
export class CommentsRelationsModule {}
