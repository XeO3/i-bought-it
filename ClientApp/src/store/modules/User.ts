import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { IWhooingUser } from '@/models/WhooingUserModel';
import { getWhooingUser } from '@/api/GetWhooingUser';
import { IWhooingSection } from '@/models/IWhooingSection';
import { IWhooingSectionAccounts } from '@/models/WhooingAccountTypeModel';
import { IUserState } from '@/models/IUserState';
import { getWhooingSections } from '@/api/GetWhooingSections';
import { getWhooingAccounts } from '@/api/GetWhooingAccounts';

@Module({ dynamic: true, store, name: 'User' })
class User extends VuexModule implements IUserState {
  public sectionList: IWhooingSection[] = [];
  public userInfo: IWhooingUser | null = null;

  @Mutation
  public CLEAR_USER() {
    this.userInfo = null;
    this.sectionList = [];
  }

  @MutationAction({ mutate: ['userInfo'] })
  public async FetchUserInfoAsync(): Promise<{ userInfo: IWhooingUser }> {
    // 유저정보
    const resUser = await getWhooingUser();
    console.log(resUser.results);
    return { userInfo: resUser.results };
  }

  @MutationAction({ mutate: ['sectionList'] })
  public async FetchSectionList(): Promise<{ sectionList: IWhooingSection[] }> {
    const sections = (await getWhooingSections()).results;
    sections.forEach((section) => {
      getWhooingAccounts(section.section_id).then((res) => {
        section.accounts = res.results;
      });
    });
    return { sectionList: sections };
  }
}

export const UserModule = getModule(User);
