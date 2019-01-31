import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { AlertModel } from '@/models/AlertModel';
import { IAppState } from '../../models/IAppState';
import { AppProperties } from '@/config/AppProperties';

@Module({ dynamic: false, store, name: 'App' })
export class App extends VuexModule implements IAppState {
  public alerts: AlertModel[] = [];
  public sidebar = {
    opened: false,
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

  @Action
  public CLEAR_App() {
    this.SET_SIDEBAR(false);
  }

  @Action({ commit: 'SET_SIDEBAR' })
  public ToggleSideBar() {
    return !this.sidebar.opened;
  }
  @Action({ commit: 'SET_SIDEBAR' })
  public OpenSideBar() {
    return true;
  }
  @Action({ commit: 'SET_SIDEBAR' })
  public CloseSideBar() {
    return false;
  }
}

// export const AppModule = getModule(App);
