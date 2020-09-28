import { AccountType } from '../types/account-type.enum';

export class Account {
  id: number;
  name: string;
  type: AccountType;
  start_amount: number;
  balance: number;
  description: string;
  accent_color: string;
  user_id: number;
  user_currency_id: number;
}
