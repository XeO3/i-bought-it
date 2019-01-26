import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import store, { UserModule } from '@/store/store';
import { IWhooingUser } from '@/models/WhooingUserModel';
import { getWhooingUser } from '@/api/GetWhooingUser';
import { IWhooingSection } from '@/models/IWhooingSection';
import { IWhooingSectionAccounts } from '@/models/WhooingAccountTypeModel';
import { IUserState } from '@/models/IUserState';
import { getWhooingSections } from '@/api/GetWhooingSections';
import { getWhooingAccounts } from '@/api/GetWhooingAccounts';
import {
  WhooingAccountModel,
  IWhooingAccountModel,
} from '@/models/WhooingAccountModel';

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

export namespace UserHelper {
  export function GetSection(section_id: string, user: User = UserModule) {
    return user.sectionList.find(
      (section) => section.section_id === section_id,
    );
  }
  export function GetAccount(
    section_id: string,
    account_id: string,
    user: User = UserModule,
  ): (IWhooingAccountModel & { account: string }) | undefined {
    const section = GetSection(section_id, user);
    if (section && section.accounts) {
      const accounts = section.accounts;
      const list = [
        ...accounts.assets.map((o) => {
          return { ...o, account: 'assets' };
        }),
        ...accounts.capital.map((o) => {
          return { ...o, account: 'capital' };
        }),
        ...accounts.expenses.map((o) => {
          return { ...o, account: 'expenses' };
        }),
        ...accounts.income.map((o) => {
          return { ...o, account: 'income' };
        }),
        ...accounts.liabilities.map((o) => {
          return { ...o, account: 'liabilities' };
        }),
      ];
      return list.find((item) => item.account_id === account_id);
    }
  }
  export function GetSectionName(
    section_id: string,
    user: User = UserModule,
  ): string | undefined {
    const section = GetSection(section_id);
    if (section) {
      return section.title;
    }
  }
  export function GetAccountName(
    section_id: string,
    account_id: string,
    user: User = UserModule,
  ): string | undefined {
    const account = GetAccount(section_id, account_id, user);
    if (account) {
      return account.title;
    }
  }
}
