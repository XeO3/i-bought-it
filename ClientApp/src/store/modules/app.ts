import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';

export interface IAppState {
  sidebar: {
    opened: boolean;
  };
}

@Module({ dynamic: true, store, name: 'App' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: false,
  };

  @Mutation
  public SET_SIDEBAR(opened: boolean) {
    this.sidebar.opened = opened;
  }

  @Action({ commit: 'SET_SIDEBAR' })
  public ToggleSideBar() {
    return !this.sidebar.opened;
  }
  @Action({ commit: 'SET_SIDEBAR' })
  public OpenSideBar(opened: boolean) {
    return true;
  }
  @Action({ commit: 'SET_SIDEBAR' })
  public CloseSideBar(opened: boolean) {
    return false;
  }
}

export const AppModule = getModule(App);
