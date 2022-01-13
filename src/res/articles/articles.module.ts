import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from '../../entities/article.entity';
import { SeriesArticles } from 'src/entities/series-article.entity';
import { Introductions } from 'src/entities/introduction.entity';
import { Hashtags } from 'src/entities/hashtag.entity';
import { ArticleLikes } from 'src/entities/article-like.entity';
import { ArticleHits } from 'src/entities/article-hit.entity';
import { ArticleImages } from 'src/entities/article-image.entity';
import { SeriesArticlesHasArticles } from 'src/entities/relation/series-article-has-article.entity';
import { ArticlesHasHashtags } from 'src/entities/relation/article-has-hashtag.entity';

//Articles entity를 제외한 나머지 Entity들은 서버의 정상동작을 위하여 임시로 넣어둔 것입니다.
//나중에 Articles를 제외하고는 다 지우고 필요한 곳에 정상배치합니다.
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      SeriesArticles,
      Introductions,
      Hashtags,
      ArticleLikes,
      ArticleHits,
      ArticleImages,
      SeriesArticlesHasArticles,
      ArticlesHasHashtags,
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
