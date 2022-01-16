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

  describe('0. 테스트 준비', () => {
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
});
