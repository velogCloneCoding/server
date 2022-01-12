import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from './article.entity';

// @Index('fk_ARTICLE_IMAGES_ARTICLES_idx', ['articleId'], {})
@Entity('ARTICLE_IMAGES', { schema: 'velog' })
export class ArticleImages {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'article_id' })
  articleId: number;

  @Column('varchar', { name: 'img_url', length: 500 })
  imgUrl: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Articles, (articles) => articles.articleImages)
  @JoinColumn({ name: 'article_id', referencedColumnName: 'id' })
  articles: Articles;
}

//내가 여기에 id를 pk로 따로 두지 않은 이유
//1. 이 테이블의 composite pk가 foreign key로 쓰일 일이 없을 것 같아서
//2. 이 composite pk가 수정될 일도 없을 것 같아서 -> 수정할 일이 있으면 불필요한 연산을 해야하니까
//3. composite pk를 이용해서 딱 하나의 이미지만 찾을 일이 없을 것 같아서 -> articles.contents를 꺼내오기 위해서 article_id만 이용해서 해당하는 img_url을 가져오는 로직만 사용할 것 같기 때문
//4. 위의 이유를 종합해서 id 칼럼을 추가하는 것은 공간적으로 낭비라고 생각됨
//나중에 가서 후회할 일이 생길까? 연습이니 만들어보고 나중에 봐보자.
//+ 추가1. id값으로 설정한 pk를 사용할 일이 전혀 없을 것 같음

//혹시 모르게 image를 특정할 일이 있을지도 모르므로 pk를 surrogate key를 사용하겠음
