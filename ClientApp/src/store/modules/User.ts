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

@Module({ dynamic: false, store, name: 'User' })
export class User extends VuexModule implements IUserState {
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

  @Mutation
  public SET_SECTIONACCOUNTS(payload: {
    sectionId: string;
    accounts: IWhooingSectionAccounts;
  }) {
    const section = this.sectionList.find(
      (o) => o.section_id === payload.sectionId,
    );
    if (section) {
      section.accounts = payload.accounts;
    }
  }

  @Action({})
  public async FetchUserInfoAsync() {
    const { results } = await getWhooingUser();
    this.SET_USER(results);
  }

  @Action({})
  public async FetchSectionList() {
    const sections = (await getWhooingSections()).results;
    this.SET_SECTIONLIST(sections);
    sections.forEach((section) => {
      getWhooingAccounts(section.section_id).then((res) => {
        this.SET_SECTIONACCOUNTS({
          sectionId: section.section_id,
          accounts: res.results,
        });
        // section.accounts = res.results;
      });
    });
  }
}

// export const UserModule = getModule(User);
