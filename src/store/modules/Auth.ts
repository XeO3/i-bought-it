import router from "@/router";
import store, {
  AppDataModule,
  AppModule,
  EntriesModule,
  SettingsModule,
  UserModule,
} from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { IAuthState } from "../../models/IAuthState";

const LOCALSTORAGEKEY = "Auth";
const initValue = (JSON.parse(
  localStorage[LOCALSTORAGEKEY] || "null",
) as IAuthState) || {
  token: "",
  tokenSecret: "",
  tokenExpiration: false,
};

function setLocalStorage(state: IAuthState | null): void {
  if (state) {
    localStorage[LOCALSTORAGEKEY] = JSON.stringify(state);
  } else {
    localStorage.removeItem(LOCALSTORAGEKEY);
  }
}

@Module({ store, name: "Auth" })
export class Auth extends VuexModule implements IAuthState {
  public token = initValue.token;
  public tokenSecret = initValue.tokenSecret;
  /** 인증토큰 만료 */
  public tokenExpiration = initValue.tokenExpiration;

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
    this.tokenExpiration = false;
    setLocalStorage(this);
  }
  @Mutation
  public SET_TOKEN_SECRET(tokenSecret: string) {
    this.tokenSecret = tokenSecret;
    setLocalStorage(this);
  }
  @Mutation
  public SET_TOKENEXPIRATION(tokenExpiration: boolean) {
    this.tokenExpiration = tokenExpiration;
    setLocalStorage(this);
  }

  @Action
  public CLEAR_AUTH() {
    this.SET_TOKEN("");
    this.SET_TOKEN_SECRET("");
  }

  @Action
  public LogOut() {
    this.CLEAR_AUTH();
    AppModule.CLEAR_App();
    AppDataModule.CLEAR_AppData();
    EntriesModule.CLEAR_Entries();
    SettingsModule.CLEAR_Settings();
    UserModule.CLEAR_User();
    router.replace("/logout");
  }
}
