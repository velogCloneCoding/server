import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { Users } from '../../entities/user.entity';
import { UsersService } from './users.service';

class MockUserRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Users), useClass: MockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne은 id를 받아서 해당 user의 articles와 comments들을 가져옴', () => {
    expect(service.findOne(1)).resolves.toEqual({
      id: 1,
      githubId: null,
      githubProfile: null,
      createdAt: '2021-09-29T01:18:56.000Z',
      updatedAt: null,
      deletedAt: null,
      email: '8471919@naver.com',
      articles: [
        {
          id: 1,
          title: '한수의 첫 번째 게시물',
          contents: '한수의 첫 번째 게시물의 첫 내용입니다.',
          createdAt: '2021-09-29T01:18:56.000Z',
          updatedAt: null,
          deletedAt: null,
          usersId: 1,
          hits: 0,
        },
        {
          id: 2,
          title: '한수의 두 번째 게시물',
          contents: '한수의 두 번째 게시물의 내용입니다.',
          createdAt: '2021-09-29T01:18:56.000Z',
          updatedAt: null,
          deletedAt: null,
          usersId: 1,
          hits: 0,
        },
        {
          id: 3,
          title: '한수의 세 번째 게시글입니다.',
          contents: '한수의 세 번째 게시글 내용입니다.',
          createdAt: '2021-10-07T00:56:28.000Z',
          updatedAt: null,
          deletedAt: null,
          usersId: 1,
          hits: 0,
        },
      ],
      comments: [
        {
          id: 1,
          contents: '첫 댓글 내용입니다.',
          createdAt: '2021-09-29T01:18:56.000Z',
          updatedAt: null,
          deletedAt: null,
          articlesId: 1,
          usersId: 1,
        },
        {
          id: 2,
          contents: '두 번째 댓글 내용입니다.',
          createdAt: '2021-09-29T01:18:56.000Z',
          updatedAt: null,
          deletedAt: null,
          articlesId: 1,
          usersId: 1,
        },
      ],
    });
  });

  it('findOne은 유저를 못 찾으면 null을 반환해야 함', () => {
    expect(service.findOne(0)).resolves.toBe(null);
  });
});
