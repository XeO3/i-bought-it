import Urls from "@/config/Urls";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import { IWhoooingGetEntriesParams } from "@/models/IWhoooingGetEntriesPayload";
import { PostWhooingEntriesData } from "@/models/PostWhooingEntriesData";
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import { AuthModule } from "@/store/store";
import { Whooing } from "@/utils/WhooingHelper";
import axios from "axios";

/**
 * 후잉 거래 가져오기
 */
export async function getWhooingEntries(
  params: IWhoooingGetEntriesParams,
): Promise<IWhooingResponseModel<IWhooingEntriesResults>> {
  const url = Urls.whooingApi + "entries.json_array";
  const key = Whooing.ApiKey();
  const res = await axios.get<IWhooingResponseModel<IWhooingEntriesResults>>(
    url,
    {
      headers: {
        "X-API-KEY": key,
      },
      params,
    },
  );
  if (res.data.code === 405) {
    AuthModule.SET_TOKENEXPIRATION(true);
  }
  return res.data;
}

export interface IWhooingEntriesResults {
  reports: any[];
  rows: WhooingEntryModel[];
}

// let resultsample = {
// 	"code" : 200,
// 	"message" : "",
// 	"error_parameters" : {},
// 	"rest_of_api" : 4988,
// 	"results" : {
// 		"reports" : [],
// 		"rows" : [
// 			{
// 				"entry_id" : 1352827,
// 				"entry_date" : 20110817.0001,
// 				"l_account" : "expenses",
// 				"l_account_id" : "x20",
// 				"r_account" : "assets",
// 				"r_account_id" : "x4",
// 				"item" : "후원(과장학금)",
// 				"money" : 10000,
// 				"total" : 840721.99
// 				"memo" : "",
// 				"app_id" : 0
// 			},
// 			{
// 				"entry_id" : 1352823,
// 				"entry_date" : 20110813.0001,
// 				"l_account" : "assets",
// 				"l_account_id" : "x3",
// 				"r_account" : "assets",
// 				"r_account_id" : "x4",
// 				"item" : "계좌이체",
// 				"money" : 10000,
// 				"total" : 840721.99
// 				"memo" : "",
// 				"app_id" : 0
// 			}
// 		]
// 	}
// }
