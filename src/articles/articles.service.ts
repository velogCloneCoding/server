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
    const articles = await this.articlesRepository
      .createQueryBuilder('A')
      .select(['A.id', 'A.title', 'A.createdAt'])
      .orderBy('A.id', 'DESC')
      .limit(10)
      .getMany();

    return articles;
  }

  async findOne(id: number) {
    const article = await this.articlesRepository
      .createQueryBuilder('A')
      .select([
        'A.id',
        'A.title',
        'A.contents',
        'A.createdAt',
        'A.usersId',
        'A.hits',
      ])
      .innerJoinAndSelect('A.comments', 'C')
      .where('A.id = :id', { id })
      .getOne();

    return article;
  }

  async update(id: number, userId: number, title: string, contents: string) {
    const updateArticle = await this.articlesRepository
      .createQueryBuilder()
      .update()
      .set({ title, contents })
      .where('id = :id', { id })
      .andWhere('usersId = :userId', { userId })
      .execute();

    return updateArticle;
  }

  async remove(id: number, userId: number) {
    const softDeleteArticle = await this.articlesRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .andWhere('usersId = :userId', { userId })
      .execute();

    return softDeleteArticle;
  }

  async updateHit(id: number) {
    const hit = await this.articlesRepository
      .createQueryBuilder()
      .update()
      .set({ hits: () => 'hits + 1' })
      .where('id = :id', { id })
      .execute();
    return true;
  }
}
