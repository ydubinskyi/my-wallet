import { Test, TestingModule } from '@nestjs/testing';
import { UserCurrencyService } from './user-currency.service';

describe('UserCurrencyService', () => {
  let service: UserCurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCurrencyService],
    }).compile();

    service = module.get<UserCurrencyService>(UserCurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
