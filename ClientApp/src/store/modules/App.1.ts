import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { IAppState } from './app';
@Module({ dynamic: true, store, name: 'App' })
export class App extends VuexModule implements IAppState {
  public appId: string = '190';
  public appSecret: string = '45cf40565fcc263c8dd63773aaa2a3f279ea4f62';
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
