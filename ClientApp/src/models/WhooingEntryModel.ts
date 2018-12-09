export class WhooingEntryModel {
  constructor(
    public entry_id: number,
    public entry_date: number,
    public l_account: string,
    public l_account_id: string,
    public r_account: string,
    public r_account_id: string,
    public item: string,
    public money: number,
    public total: string,
    public memo: string,
    public app_id: number,
  ) {}
}
