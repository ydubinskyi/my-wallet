import { Test, TestingModule } from '@nestjs/testing';
import { RecordCategoryController } from './record-category.controller';
import { RecordCategoryService } from './record-category.service';

describe('RecordCategoryController', () => {
  let controller: RecordCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordCategoryController],
      providers: [RecordCategoryService],
    }).compile();

    controller = module.get<RecordCategoryController>(RecordCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
