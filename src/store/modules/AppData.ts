import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { getWhooingBs } from '@/api/GetWhooingBs';
import store, { UserModule, AppDataModule } from '@/store/store';
import { WhooingDate } from '@/utils/WhooingDate';
import { IAppDataState } from '@/models/IAppDataState';
import { BalanceItem } from '@/models/BalanceItem';
import { IBalanceItem } from '@/models/IBalanceItem';

@Module({ dynamic: false, store, name: 'AppData' })
export class AppData extends VuexModule implements IAppDataState {
  public balancesSyncDate: Date | null = null;
  public balances: IBalanceItem[] = [];

  /**
   * 잔액정보 업데이트날짜를 설정
   * @param newDate 잔액정보 업데이트날짜
   */
  @Mutation
  public Set_BalancesSyncDate(newDate: Date | null) {
    this.balancesSyncDate = newDate;
  }
  /**
   * 잔액정보 설정
   * @param balances 잔액정보 리스트
   */
  @Mutation
  public Set_Balances(balances: IBalanceItem[]) {
    this.balances = balances;
  }
  /**
   * 잔액정보 입력
   * @param balance 계정 잔액
   */
  @Mutation
  public Push_Balance(balance: IBalanceItem) {
    this.balances.push(balance);
  }

  @Mutation
  public Set_LoadingStart() {
    this.balances.forEach((o) => (o.isLoading = true));
  }

  @Action
  public CLEAR_AppData() {
    this.Set_Balances([]);
    this.Set_BalancesSyncDate(null);
  }

  /**
   * 잔액정보를 업데이트 합니다. 해당 잔액정보가 없을경우 잔액정보를 추가합니다.
   * @param balance 잔액 아이템
   */
  @Action
  public Upsert_Balance(balance: IBalanceItem) {
    try {
      this.Set_Balance(balance);
    } catch (e) {
      this.Push_Balance(balance);
    }
  }

  /**
   * 잔액을 설정합니다.
   * @param payload
   */
  @Mutation
  public Set_Balance(balance: IBalanceItem) {
    const item = AppDataHelper.Get_Balance(
      balance.section_id,
      balance.account_id,
      this,
    );
    item.money = balance.money;
    item.isLoading = false;
  }

  /**
   * 잔액에 'addBalance'를 더합니다.
   * @param payload
   */
  @Mutation
  public Add_Balance(payload: {
    key: { section_id: string; account_id: string };
    /** 잔액에 더하는 금액 */
    addBalance: number;
  }) {
    const item = AppDataHelper.Get_Balance(
      payload.key.section_id,
      payload.key.account_id,
      this,
    );
    item.money += payload.addBalance;
  }

  /**
   * 후잉API에서 잔액정보를 불러옵니다.
   */
  @Action
  public async FetchWhooingBs() {
    this.Set_LoadingStart();
    const sectionIds = UserModule.SectionIdList;
    const now = new Date();
    const today = WhooingDate.ConvertNumber(now);
    sectionIds.forEach((sid) => {
      getWhooingBs(sid, today).then((res) => {
        res.results.assets.accounts.forEach((aa) => {
          const newBalItem = new BalanceItem(sid, aa.account_id, aa.money);
          this.Upsert_Balance(newBalItem);
        });
        res.results.liabilities.accounts.forEach((aa) => {
          const newBalItem = new BalanceItem(sid, aa.account_id, aa.money);
          this.Upsert_Balance(newBalItem);
        });
      });
    });
    this.Set_BalancesSyncDate(now);
  }
}

export namespace AppDataHelper {
  export function Get_Balance(
    section_id: string,
    account_id: string,
    appData: AppData = AppDataModule,
  ): IBalanceItem {
    const item = appData.balances.find(
      (b) => b.section_id === section_id && b.account_id === account_id,
    );
    if (item) {
      return item;
    }
    throw new Error(
      `잔액정보가 존재하지 않습니다.(섹션${section_id}, 계정${account_id})`,
    );
  }
}
