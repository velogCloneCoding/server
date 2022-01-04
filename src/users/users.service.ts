import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(body: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    await this.usersRepository.save({
      email: body.email,
      password: hashedPassword,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    // const user = await this.usersRepository
    //   .createQueryBuilder('U')
    //   .select([
    //     'U.id',
    //     'U.githubId',
    //     'U.githubProfile',
    //     'U.email',
    //     'A.id',
    //     'A.title',
    //     'A.createdAt',
    //     'A.hits',
    //     'C.id',
    //     'C.contents',
    //     'C.createdAt',
    //     'C.articlesId',
    //   ])
    //   .innerJoin('U.articles', 'A')
    //   .innerJoin('U.comments', 'C')
    //   .where('U.id = :id', { id })
    //   .getMany();
    // const [userInfo] = user;
    // console.log(userInfo);
    // return userInfo;
    // return await this.usersRepository
    //   .createQueryBuilder('user')
    //   .select()
    //   .leftJoinAndSelect(
    //     (qb) => {
    //       return qb.select().from(Articles, 'article');
    //     },
    //     'article',
    //     'user.ID = article.USERS_ID',
    //   )
    //   .where('user.ID = :id', { id })
    //   .getRawMany();

    // 레포지토리 패턴을 이용하기
    return await this.usersRepository.find({
      relations: ['articles', 'comments'],
      where: { id },
    });
    // 쿼리빌더 getRawMany, getMany
    // const [user] = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndMapMany(
    //     'user.articles',
    //     (qb) => {
    //       return qb.select().from(Articles, 'article');
    //     },
    //     'articles',
    //     'user.id = articles.usersId',
    //   )
    //   .select()
    //   .where({ id })
    //   .getMany();
    // return user;

    // // 성능 개선하기, 병렬 처리, 앱 조인
    // console.time('single');
    // await this.usersRepository.findOneOrFail(id);
    // console.timeEnd('single');
    // console.time('multiple');
    // const [user, articles, comments] = await Promise.all([
    //   this.usersRepository.findOneOrFail(id),
    //   this.articlesRepository.findOneOrFail(id),
    //   this.commnetsRepository.findOneOrFail(id),
    // ]).catch((err) => {
    //   throw new BadRequestException('promise join 시점에서 err 발생.');
    // });
    // console.timeEnd('multiple');
    // user.articles = aritcles;
    // user.comments = comments;
    // return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

// uesr.id seller shop(sellerId) products(shopId) article(productId)

// user join seller join shop join products join article where userID = 1

// const user = { userId : 1, sellerId : 2, shopId : 3};
// const products = await Promise.all(
//   productIds.map(async (id) => {
//     const product = await this.productsRepository.findOneOrFail(id);

//     const comments = await Promise.all(this.commentsRepositorty.find({where : {productId : id}}));
//     return (product.comments = comments), product;
//   })
// )
