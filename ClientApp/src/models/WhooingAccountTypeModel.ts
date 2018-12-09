import { WhooingAccountModel } from './WhooingAccountModel';
export class WhooingAccountTypeModel {
  constructor(
    public assets: WhooingAccountModel[],
    public liabilities: WhooingAccountModel[],
    public capital: WhooingAccountModel[],
    public income: WhooingAccountModel[],
    public expenses: WhooingAccountModel[],
  ) {}
}
