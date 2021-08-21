import { Test, TestingModule } from '@nestjs/testing';
import { CommentsRelationsService } from './comments-relations.service';

describe('CommentsRelationsService', () => {
  let service: CommentsRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsRelationsService],
    }).compile();

    service = module.get<CommentsRelationsService>(CommentsRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
