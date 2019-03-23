import { ValueLabelModel } from "./ValueLabelModel";
export class SettingsMemuItemModel extends ValueLabelModel {
  constructor(
    public value: string,
    public label: string,
    /** assets,liabilities,capital,expenses,income */
    public accountsType: AccountsType,
  ) {
    super(value, label);
    this.accountsType = accountsType;
  }
}

enum AccountsType {
    assets= "assets",
    liabilities= "liabilities",
    capital= "capital",
    expenses= "expenses",
    income= "income",
}
