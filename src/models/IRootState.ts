import { IAppState } from '@/models/IAppState';
import { IAuthState } from '@/models/IAuthState';
import { IUserState } from '@/models/IUserState';
import { IAppDataState } from './IAppDataState';
export interface IRootState {
  App: IAppState;
  Auth: IAuthState;
  User: IUserState;
  AppData: IAppDataState;
}

