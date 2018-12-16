import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { UserModule } from './User';

export interface IAuthState {
  token: string;
  tokenSecret: string;
}

@Module({ dynamic: true, store, name: 'Auth' })
class Auth extends VuexModule implements IAuthState {
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
    this.CLEAR_AUTH();
    UserModule.CLEAR_UESR();
  }
}

export const AuthModule = getModule(Auth);
