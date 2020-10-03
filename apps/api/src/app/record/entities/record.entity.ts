import { RecordType } from '../types/recort-type.enum';

export class Record {
  id: number;
  type: RecordType;
  amount: number;
  description: string;
  user_id: number;
  account_id: number;
  category_id: number;
}
