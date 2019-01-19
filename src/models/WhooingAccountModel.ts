import { WhooingDate } from '@/utils/WhooingDate';

export class WhooingAccountModel {
  public static IsClosed(account: WhooingAccountModel): boolean {
    const closeDate = WhooingAccountModel.GetCloseDate(account);
    const now = new Date();
    return closeDate < now;
  }

  private static GetCloseDate(account: WhooingAccountModel): Date {
    const close_date = account.close_date;
    return WhooingAccountModel.GetDate(close_date);
  }

  private static GetDate(dateNumber: number) {
    return WhooingDate.ParseNumber(dateNumber);
  }

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

