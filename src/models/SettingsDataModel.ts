import { SettingsMemuItemModel } from "./SettingsMemuItemModel";
export class SettingsDataModel {
  constructor(
    public sectionId: string,
    public itemList: string[] = [],
    public leftMenuList: SettingsMemuItemModel[] = [],
    public rightMenuList: SettingsMemuItemModel[] = [],
  ) {}
}
