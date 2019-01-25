export interface IWhoooingGetEntriesParams {
  section_id: string;
  start_date: number;
  end_date: number;
  max?: number;
  limit?: number;
  account?: string;
  account_id?: string;
  l_account?: string;
  l_account_id?: string;
  r_account?: string;
  r_account_id?: string;
  item?: string;
  money_from?: number;
  money_to?: number;
  memo?: string;
}
