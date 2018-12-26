import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { IAuthState } from '../../models/IAuthState';

@Module({ dynamic: false, store, name: 'Auth' })
export class Auth extends VuexModule implements IAuthState {
  public token = '';
  public tokenSecret = '';

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  public SET_TOKEN_SECRET(tokenSecret: string) {
    this.tokenSecret = tokenSecret;
  }

  @Mutation
  public CLEAR_AUTH() {
    this.SET_TOKEN('');
    this.SET_TOKEN_SECRET('');
  }

  @Action({})
  public LogOut() {
    // console.log('logout');
  }
}

// export const AuthModule = getModule(Auth);
