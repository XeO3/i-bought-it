import { WhooingAccountModel } from './WhooingAccountModel';
export interface IWhooingSectionAccounts {
  assets: WhooingAccountModel[];
  liabilities: WhooingAccountModel[];
  capital: WhooingAccountModel[];
  income: WhooingAccountModel[];
  expenses: WhooingAccountModel[];
}
