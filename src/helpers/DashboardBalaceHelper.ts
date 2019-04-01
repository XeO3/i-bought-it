import { getWhooingSections } from "@/api/GetWhooingSections";
import { WhooingAccount } from "@/models/EnumWhooingAccount";
import { WhooingAccountModel } from "@/models/WhooingAccountModel";
import { AppData, AppDataHelper } from "@/store/modules/AppData";
import { Settings, SettingsHelper } from "@/store/modules/Settings";
import { User, UserHelper } from "@/store/modules/User";
import { AppDataModule, SettingsModule, UserModule } from "@/store/store";

export interface IDashboardBalace {
  section_id: string;
  title: string;
  accounts: IDashboardBalanceItem[];
}

export interface IDashboardBalanceItem {
  account_id: string;
  account: WhooingAccount;
  title: string;
  money: number | null;
  isLoading: boolean;
}

export namespace DashboardBalaceHelper {
  /**
   * 대시보드에 표시할 잔액 아이템을 불러옴
   * @param settings
   * @param user
   * @param appData
   */
  export const Get = (
    settings: Settings = SettingsModule,
    user: User = UserModule,
    appData: AppData = AppDataModule,
  ): IDashboardBalace[] => {
    const list: IDashboardBalace[] = [];

    user.sectionList.forEach((section) => {
      const section_id = section.section_id;
      const sectionItem: IDashboardBalace = {
        section_id,
        title: section.title,
        accounts: [],
      };
      if (section.accounts) {
        section.accounts.assets.forEach((asset) => {
          const account_id = asset.account_id;
          GetSection(
            section_id,
            account_id,
            settings,
            asset,
            appData,
            sectionItem,
          );
        });

        section.accounts.liabilities.forEach((liab) => {
          const account_id = liab.account_id;
          GetSection(
            section_id,
            account_id,
            settings,
            liab,
            appData,
            sectionItem,
          );
        });
      }
      if (sectionItem.accounts.length > 0) {
        list.push(sectionItem);
      }
    });
    return list;
  };

  function GetSection(
    section_id: string,
    account_id: string,
    settings: Settings,
    asset: WhooingAccountModel,
    appData: AppData,
    sectionItem: IDashboardBalace,
  ) {
    if (
      SettingsHelper.IsPined(
        {
          section_id,
          account_id,
        },
        settings,
      )
    ) {
      const accountItem = UserHelper.GetAccount(section_id, account_id);
      if (!accountItem) {
        throw Error("계정정보가 없습니다.");
      }
      const pushItem: IDashboardBalanceItem = {
        account_id,
        account: accountItem.account,
        title: asset.title,
        money: null,
        isLoading: false,
      };
      try {
        const balance = AppDataHelper.Get_Balance(
          section_id,
          account_id,
          appData,
        );
        pushItem.money = balance.money;
        pushItem.isLoading = balance.isLoading;
      } finally {
        sectionItem.accounts.push(pushItem);
      }
    }
  }
}
