import { Test, TestingModule } from '@nestjs/testing';
import { RecordCategoryService } from './record-category.service';

describe('RecordCategoryService', () => {
  let service: RecordCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordCategoryService],
    }).compile();

    service = module.get<RecordCategoryService>(RecordCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
