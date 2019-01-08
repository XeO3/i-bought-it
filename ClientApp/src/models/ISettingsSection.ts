export interface ISettingsSection {
  /** 섹션 아이디 */
  section_id: string;
  /** 대시보드 표시 항목리스트 */
  pinedList: string[];
}

export class SettingsSection implements ISettingsSection {
  public section_id: string;
  public pinedList: string[] = [];
  constructor(section_id: string) {
    this.section_id = section_id;
  }
}
