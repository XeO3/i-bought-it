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
  /** 섹션 정보 리스트 */
  public sectionList: IWhooingSection[] = [];
  /** 유저 정보 */
  public userInfo: IWhooingUser | null = null;

  /** 섹션 아이디 리스트 */
  get SectionIdList(): string[] {
    const list = this.sectionList.map((o) => o.section_id);
    return list;
  }

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
