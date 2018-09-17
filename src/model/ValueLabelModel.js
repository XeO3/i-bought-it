export class ValueLabelModel {
  value;
  label;
  constructor(value, label) {
    this.value = value
    this.label = label
  }
}

export class SettingsMemuItemModel extends ValueLabelModel {
  /** assets,liabilities,capital,expenses,income */
  accountsType
  constructor(value, label, accountsType) {
    super(value, label)
    this.accountsType = accountsType
  }
}
