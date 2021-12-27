import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  //게시글 생성 (글쓰기)
  @ApiOperation({ summary: '게시글 생성' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createArticle(@Body() body: CreateArticleDto, @User() user) {
    return this.articlesService.create(body.title, body.contents, user.id);
  }

  //게시글 목록 가져오기
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  //게시글 내용 가져오기
  @Get(':id')
  async findOne(@Param('id') id: string) {
    //나중에 파이프를 사용해서 @Param('id, new ParseIntPipe()) id : number 이렇게 고치자
    await this.articlesService.updateHit(+id);
    return await this.articlesService.findOne(+id);
  }

  //게시글 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @User() user,
    @Body() body: UpdateArticleDto,
  ) {
    const updateResponse = await this.articlesService.update(
      +id,
      user.id,
      body.title,
      body.contents,
    );
    if (!updateResponse) {
      //나중에 익셉션필터를 만들어 넣어줄 것
      throw new NotFoundException();
    }

    return true;
  }

  //게시글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    const deleteResponse = await this.articlesService.remove(+id, user.id);
    if (!deleteResponse.affected) {
      //나중에 익셉션부분 수정해줄 것(익셉션필터로)
      throw new NotFoundException();
    }
    return true;
  }
}
