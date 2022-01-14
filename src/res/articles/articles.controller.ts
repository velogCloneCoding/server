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
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserId } from 'src/decorators/userId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { UpdateArticleDto } from '../../dto/update-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  //게시글 생성 (글쓰기)
  @ApiOperation({ summary: '게시글 생성' })
  @ApiHeader({
    name: 'authorization',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() body: CreateArticleDto, @User() user) {
    return await this.articlesService.create(body, user.id);
  }

  //게시글 목록 가져오기
  @Get()
  async findAll(
    @Query('page', new ParseIntPipe(), new DefaultValuePipe(1)) page: number,
  ) {
    return await this.articlesService.findAll(page);
  }

  //게시글 내용 가져오기
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.articlesService.findOne(id);
  }

  //게시글 수정
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @UserId() userId: number,
    @Body() body: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, userId, body);
  }

  //게시글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
    @UserId() userId: number,
  ) {
    const deleteResponse = await this.articlesService.remove(id, userId);
    if (!deleteResponse.affected) {
      //나중에 익셉션부분 수정해줄 것(익셉션필터로)
      //affected때문에 일단은, service의 remove의 return 값을 줄수밖에없다.
      throw new NotFoundException();
    }
    return true;
  }

  @Get('test/:id')
  async test(@Param('id') id: string) {
    console.log('good');
    console.log();
    console.log();
    console.log();
    console.log();
    return await this.articlesService.findOne(+id);
  }
}
