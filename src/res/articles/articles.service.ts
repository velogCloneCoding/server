import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { UpdateArticleDto } from '../../dto/update-article.dto';
import { Articles } from '../../entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
  ) {}

  //Note: Article을 생성하는 로직입니다.
  async create(body: CreateArticleDto, userId: number) {
    return await this.articlesRepository.save({ ...body, userId });
  }

  async findAll(page: number) {
    const articles = await this.articlesRepository
      .createQueryBuilder('A')
      .select(['A.id', 'A.title', 'A.createdAt'])
      .offset(10 * (page - 1))
      .limit(10)
      .orderBy('A.createdAt', 'DESC')
      .getMany();

    return articles;
  }

  async findOne(id: number) {
    const article = await this.articlesRepository
      .createQueryBuilder('A')
      .select(['A.id', 'A.title', 'A.contents'])
      .withDeleted()
      .leftJoinAndMapOne('A.users', 'A.users', 'U', 'U.id = A.userId')
      .getMany();

    // const article = await this.articlesRepository
    //   .createQueryBuilder('A')
    //   .select([
    //     'A.id',
    //     'A.title',
    //     'A.contents',
    //     'A.createdAt',
    //     'A.userId',
    //     'A.hits',
    //   ])
    //   .innerJoinAndSelect('A.comments', 'C')
    //   .where('A.id = :id', { id })
    //   .getOne();

    return article;
  }

  async update(id: number, userId: number, body: UpdateArticleDto) {
    const [article] = await this.articlesRepository.find({
      where: { id, userId },
      take: 1,
    });

    if (!article) {
      throw new BadRequestException('해당하는 게시글이 없습니다.');
    }

    return await this.articlesRepository.update(id, body);
  }

  async remove(id: number, userId: number) {
    const softDeleteArticle = await this.articlesRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId })
      .execute();
  }

  //조회수는 따로 테이블을 만들 것.
  // async updateHit(id: number) {
  //   const hit = await this.articlesRepository
  //     .createQueryBuilder()
  //     .update()
  //     .set({ hits: () => 'hits + 1' })
  //     .where('id = :id', { id })
  //     .execute();
  // }
}
