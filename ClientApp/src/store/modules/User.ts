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
  @Mutation
  public SET_USER(user: IWhooingUser) {
    this.userInfo = user;
  }
  @Mutation
  public SET_SECTIONLIST(sectionList: IWhooingSection[]) {
    this.sectionList = sectionList;
  }

  @Action({})
  public async FetchUserInfoAsync() {
    const { results } = await getWhooingUser();
    this.SET_USER(results);
  }

  @Action({})
  public async FetchSectionList() {
    const sections = (await getWhooingSections()).results;
    sections.forEach((section) => {
      getWhooingAccounts(section.section_id).then((res) => {
        section.accounts = res.results;
      });
    });
    this.SET_SECTIONLIST(sections);
  }
}

export const UserModule = getModule(User);
