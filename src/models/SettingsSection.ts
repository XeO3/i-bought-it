import { ISettingsSection } from "./ISettingsSection";
export class SettingsSection implements ISettingsSection {
  public section_id: string;
  public pinedList: string[] = [];
  constructor(section_id: string) {
    this.section_id = section_id;
  }
}
