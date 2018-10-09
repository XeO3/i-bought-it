export class AlertsStateModel {
    constructor(top = []) {
        this.top = top;
    }
}
export class HistoryStateModel {
    constructor(list = []) {
        this.list = list;
    }
}
export class InsertStateModel {
    constructor(money = 0) {
        this.money = money;
    }
}
export class ValueLabelModel {
    constructor(value, label) {
        this.value = value;
        this.label = label;
    }
}
export class SettingsMemuItemModel extends ValueLabelModel {
    constructor(value, label, 
    /** assets,liabilities,capital,expenses,income */
    accountsType) {
        super(value, label);
        this.value = value;
        this.label = label;
        this.accountsType = accountsType;
        this.accountsType = accountsType;
    }
}
export class SettingsModel {
    constructor(selectedSection, data = {}) {
        this.selectedSection = selectedSection;
        this.data = data;
    }
}
export class SettingsDataModel {
    constructor(sectionId, itemList = [], leftMenuList = [], rightMenuList = []) {
        this.sectionId = sectionId;
        this.itemList = itemList;
        this.leftMenuList = leftMenuList;
        this.rightMenuList = rightMenuList;
    }
}
export class UserState {
    constructor(token, token_secret, user_id, user, sections, accounts, frequentItems) {
        this.token = token;
        this.token_secret = token_secret;
        this.user_id = user_id;
        this.user = user;
        this.sections = sections;
        this.accounts = accounts;
        this.frequentItems = frequentItems;
    }
}
//# sourceMappingURL=index.js.map