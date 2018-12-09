export class WhooingAccountModel {
  constructor(
    public account_id: string,
    public type: string,
    public title: string,
    public memo: string,
    public open_date: number,
    public close_date: number,
    public category: string,
  ) {}
}
