import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './res/users/users.module';
import { ArticlesModule } from './res/articles/articles.module';
import { CommentsModule } from './res/comments/comments.module';
import { CommentsRelationsModule } from './comments-relations/comments-relations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { Comments } from './entities/comment.entity';
import { CommentsRelations } from './comments-relations/entities/comments-relation.entity';
import { Articles } from './entities/article.entity';

import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Comments, CommentsRelations, Articles],
      dateStrings: true,
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
    CommentsRelationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
