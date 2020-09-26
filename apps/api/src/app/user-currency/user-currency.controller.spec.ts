import { Test, TestingModule } from '@nestjs/testing';
import { UserCurrencyController } from './user-currency.controller';
import { UserCurrencyService } from './user-currency.service';

describe('UserCurrencyController', () => {
  let controller: UserCurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCurrencyController],
      providers: [UserCurrencyService],
    }).compile();

    controller = module.get<UserCurrencyController>(UserCurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
