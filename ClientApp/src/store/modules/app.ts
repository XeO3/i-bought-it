import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store/store';

export interface IAppState {
  sidebar: {
    opened: boolean ;
  };
}

@Module({ dynamic: true, store, name: 'App' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: false,
  };

  @Mutation
  public TOGGLE_SIDEBAR() {
    this.sidebar.opened = !this.sidebar.opened;
  }
  @Mutation
  public SET_SIDEBAR(opened: boolean) {
    this.sidebar.opened = opened;
  }

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public ToggleSideBar() {
    return;
  }
  @Action({ commit: 'SET_SIDEBAR' })
  public CloseSideBar(opened: boolean) {
    return opened;
  }
}

export const AppModule = getModule(App);
