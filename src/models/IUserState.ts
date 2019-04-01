import { IWhooingSection } from "@/models/IWhooingSection";
import { IWhooingUser } from "@/models/WhooingUserModel";
export interface IUserState {
  userInfo: IWhooingUser | null;
  sectionList: IWhooingSection[];
  loginDate: Date | null;
}

