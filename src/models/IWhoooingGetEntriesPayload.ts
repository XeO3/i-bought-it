import { WhooingDate } from '@/utils/WhooingDate';
import fns from 'date-fns';
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

export class WhoooingGetEntriesParams implements IWhoooingGetEntriesParams {
  public section_id: string;
  public start_date: number;
  public end_date: number;
  public max?: number;
  public limit?: number;
  public account?: string;
  public account_id?: string;
  public l_account?: string;
  public l_account_id?: string;
  public r_account?: string;
  public r_account_id?: string;
  public item?: string;
  public money_from?: number;
  public money_to?: number;
  public memo?: string;
  constructor(section_id: string) {
    this.section_id = section_id;
    this.start_date = WhooingDate.ConvertNumber(fns.addMonths(new Date(), -3));
    this.end_date = WhooingDate.ConvertNumber(new Date());
    this.limit = 1000;
  }
}
