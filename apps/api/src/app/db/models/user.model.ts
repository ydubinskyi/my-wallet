import { UserRole } from '../../user/user-role.enum';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string | Date;
  base_currency_id: number;
}
