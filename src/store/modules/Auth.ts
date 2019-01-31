import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store, { AppModule, AppDataModule, EntriesModule, SettingsModule, UserModule } from '@/store/store';
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

  @Action
  public CLEAR_AUTH() {
    this.SET_TOKEN('');
    this.SET_TOKEN_SECRET('');
  }

  @Action
  public LogOut() {
    this.CLEAR_AUTH();
    AppModule.CLEAR_App();
    AppDataModule.CLEAR_AppData();
    EntriesModule.CLEAR_Entries();
    SettingsModule.CLEAR_Settings();
    UserModule.CLEAR_User();
  }
}

