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
import * as dotenv from 'dotenv';
import { UsersModule } from 'src/res/users/users.module';
import { ArticlesModule } from 'src/res/articles/articles.module';
import { CommentsModule } from 'src/res/comments/comments.module';

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
    describe('1-1. Users 회원가입', () => {});

    describe('1-2. Users 내 정보 조회', () => {});

    describe('1-3. Users 내 정보 수정', () => {});

    describe('1-4. Users 회원탈퇴', () => {});
  });

  describe('2-. Articles 로직 테스트', () => {
    describe('2-1. Articles 작성', () => {});

    describe('2-2. Articles 수정', () => {});

    describe('2-3. Articles 삭제', () => {});

    describe('2-4. Articles 목록 조회', () => {
      it.todo('2-4-1. 페이지별로 조회합니다.', async () => {});
      it.todo('2-4-2. hashtag별로 조회합니다.', async () => {});
    });

    describe('2-5. Articles 내용 조회', () => {});
  });

  describe('3-. Comments 로직 테스트', () => {
    describe('3-1. Comments 작성', () => {});

    describe('3-2. Comments 수정', () => {});

    describe('3-3. Comments 삭제', () => {});

    describe('3-4. Comments 조회', () => {
      it.todo('3-4-1. 작성자별로 댓글을 조회합니다.', () => {});
    });
  });

  describe('4-. SeriesArticles 로직 테스트', () => {
    describe('4-1. SeriesArticles 작성', () => {});

    describe('4-2. SeriesArticles 수정', () => {});

    describe('4-3. SeriesArticles 삭제', () => {});

    describe('4-4. SeriesArticles 조회', () => {});

    describe('4-5. SeriesArticles에 게시글 추가/삭제', () => {});
  });

  describe('5-. Introductions 로직 테스트', () => {
    describe('5-1. Introductions 수정', () => {});
  });

  describe('6-. HashTags 로직 테스트', () => {
    describe('6-1. HashTags 생성', () => {});

    describe('6-2. HashTags를 사용순으로 검색', () => {});
  });
});
