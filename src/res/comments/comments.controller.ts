import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
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

  //NOTE : 게시글의 댓글 가져오기
  @Get(':articleId')
  async findCommentsInArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    return await this.commentsService.findByArticleId(articleId);
  }

  //NOTE : 유저의 댓글 가져오기
  @Get()
  @UseGuards(JwtAuthGuard)
  async findUserComments(@User() user) {
    return await this.commentsService.findByUserId(user.id);
  }

  //NOTE : 댓글 수정
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
    @User() user,
  ) {
    return await this.commentsService.update(id, body, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number, @User() user) {
    return await this.commentsService.remove(id, user.id);
  }
}
