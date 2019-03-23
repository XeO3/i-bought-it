import { IBalanceItem } from "./IBalanceItem";

export interface IAppDataState {
  balances: IBalanceItem[];
  balancesSyncDate: Date | null;
}
