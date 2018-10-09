export class AlertsStateModel {
    constructor(public top: Array<any> = []) { }
}
export class HistoryStateModel {
    constructor(public list: Array<any> = []) { }
}
export class InsertStateModel {
    constructor(public money: number = 0) { }
}

export class ValueLabelModel {
    constructor(
        public value: string,
        public label: string) { }
}

export class SettingsMemuItemModel extends ValueLabelModel {
    constructor(
        public value: string,
        public label: string,
        /** assets,liabilities,capital,expenses,income */
        public accountsType: string) {
        super(value, label)
        this.accountsType = accountsType
    }
}

export class SettingsModel {
    constructor(
        public selectedSection: string,
        public data: any = {}
    ) { }
}

export class SettingsDataModel {
    constructor(
        public sectionId: string,
        public itemList: string[] = [],
        public leftMenuList: SettingsMemuItemModel[] = [],
        public rightMenuList: SettingsMemuItemModel[] = []
    ) { }
}

export class UserState {
    constructor(
        public token: string,
        public token_secret: string,
        public user_id: string,
        public user: string,
        public sections: string,
        public accounts: string,
        public frequentItems: string) { }
}