import { IAppState } from '@/models/IAppState';
import { IAuthState } from '@/models/IAuthState';
import { IUserState } from '@/models/IUserState';
export interface IRootState {
  App: IAppState;
  Auth: IAuthState;
  User: IUserState;
}

