import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ORMConfig: any & ConnectionOptions = {
  type: process.env.DB_TYPE,
  host:
    process.env.NODE_ENV === 'DEVELOPMENT'
      ? process.env.DEVELOPMENT_DB_HOST
      : process.env.PRODUCT_DB_HOST,
  port:
    process.env.NODE_ENV === 'DEVELOPMENT'
      ? Number(process.env.DEVELOPMENT_DB_PORT)
      : Number(process.env.PRODUCT_DB_PORT),
  username:
    process.env.NODE_ENV === 'DEVELOPMENT'
      ? process.env.DEVELOPMENT_DB_USERNAME
      : process.env.PRODUCT_DB_USERNAME,
  password:
    process.env.NODE_ENV === 'DEVELOPMENT'
      ? process.env.DEVELOPMENT_DB_PASSWORD
      : process.env.PRODUCT_DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'DEVELOPMENT'
      ? process.env.DEVELOPMENT_DB_DATABASE
      : process.env.PRODUCT_DB_DATABASE,
  entities: ['src/entities/**/*.ts'],
  synchronize: false,
  // dateStrings: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = ORMConfig;
