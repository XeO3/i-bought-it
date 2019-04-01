import Urls from "@/config/Urls";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import { IWhooingBs } from "@/models/WooingBs";
import { Whooing } from "@/utils/WhooingHelper";
import axios from "axios";

/**
 * 후잉 잔액 정보가져오기
 * @param section_id 섹션아이디
 * @param end_date 날짜(Whooing Date)
 */
export async function getWhooingBs(
  section_id: string,
  end_date: number,
): Promise<IWhooingResponseModel<IWhooingBs>> {
  const url = Urls.whooingApi + "bs.json_array";
  const key = Whooing.ApiKey();
  const res = await axios.get<IWhooingResponseModel<IWhooingBs>>(url, {
    headers: {
      "X-API-KEY": key,
    },
    params: {
      section_id,
      end_date,
    },
  });
  return res.data;
}

// result example
// {
// 	"code" : 200,
// 	"message" : "",
// 	"error_parameters" : {},
// 	"rest_of_api" : 4988,
// 	"results" : {
// 		"assets" : {
// 			"total" : 11621000,
// 			"accounts" : [
// 				{
// 					"account_id" : "x1",
// 					"money" : 500000
// 				},
// 				{
// 					"account_id" : "x2",
// 					"money" : 201000
// 				}
// 				.
// 				.
// 				.
// 			]
// 		},
// 		"liabilities" : {
// 			.
// 			.
// 			.
// 		}
// 	}
// }
