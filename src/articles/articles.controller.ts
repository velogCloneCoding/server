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

  //Note: 게시글 생성 (글쓰기)
  @UseGuards(JwtAuthGuard)
  @Post()
  createArticle(@Body() body: CreateArticleDto, @User() user) {
    return this.articlesService.create(body.title, body.contents, user.id);
  }

  @Get()
  findAll() {
    // return this.articlesService.findAll();
    return { name: 'kakasoo', age: 25 };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
