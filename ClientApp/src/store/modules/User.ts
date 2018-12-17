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
import { getWhooingSections } from '@/api/GetWhooingSections';
import { IWhooingSection } from '@/models/IWhooingSection';
import { getWhooingAccounts } from '@/api/GetWhooingAccounts';
import { IWhooingSectionAccounts } from '@/models/WhooingAccountTypeModel';

export interface IUserState {
  userInfo: IWhooingUser | null;
  sectionList: Array<IWhooingSection | IWhooingSectionAccounts>;
}

@Module({ dynamic: true, store, name: 'User' })
class User extends VuexModule implements IUserState {
  public userInfo: IWhooingUser | null = null;
  public sectionList: Array<IWhooingSection | IWhooingSectionAccounts> = [];

  @Mutation
  public SET_USER(user: IWhooingUser): void {
    this.userInfo = user;
  }
  @Mutation
  public SET_SECTIONLIST(
    sectionList: Array<IWhooingSection & IWhooingSectionAccounts>,
  ): void {
    this.sectionList = sectionList;
  }

  @Mutation
  public PUSH_SECTIONLIST(
    sectionAccount: IWhooingSection & IWhooingSectionAccounts,
  ): void {
    this.sectionList.push(sectionAccount);
  }

  @Mutation
  public CLEAR_USER() {
    this.userInfo = null;
    this.sectionList = [];
  }

  @Action({ commit: 'SET_USER' })
  public async FectchUserInfoAsync(): Promise<IWhooingUser> {
    // 유저정보
    const resUser = await getWhooingUser();
    return resUser.results;
    // this.SET_USER(resUser.results);
    // // 섹션리스트
    // const resSections = await getWhooingSections();
    // const sectionList = resSections.results;

    // // 항목리스트
    // sectionList.forEach((section) => {
    //   getWhooingAccounts(section.section_id).then((res) => {
    //     const accounts = res.results;
    //     const sectionItem: IWhooingSection & IWhooingSectionAccounts = {
    //       ...section,
    //       ...accounts,
    //     };
    //     this.PUSH_SECTIONLIST(sectionItem);
    //   });
    // });
  }
  @Action({ commit: 'SET_SECTIONLIST' })
  public async FectchSections() {
    const result: Array<IWhooingSection & IWhooingSectionAccounts> = [];
    // 섹션리스트
    const resSections = await getWhooingSections();
    const sectionList = resSections.results;
    // 항목리스트
    sectionList.forEach((section) => {
      getWhooingAccounts(section.section_id).then((res) => {
        const accounts = res.results;
        const sectionItem: IWhooingSection & IWhooingSectionAccounts = {
          ...section,
          ...accounts,
        };
        result.push(sectionItem);
      });
    });
    return result;
  }
}

export const UserModule = getModule(User);
