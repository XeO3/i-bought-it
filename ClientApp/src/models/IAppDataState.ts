export interface IAppDataState {
  balances: IBalanceItem[];
  balancesSyncDate: Date | null;
}
export interface IBalanceItem {
  sectins_id: string;
  account_id: string;
  balance: number;
}
