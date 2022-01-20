import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { UpdateCommentDto } from '../../dto/update-comment.dto';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //NOTE : 댓글작성
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateCommentDto, @User() user) {
    return await this.commentsService.create(body, user.id);
  }

  @Get(':articleId')
  async findCommentsInArticle(
    @Param('articleId', new ParseIntPipe()) articleId: number,
  ) {
    return await this.commentsService.findByArticleId(articleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
