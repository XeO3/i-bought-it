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
export class IPostData {
}
/**
 * 후잉 엑서스 토큰 발급용 데이터
 */
export class GetWhooingAccessTokenData extends IPostData {
    constructor(app_id, app_secret, token, pin) {
        super();
        this.app_id = app_id;
        this.app_secret = app_secret;
        this.token = token;
        this.pin = pin;
    }
    GetFormData() {
        let formData = new FormData();
        formData.append('app_id', this.app_id);
        formData.append('app_secret', this.app_secret);
        formData.append('token', this.token);
        formData.append('pin', this.pin);
        return formData;
    }
}
/**
 * 후잉 로그인 토큰 발급용 데이터
 */
export class GetWhooingAppTokenData extends IPostData {
    constructor(app_id, app_secret) {
        super();
        this.app_id = app_id;
        this.app_secret = app_secret;
    }
    GetFormData() {
        let formData = new FormData();
        formData.append('app_id', this.app_id);
        formData.append('app_secret', this.app_secret);
        return formData;
    }
}
/**
 * 후잉 거래 입력용 데이터
 */
export class PostWhooingEntriesData extends IPostData {
    constructor(
    /** 섹션의 고유번호 Example Value : s99 */
    section_id, 
    /** 거래가 일어난 날짜 Example Value : 20110812 */
    l_account, 
    /** 왼쪽의 항목 고유번호 Example Value : x20 */
    l_account_id, 
    /** 오른쪽의 계정 Example Value : assets */
    r_account, 
    /** 오른쪽의 항목 고유번호 Example Value : x4 */
    r_account_id, 
    /** 아이템 or 거래처. 괄호메모나 명령어도 포함. Example Value : 후원(과장학금)**2 */
    item, 
    /** 거래액 Example Value : 10000 */
    money, 
    /** 거래에 들어가는 보충 메모. 일기. 이 값으로는 검색할 수 없음. Example Value : 오늘도 어김없이 빠져나갔다 */
    memo) {
        super();
        this.section_id = section_id;
        this.l_account = l_account;
        this.l_account_id = l_account_id;
        this.r_account = r_account;
        this.r_account_id = r_account_id;
        this.item = item;
        this.money = money;
        this.memo = memo;
    }
    GetFormData() {
        let formData = new FormData();
        formData.append('section_id', this.section_id);
        formData.append('l_account', this.l_account);
        formData.append('l_account_id', this.l_account_id);
        formData.append('r_account', this.r_account);
        formData.append('r_account_id', this.r_account_id);
        formData.append('item', this.item);
        formData.append('money', this.money.toString());
        formData.append('memo', this.memo);
        return formData;
    }
}
export class UserTokenData {
    constructor(token, token_secret, user_id) {
        this.token = token;
        this.token_secret = token_secret;
        this.user_id = user_id;
    }
}
export class AlertModel {
    constructor(message, icon, dismissible = false, outline = false, transition, 
    /** success, info, warning, error*/
    type = 'error', value = true) {
        this.message = message;
        this.icon = icon;
        this.dismissible = dismissible;
        this.outline = outline;
        this.transition = transition;
        this.type = type;
        this.value = value;
    }
}
export class WhooingSectionModel {
    constructor(section_id, title, memo, currency, isolation, total_assets, total_liabilities, skin_id, decimal_places, date_format) {
        this.section_id = section_id;
        this.title = title;
        this.memo = memo;
        this.currency = currency;
        this.isolation = isolation;
        this.total_assets = total_assets;
        this.total_liabilities = total_liabilities;
        this.skin_id = skin_id;
        this.decimal_places = decimal_places;
        this.date_format = date_format;
    }
}
export class WhooingAccountModel {
    constructor(account_id, type, title, memo, open_date, close_date, category) {
        this.account_id = account_id;
        this.type = type;
        this.title = title;
        this.memo = memo;
        this.open_date = open_date;
        this.close_date = close_date;
        this.category = category;
    }
}
export class WhooingFrequentItem {
    constructor(item_id, item, money, l_account, l_account_id, r_account, r_account_id) {
        this.item_id = item_id;
        this.item = item;
        this.money = money;
        this.l_account = l_account;
        this.l_account_id = l_account_id;
        this.r_account = r_account;
        this.r_account_id = r_account_id;
    }
}
export class WhooingUserModel {
    constructor(user_id, username, last_ip, last_login_timestamp, created_timestamp, modified_timestamp, language, level, expire, timezone, currency, country, image_url, mileage) {
        this.user_id = user_id;
        this.username = username;
        this.last_ip = last_ip;
        this.last_login_timestamp = last_login_timestamp;
        this.created_timestamp = created_timestamp;
        this.modified_timestamp = modified_timestamp;
        this.language = language;
        this.level = level;
        this.expire = expire;
        this.timezone = timezone;
        this.currency = currency;
        this.country = country;
        this.image_url = image_url;
        this.mileage = mileage;
    }
}
export class WhooingAccountTypeModel {
    constructor(assets, liabilities, capital, income, expenses) {
        this.assets = assets;
        this.liabilities = liabilities;
        this.capital = capital;
        this.income = income;
        this.expenses = expenses;
    }
}
export class WhooingEntryModel {
    constructor(entry_id, entry_date, l_account, l_account_id, r_account, r_account_id, item, money, total, memo, app_id) {
        this.entry_id = entry_id;
        this.entry_date = entry_date;
        this.l_account = l_account;
        this.l_account_id = l_account_id;
        this.r_account = r_account;
        this.r_account_id = r_account_id;
        this.item = item;
        this.money = money;
        this.total = total;
        this.memo = memo;
        this.app_id = app_id;
    }
}
//# sourceMappingURL=index.js.map