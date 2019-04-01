import { AppProperties } from "@/config/AppProperties";
import { AlertModel } from "@/models/AlertModel";
import { ISnackbarModel } from "@/models/ISnackbarModel";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { IAppState } from "../../models/IAppState";

@Module({ dynamic: false, store, name: "App" })
export class App extends VuexModule implements IAppState {
  public snackbar: ISnackbarModel | null = null;
  public alerts: AlertModel[] = [];
  public sidebar = {
    opened: false,
  };
  public header = {
    title: "이거샀어!",
  };

  get appId(): string {
    return AppProperties.appId;
  }
  get appSecret(): string {
    return AppProperties.appSecret;
  }

  @Mutation
  public SET_SIDEBAR(opened: boolean) {
    this.sidebar.opened = opened;
  }

  @Mutation
  public ADD_ALERT(alert: AlertModel) {
    this.alerts.push(alert);
  }

  @Mutation
  public SET_SNACKBAR(snackbar: ISnackbarModel | null) {
    this.snackbar = snackbar;
  }

  @Mutation
  public SET_HEADERTITLE(title: string) {
    this.header.title = title;
  }

  @Action
  public CLEAR_App() {
    this.SET_SIDEBAR(false);
    this.SET_SNACKBAR(null);
  }

  @Action({ commit: "SET_SIDEBAR" })
  public ToggleSideBar() {
    return !this.sidebar.opened;
  }
  @Action({ commit: "SET_SIDEBAR" })
  public OpenSideBar() {
    return true;
  }
  @Action({ commit: "SET_SIDEBAR" })
  public CloseSideBar() {
    return false;
  }
}

// export const AppModule = getModule(App);
