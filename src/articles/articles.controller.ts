import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  //게시글 생성 (글쓰기)
  @UseGuards(JwtAuthGuard)
  @Post()
  createArticle(@Body() body: CreateArticleDto, @User() user) {
    return this.articlesService.create(body.title, body.contents, user.id);
  }

  //자신의 게시글 목록 가져오기
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  //게시글 내용 가져오기
  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.articlesService.updateHit(+id);
    return await this.articlesService.findOne(+id);
  }

  //게시글 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return this.articlesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
