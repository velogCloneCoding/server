import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './res/users/users.module';
import { ArticlesModule } from './res/articles/articles.module';
import { CommentsModule } from './res/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get('NODE_ENV');
        return {
          type: configService.get(`DB_TYPE`),
          host: configService.get(`${nodeEnv}_DB_HOST`),
          port: Number(configService.get(`${nodeEnv}_DB_PORT`)),
          username: configService.get(`${nodeEnv}_DB_USERNAME`),
          password: configService.get(`${nodeEnv}_DB_PASSWORD`),
          database: configService.get(`${nodeEnv}_DB_DATABASE`),
          dateStrings: true,
          synchronize: false,
          logging: true,
          autoLoadEntities: true,
        } as any;
      },
    }),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
