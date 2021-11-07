import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './src/users/entities/user.entity';
import { Comments } from './src/comments/entities/comment.entity';
import { CommentsRelations } from './src/comments-relations/entities/comments-relation.entity';
import { Articles } from './src/articles/entities/article.entity';

dotenv.config();

const ORMConfig: any & ConnectionOptions = {
  type: 'mysql',
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_HOST
      : process.env.TEST_DB_HOST || process.env.DB_HOST,
  port:
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_PORT
      : Number(process.env.DB_PORT),
  username:
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_USERNAME
      : process.env.DB_USERNAME,
  password:
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_PASSWORD
      : process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_DB_DATABASE
      : process.env.DB_DATABASE,
  entities: [Users, Comments, CommentsRelations, Articles],
  synchronize: false,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = ORMConfig;
