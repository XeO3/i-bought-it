import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import { IAppDataState, IBalanceItem } from '@/models/IAppDataState';

@Module
export class AppData extends VuexModule implements IAppDataState {
  public balancesSyncDate: Date | null = null;
  public balances: IBalanceItem[] = [];

  @Mutation
  public Set_BalancesSyncDate(newDate: Date) {
    this.balancesSyncDate = newDate;
  }
  @Mutation
  public Set_Balances(balances: IBalanceItem[]) {
    this.balances = balances;
  }
  @Mutation
  public Push_Balance(balance: IBalanceItem) {
    this.balances.push(balance);
  }
  @Mutation
  public Add_Balance(payload: {
    key: { section_id: string; account_id: string };
    addBalance: number;
  }) {
    const item = AppDataHelper.Get_Balance(
      this,
      payload.key.section_id,
      payload.key.account_id,
    );
    item.balance += payload.addBalance;
  }
}

export namespace AppDataHelper {
  export function Get_Balance(
    appData: AppData,
    section_id: string,
    account_id: string,
  ): IBalanceItem {
    const item = appData.balances.find(
      (b) => b.account_id === section_id && b.account_id === account_id,
    );
    if (item) {
      return item;
    }
    throw new Error(
      `계정정보가 유효하지 않습니다.(섹션${section_id}, 계정${account_id})`,
    );
  }
}
