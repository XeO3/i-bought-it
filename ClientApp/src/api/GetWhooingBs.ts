import axios from 'axios';
import { IWhooingResponseModel } from '@/models/IWhooingResponseModel';
import { Whooing } from '@/utils/WhooingHelper';
import { IWhooingBs } from '@/models/WooingBs';

/**
 * 후잉 유저 정보
 */
export async function getWhooingSections(
  section_id: string,
  end_date: number,
): Promise<IWhooingResponseModel<IWhooingBs>> {
  const url = 'https://old.whooing.com/api/bs.json_array';
  const key = Whooing.ApiKey();
  const res = await axios.get<IWhooingResponseModel<IWhooingBs>>(url, {
    headers: {
      'X-API-KEY': key,
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
