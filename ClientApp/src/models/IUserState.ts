import { IWhooingUser } from '@/models/WhooingUserModel';
import { IWhooingSection } from '@/models/IWhooingSection';
export interface IUserState {
  userInfo: IWhooingUser | null;
  sectionList: IWhooingSection[];
}

