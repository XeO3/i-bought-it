import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/store';
import { ISettingsState } from '@/models/ISettingsState';

@Module({ dynamic: false, store, name: 'Settings' })
export class Settings extends VuexModule implements ISettingsState {
  public pinedList: string[] = [];

  @Mutation
  public Push_PinedItem(account_id: string): void {
    this.pinedList.push(account_id);
  }
  @Mutation
  public Set_PinedList(list: string[]): void {
    this.pinedList = [...list];
  }

  @Action({})
  public Toggle_PinedItem(account_id: string): void {
    if (this.pinedList.some((p) => p === account_id)) {
      this.Set_PinedList(this.pinedList.filter((p) => p !== account_id));
    } else {
      this.Push_PinedItem(account_id);
    }
  }
}

// export const AuthModule = getModule(Auth);
