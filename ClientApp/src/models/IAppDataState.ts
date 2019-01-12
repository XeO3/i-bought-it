export interface IAppDataState {
  balances: IBalanceItem[];
  balancesSyncDate: Date | null;
}
export interface IBalanceItem {
  section_id: string;
  account_id: string;
  money: number;
}

export class BalanceItem implements IBalanceItem {
  public section_id: string;
  public account_id: string;
  public money: number;
  constructor(sId: string, aId: string, bal: number) {
    this.section_id = sId;
    this.account_id = aId;
    this.money = bal;
  }
}
