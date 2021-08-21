import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsRelationsService } from './comments-relations.service';
import { CreateCommentsRelationDto } from './dto/create-comments-relation.dto';
import { UpdateCommentsRelationDto } from './dto/update-comments-relation.dto';

@Controller('comments-relations')
export class CommentsRelationsController {
  constructor(private readonly commentsRelationsService: CommentsRelationsService) {}

  @Post()
  create(@Body() createCommentsRelationDto: CreateCommentsRelationDto) {
    return this.commentsRelationsService.create(createCommentsRelationDto);
  }

  @Get()
  findAll() {
    return this.commentsRelationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsRelationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentsRelationDto: UpdateCommentsRelationDto) {
    return this.commentsRelationsService.update(+id, updateCommentsRelationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsRelationsService.remove(+id);
  }
}
