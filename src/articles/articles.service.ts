import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Articles } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
  ) {}

  //Note: Article을 생성하는 로직입니다.
  async create(title: string, contents: string, usersId: number) {
    return await this.articlesRepository.save({
      title,
      contents,
      usersId,
    });
  }

  async findAll() {
    const articles = await this.articlesRepository.find();
    return articles;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
