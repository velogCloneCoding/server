import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/article.entity';
import { Comments } from 'src/entities/comment.entity';
import { Users } from 'src/entities/user.entity';
import { ArticlesController } from 'src/res/articles/articles.controller';
import { ArticlesService } from 'src/res/articles/articles.service';
import { CommentsController } from 'src/res/comments/comments.controller';
import { CommentsService } from 'src/res/comments/comments.service';
import { UsersController } from 'src/res/users/users.controller';
import { UsersService } from 'src/res/users/users.service';
import { UsersModule } from 'src/res/users/users.module';
import { ArticlesModule } from 'src/res/articles/articles.module';
import { CommentsModule } from 'src/res/comments/comments.module';
import * as dotenv from 'dotenv';

import { QueryFailedError } from 'typeorm';

dotenv.config();

describe('사용자에 대한 테스트입니다.', () => {
  let user: Users;
  let usersController: UsersController;
  let usersService: UsersService;

  let article: Articles;
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  let comments: Comments;
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE,
          host: process.env.DEVELOPMENT_DB_HOST,
          port: parseInt(process.env.DEVELOPMENT_DB_PORT),
          username: process.env.DEVELOPMENT_DB_USERNAME,
          password: process.env.DEVELOPMENT_DB_PASSWORD,
          database: process.env.DEVELOPMENT_DB_DATABASE,
          entities: ['src/entities/**/*.ts'],
          synchronize: false,
          dataStrings: true,
          logging: false,
          retryAttemps: 2,
        } as any),
        UsersModule,
        ArticlesModule,
        CommentsModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    usersController = await app.resolve<UsersController>(UsersController);
    usersService = await app.resolve<UsersService>(UsersService);

    articlesController = await app.resolve<ArticlesController>(
      ArticlesController,
    );
    articlesService = await app.resolve<ArticlesService>(ArticlesService);

    commentsController = await app.resolve<CommentsController>(
      CommentsController,
    );
    commentsService = await app.resolve<CommentsService>(CommentsService);
  });

  afterAll(async () => {
    await Comments.delete({ contents: '테스트 댓글입니다.' });
  });

  describe('0-. 테스트 준비', () => {
    it('0-1. Users의 Controller와 Service가 주입되었는지 확인합니다.', () => {
      expect(usersController).toBeDefined();
      expect(usersService).toBeDefined();
    });
    it('0-2. Articles의 Controller와 Service가 주입되었는지 확인합니다.', () => {
      expect(articlesController).toBeDefined();
      expect(articlesService).toBeDefined();
    });
    it('0-3. Comments의 Controller와 Service가 주입되었는지 확인합니다.', () => {
      expect(commentsController).toBeDefined();
      expect(commentsService).toBeDefined();
    });
  });

  describe('1-. Users 로직 테스트', () => {
    describe('1-1. Users 회원가입', () => {
      it.todo('1-1-1. 유저가 Local 회원가입을 성공합니다.');
      it.todo('1-1-2. 동일한 이메일로 회원가입하면 실패해야 합니다.');

      it.todo('1-1-3. 유저가 OAuth 회원가입을 성공합니다.');
      it.todo('1-1-4. 동일한 OAuth로 회원가입하면 실패해야 합니다.');
    });

    describe('1-2. Users 내 정보 조회', () => {
      it.todo('1-2-1. 내 정보 조회에 성공합니다.');
    });

    describe('1-3. Users 내 정보 수정', () => {
      it.todo('1-3-1. 내 정보 수정을 성공합니다.');
    });

    describe('1-4. Users 회원탈퇴', () => {
      it.todo('1-4-1. 회원탈퇴에 성공합니다.');
    });
  });

  describe('2-. Articles 로직 테스트', () => {
    describe('2-1. Articles 작성', () => {
      it.todo('2-1-1. 글작성에 성공합니다.');
      it.todo('2-1-2. 제목이 빈 게시글을 생성할 수 없습니다.');
      it.todo('2-1-3. 내용이 빈 게시글을 생성할 수 없습니다.');
    });

    describe('2-2. Articles 수정', () => {
      it.todo('2-2-1. 글수정에 성공합니다.');
      it.todo('2-2-2. 제목이 빈 상태로 게시글을 수정할 수 없습니다.');
      it.todo('2-2-3. 내용이 빈 상태로 게시글을 수정할 수 없습니다.');
    });

    describe('2-3. Articles 삭제', () => {
      it.todo('2-3-1. 글삭제에 성공합니다.');
      it.todo(
        '2-3-2. 동일한 게시글을 삭제하는 api가 연속으로 두번 날라올 경우',
      );
    });

    describe('2-4. Articles 목록 조회', () => {
      it.todo('2-4-1. 페이지별로 조회합니다.');
      it.todo('2-4-2. hashtag별로 조회합니다.');
      it.todo('2-4-3. 이번주  게시글 중, 좋아요가 많은 순으로 조회합니다.');
      it.todo('2-4-4. 이번달 게시글 중, 좋아요가 많은 순으로 조회합니다.');

      it.todo('2-4-5. 올해 게시글 중, 좋아요가 많은 순으로 조회합니다.');
    });

    describe('2-5. Articles 내용 조회', () => {
      it.todo('2-5-1. 게시글 조회에 성공합니다.');
    });
  });

  describe('3-. Comments 로직 테스트', () => {
    describe('3-1. Comments 작성', () => {
      it('3-1-1. 댓글 작성에 성공합니다.', async () => {
        await commentsController.create(
          1,
          {
            contents: '테스트 댓글입니다.',
            parentId: null,
          },
          { id: 11 },
        );

        const created = await Comments.createQueryBuilder('comment')
          .select()
          .where('comment.contents = :contents', {
            contents: '테스트 댓글입니다.',
          })
          .getOne();
        expect(created.contents).toBe('테스트 댓글입니다.');
      });
      it('3-1-2. 내용이 빈 댓글은 작성할 수 없습니다.', async () => {
        try {
          await commentsController.create(
            1,
            { contents: null, parentId: null },
            { id: 11 },
          );
        } catch (err) {
          expect(err).toBeInstanceOf(QueryFailedError);
        }
      });
    });

    describe('3-2. Comments 수정', () => {
      it.todo('3-2-1. 댓글 수정에 성공합니다.');
      it.todo('3-2-2. 내용이 빈 상태로 댓글을 수정할 수 없습니다.');
    });

    describe('3-3. Comments 삭제', () => {
      it.todo('3-3-1. 댓글 삭제에 성공합니다.');
    });

    describe('3-4. Comments 조회', () => {
      it.todo('3-4-1. 작성자별 댓글을 조회합니다.');
    });
  });

  describe('4-. SeriesArticles 로직 테스트', () => {
    describe('4-1. SeriesArticles 작성', () => {
      it.todo('4-1-1. 시리즈 작성을 성공합니다.');
      it.todo('4-1-2. 내용이 빈 시리즈를 작성할 수 없습니다.');
    });

    describe('4-2. SeriesArticles 수정', () => {
      it.todo('4-2-1. 시리즈 수정에 성공합니다.');
      it.todo('4-2-2. 내용이 빈 상태로 시리즈를 수정할 수 없습니다.');
    });

    describe('4-3. SeriesArticles 삭제', () => {
      it.todo('4-3-1. 시리즈 삭자에 성공합니다.');
    });

    describe('4-4. SeriesArticles 조회', () => {
      it.todo('4-4-1. 유저의 시리즈 목록 조회에 성공합니다.');
    });

    describe('4-5. SeriesArticles 내용 조회', () => {
      it.todo('4-5-1. 시리즈 내용 조회에 성공합니다.');
    });

    describe('4-6. SeriesArticles에 게시글 추가/삭제', () => {
      it.todo('4-6-1. 시리즈에 게시글을 추가/삭제하는 것을 성공합니다.');
    });
  });

  describe('5-. Introductions 로직 테스트', () => {
    describe('5-1. Introductions 수정', () => {
      it.todo('5-1-1. 소개글 수정에 성공합니다. 내용이 없어도 상관없습니다.');
    });
  });

  describe('6-. HashTags 로직 테스트', () => {
    describe('6-1. 해당하는 해시태그가 존재하지 않을 경우, 해시태그를 생성합니다.', () => {
      it.todo('6-1-1. 해시태그 생성에 성공합니다.');
    });

    describe('6-2. HashTags를 사용순으로 검색', () => {
      it.todo('6-2-1. 해시태그 검색에 성공합니다.');
    });
  });
});
