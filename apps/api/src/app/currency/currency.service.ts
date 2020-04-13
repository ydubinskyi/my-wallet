import { Injectable } from '@nestjs/common';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor() {}

  findAll(): Promise<Currency[]> {
    return null;
  }
}
