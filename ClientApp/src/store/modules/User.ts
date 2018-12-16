import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { IWhooingUser } from '@/models/WhooingUserModel';

export interface IUserState {
  userInfo: IWhooingUser | null;
}

@Module({ dynamic: true, store, name: 'User' })
class User extends VuexModule implements IUserState {
  public userInfo!: IWhooingUser | null;

  @Mutation
  public SET_USER(user: IWhooingUser): void {
    this.userInfo = user;
  }
  @Mutation
  public CLEAR_UESR() {
    this.userInfo = null;
  }

  @Action
  public async FectchUserInfoAsync(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const UserModule = getModule(User);
