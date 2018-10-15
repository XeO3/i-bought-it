import axios from 'axios'
import { GetWhooingAppTokenData } from '../Types';
/**
 * 후잉 토큰 얻기
 * @param getWhooingAppTokenData 폼데이터
 */
export const getWhooingAppToken = async function (data: GetWhooingAppTokenData) :Promise<string>{
  const url = 'https://old.whooing.com/app_auth/request_token'
  let formData = data.GetFormData()
  const res = await axios.post(url, formData)
  return res.data as string
}


