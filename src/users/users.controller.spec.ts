import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// class MockUserRepository {}

class MockAuthService {}
class MockUserRepository {
  find() {
    return { comments: 1, articles: 1, c: undefined };
  }
}

describe('UsersController', () => {
  let controller: UsersController;
  // let service: UsersService;

  const user = {
    id: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    // service = module.get<UsersService>(UsersService);
  });

  it('Get /users', async () => {
    expect(await controller.findOne(user.id)).toStrictEqual({
      comments: 1,
      articles: 1,
      c: undefined,
    });
  });
});
