import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './src/users/entities/user.entity';
import { Comments } from './src/comments/entities/comment.entity';
import { CommentsRelations } from './src/comments-relations/entities/comments-relation.entity';
import { Articles } from './src/articles/entities/article.entity';

dotenv.config();

const ORMConfig: any & ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Comments, CommentsRelations, Articles],
  synchronize: false,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = ORMConfig;
