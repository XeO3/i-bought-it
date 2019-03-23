import { IWhooingSectionAccounts } from "./WhooingAccountTypeModel";

export interface IWhooingSection {
  section_id: string;
  title: string;
  memo: string;
  currency: string;
  isolation: string;
  total_assets: number;
  total_liabilities: number;
  skin_id: number;
  decimal_places: number;
  date_format: string;
  accounts?: IWhooingSectionAccounts;
}


