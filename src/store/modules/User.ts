import { getWhooingAccounts } from "@/api/GetWhooingAccounts";
import { getWhooingSections } from "@/api/GetWhooingSections";
import { getWhooingUser } from "@/api/GetWhooingUser";
import { WhooingAccount } from "@/models/EnumWhooingAccount";
import { IUserState } from "@/models/IUserState";
import { IWhooingSection } from "@/models/IWhooingSection";
import { IWhooingAccountModel } from "@/models/WhooingAccountModel";
import { IWhooingSectionAccounts } from "@/models/WhooingAccountTypeModel";
import { IWhooingUser } from "@/models/WhooingUserModel";
import store, { UserModule } from "@/store/store";
import fns from "date-fns";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ store, name: "User" })
export class User extends VuexModule implements IUserState {
  /** 섹션 정보 리스트 */
  public sectionList: IWhooingSection[] = [];
  /** 유저 정보 */
  public userInfo: IWhooingUser | null = null;
  /** 로그인 날짜 */
  public loginDate: Date | null = null;

  /** 섹션 아이디 리스트 */
  get SectionIdList(): string[] {
    const list = this.sectionList.map((o) => o.section_id);
    return list;
  }

  get isLogin(): boolean {
    return (
      this.userInfo !== null &&
      this.loginDate !== null &&
      fns.isAfter(this.loginDate, fns.addDays(new Date(), -150))
    );
  }

  @Mutation
  public SET_USER(user: IWhooingUser | null) {
    this.userInfo = user;
    if (user) {
      this.loginDate = new Date();
    } else {
      this.loginDate = null;
    }
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

  @Action
  public CLEAR_User() {
    this.SET_SECTIONLIST([]);
    this.SET_USER(null);
  }

  @Action
  public async FetchUserInfoAsync() {
    const { results } = await getWhooingUser();
    this.SET_USER(results);
  }

  @Action
  public async FetchSectionList() {
    const sections = (await getWhooingSections()).results;
    this.SET_SECTIONLIST(sections);

    const pList = sections.map(async (section) => {
      const res = await getWhooingAccounts(section.section_id);
      this.SET_SECTIONACCOUNTS({
        sectionId: section.section_id,
        accounts: res.results,
      });
    });
    await Promise.all(pList);
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
  ): (IWhooingAccountModel & { account: WhooingAccount }) | undefined {
    const section = GetSection(section_id, user);
    if (section && section.accounts) {
      const accounts = section.accounts;
      const list = [
        ...accounts.assets.map((o) => {
          return { ...o, account: WhooingAccount.assets };
        }),
        ...accounts.capital.map((o) => {
          return { ...o, account: WhooingAccount.capital };
        }),
        ...accounts.expenses.map((o) => {
          return { ...o, account: WhooingAccount.expenses };
        }),
        ...accounts.income.map((o) => {
          return { ...o, account: WhooingAccount.income };
        }),
        ...accounts.liabilities.map((o) => {
          return { ...o, account: WhooingAccount.liabilities };
        }),
      ];
      return list.find((item) => item.account_id === account_id);
    }
  }
  export function GetSectionName(section_id: string): string | undefined {
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
