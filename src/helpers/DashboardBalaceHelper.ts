import { Settings, SettingsHelper } from '@/store/modules/Settings';
import { User } from '@/store/modules/User';
import { AppData, AppDataHelper } from '@/store/modules/AppData';
import { SettingsModule, UserModule, AppDataModule } from '@/store/store';
import { getWhooingSections } from '@/api/GetWhooingSections';

interface IDashboardBalace {
  section_id: string;
  title: string;
  accounts: IDashboardBalanceItem[];
}

interface IDashboardBalanceItem {
  account_id: string;
  title: string;
  money: number | null;
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
    asset: import('d:/XeO3/project/IBoughtIt_v2/src/models/WhooingAccountModel').WhooingAccountModel,
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
      const pushItem: IDashboardBalanceItem = {
        account_id,
        title: asset.title,
        money: null,
      };
      try {
        const balance = AppDataHelper.Get_Balance(
          appData,
          section_id,
          account_id,
        );
        pushItem.money = balance.money;
      } finally {
        sectionItem.accounts.push(pushItem);
      }
    }
  }
}
