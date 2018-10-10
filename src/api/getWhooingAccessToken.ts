import axios from 'axios'
import { GetWhooingAccessTokenData } from '../Types';
/**
 * 후잉 엑서스 토큰 발급
 * @param {GetWhooingAccessTokenData} GetWhooingAccessTokenData 폼데이터
 */
export const getWhooingAccessToken = async function (data: GetWhooingAccessTokenData) {
  const url = 'https://old.whooing.com/app_auth/access_token'
  let formData = data.GetFormData()
  const res = await axios.post(url, formData)
  return res.data
}
