import Urls from "@/config/Urls";
import { IWhooingResponseModel } from "@/models/IWhooingResponseModel";
import { AuthModule } from "@/store/store";
import { Whooing } from "@/utils/WhooingHelper";
import axios from "axios";

/**
 * 후잉 거래 삭제
 */
export async function DeleteWhooingEntries(
  entry_ids: number | number[],
): Promise<IWhooingResponseModel<void>> {
  const url = Urls.whooingApi + "entries/" + entry_ids;
  const key = Whooing.ApiKey();
  const res = await axios.delete(url, {
    headers: {
      "X-API-KEY": key,
    },
  });
  if (res.data.code === 200) {
    return res.data;
  } else {
    if (res.data.code === 405) {
      AuthModule.SET_TOKENEXPIRATION(true);
    }
    throw new Error(`거래내역 삭제 실패 (${res.data.code})`);
  }
}

// Example Results(.json, .json_array)
// {
// 	"code" : 200,
// 	"message" : "",
// 	"error_parameters" : {},
// 	"rest_of_api" : 4948
// }
