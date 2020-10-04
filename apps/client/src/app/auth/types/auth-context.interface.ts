import { LoginDetails } from './login-details.interface';
import { RegisterDetails } from './register-details.interface';
import { UserDetails } from './user-details.interface';

export interface AuthContextValue {
  user: UserDetails;
  isAuthenticated: boolean;
  register?: (form: RegisterDetails) => void;
  login?: (form: LoginDetails) => void;
  logout?: () => void;
}
