import { Test, TestingModule } from '@nestjs/testing';
import { CommentsRelationsController } from './comments-relations.controller';
import { CommentsRelationsService } from './comments-relations.service';

describe('CommentsRelationsController', () => {
  let controller: CommentsRelationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsRelationsController],
      providers: [CommentsRelationsService],
    }).compile();

    controller = module.get<CommentsRelationsController>(
      CommentsRelationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
