import { IBalanceItem } from './IBalanceItem';
export class BalanceItem implements IBalanceItem {
  public section_id: string;
  public account_id: string;
  public money: number;
  public isLoading: boolean;
  constructor(sId: string, aId: string, bal: number) {
    this.section_id = sId;
    this.account_id = aId;
    this.money = bal;
    this.isLoading = false;
  }
}
