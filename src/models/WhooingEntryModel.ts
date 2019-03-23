import { WhooingAccount } from "./EnumWhooingAccount";

export class WhooingEntryModel {
  constructor(
    public entry_id: number,
    public entry_date: number,
    public l_account: WhooingAccount,
    public l_account_id: string,
    public r_account: WhooingAccount,
    public r_account_id: string,
    public item: string,
    public money: string,
    public total: string,
    public memo: string,
    public app_id: number,
  ) {}
}
