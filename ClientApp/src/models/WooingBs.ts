export interface IWhooingBs {
  assets: IWhooingBsItem;
  liabilities: IWhooingBsItem;
}
export interface IWhooingBsItem {
  total: number;
  accounts: IWhooingBsAccountItem[];
}
export interface IWhooingBsAccountItem {
  account_id: string;
  money: number;
}
