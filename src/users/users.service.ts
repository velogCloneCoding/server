import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      password: hashedPassword,
    });
  }

  logIn(email: string, password: string) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.usersRepository
      .createQueryBuilder('U')
      .select([
        'U.id',
        'U.githubId',
        'U.githubProfile',
        'U.email',
        'A.id',
        'A.title',
        'A.createdAt',
        'A.hits',
        'C.id',
        'C.contents',
        'C.createdAt',
        'C.articlesId',
      ])
      .innerJoin('U.articles', 'A')
      .innerJoin('U.comments', 'C')
      .getMany();

    const [userInfo] = user;

    console.log(userInfo);

    return userInfo;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
