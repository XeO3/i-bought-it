import { ISettingsSection } from "@/models/ISettingsSection";
import { ISettingsState } from "@/models/ISettingsState";
import store from "@/store/store";
import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { SettingsHelper } from "../../helpers/SettingsHelper";


@Module({ store, name: "Settings" })
export class Settings extends VuexModule implements ISettingsState {
  /** 섹션 설정 */
  public sections: ISettingsSection[] = [];

  // Mutations
  @Mutation
  public Set_SettingsSections(sections: ISettingsSection[]) {
    this.sections = sections;
  }

  /** 섹션설정 추가 */
  @Mutation
  public Push_SettingsSection(newSection: ISettingsSection) {
    this.sections.push(newSection);
  }

  /** 대시보드 표시 항목 추가 */
  @Mutation
  public Push_PinedItem(payload: {
    section_id: string;
    account_id: string;
  }): void {
    const section = SettingsHelper.Get_SettingSecion(payload.section_id);
    section.pinedList.push(payload.account_id);
  }

  /** 대시보드 표시 항목 설정 */
  @Mutation
  public Set_PinedList(payload: {
    section_id: string;
    pinedList: string[];
  }): void {
    const section = SettingsHelper.Get_SettingSecion(payload.section_id);
    section.pinedList = payload.pinedList;
  }

  // Getters
  get hasSettings(): boolean {
    return this.sections.some((section) => section.pinedList.length > 0);
  }

  // Actions
  @Action
  public CLEAR_Settings() {
    this.Set_SettingsSections([]);
  }

  /** 대시보드 표시 항목 토글 */
  @Action
  public Toggle_PinedItem(payload: {
    section_id: string;
    account_id: string;
  }): void {
    const section = SettingsHelper.Get_SettingSecion(payload.section_id);
    if (section.pinedList.some((p) => p === payload.account_id)) {
      const newPinedList = section.pinedList.filter(
        (p) => p === payload.account_id,
      );
      this.Set_PinedList({
        section_id: payload.section_id,
        pinedList: newPinedList,
      });
    } else {
      this.Push_PinedItem(payload);
    }
  }
}
