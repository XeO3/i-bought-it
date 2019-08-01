import { ISettingsSection } from "@/models/ISettingsSection";
import { SettingsSection } from "@/models/SettingsSection";
import { WhooingAccountModel } from "@/models/WhooingAccountModel";
import { SettingsModule, UserModule } from "@/store/store";
import { Settings } from "../store/modules/Settings";
import { User } from "../store/modules/User";
export namespace SettingsHelper {
  /** section_id에 해당하는 섹션 설정을 불러옵니다.
   *  해당 하는 항목이 없을경우 새 섹션 설정을 추가합니다.
   */
  export function Get_SettingSecion(section_id: string): ISettingsSection {
    const item = SettingsModule.sections.find(
      (o) => o.section_id === section_id,
    );
    if (item) {
      return item;
    } else {
      if (UserModule.sectionList.some((o) => o.section_id === section_id)) {
        const newSection = new SettingsSection(section_id);
        SettingsModule.Push_SettingsSection(newSection);
        return newSection;
      }
    }
    throw new Error(`섹션아이디 [${section_id}]는 유효하지 않습니다.`);
  }
  /**
   * 대시보드 표시 항목일경우 true
   * @param payload 조건
   * @param settings 셋팅모듈
   */
  export const IsPined = (
    payload: {
      section_id: string;
      account_id: string;
    },
    settings: Settings = SettingsModule,
  ): boolean => {
    return settings.sections.some((section) => {
      return (
        section.section_id === payload.section_id &&
        section.pinedList.includes(payload.account_id)
      );
    });
  };
  /**
   * 最初のSectionのアカウントを全部Pinする
   */
  export const SetPinListFirstSection = (
    userModule: User = UserModule,
  ): void => {
    const firstSection = userModule.sectionList[0];
    if (firstSection && firstSection.accounts) {
      const accounts = firstSection.accounts;
      const enableList = [...accounts.assets, ...accounts.liabilities]
        .filter((account) => IsShowAccount(account))
        .map((account) => account.account_id);
      SettingsModule.Set_PinedList({
        section_id: firstSection.section_id,
        pinedList: enableList,
      });
    }
  };
  export const IsShowAccount = (account: WhooingAccountModel): boolean => {
    if (account.type === "group") {
      return false;
    }
    if (WhooingAccountModel.IsClosed(account)) {
      return false;
    }
    return true;
  };
}
