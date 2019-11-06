import { SettingsHelper } from "@/helpers/SettingsHelper";
import { UserHelper } from "@/store/modules/User";
import { SettingsModule } from "@/store/store";
import { WhooingDate } from "@/utils/WhooingDate";
import fns from "date-fns";
import Vue from "vue";

Vue.filter(
  "whooingDate",
  (dateNum: number): Date => WhooingDate.ParseNumber(dateNum),
);

Vue.filter(
  "dateToString",
  (date: Date, format: string = "YYYY-MM-DD"): string =>
    fns.format(date, format),
);

Vue.filter(
  "accountLabel",
  (account_id: string, section_id: string, defaultValue: string): string =>
    UserHelper.GetAccountName(section_id, account_id) || defaultValue,
);
