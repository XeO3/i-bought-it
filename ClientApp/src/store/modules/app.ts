import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { AlertModel } from '@/models/AlertModel';

export interface IAppState {
  sidebar: {
    opened: boolean;
  };
  alerts: AlertModel[];
  appId: string;
  appSecret: string;
}

@Module({ dynamic: true, store, name: 'App' })
class App extends VuexModule implements IAppState {
  public alerts: AlertModel[] = [];
  public appId: string = '190';
  public appSecret: string = '45cf40565fcc263c8dd63773aaa2a3f279ea4f62';
  public sidebar = {
    opened: false,
  };

  @Mutation
  public SET_SIDEBAR(opened: boolean) {
    this.sidebar.opened = opened;
  }

  @Mutation
  public ADD_ALERT(alert: AlertModel) {
    this.alerts.push(alert);
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

export const AppModule = getModule(App);
