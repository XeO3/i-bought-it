import { WhooingAccountModel } from './WhooingAccountModel';
export interface IWhooingSectionAccounts {
  /** 자산 */
  assets: WhooingAccountModel[];
  /** 부채 */
  liabilities: WhooingAccountModel[];
  /** 순자산 */
  capital: WhooingAccountModel[];
  /** 수익 */
  income: WhooingAccountModel[];
  /** 비용 */
  expenses: WhooingAccountModel[];
}
