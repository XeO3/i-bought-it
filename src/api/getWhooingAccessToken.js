import axios from 'axios'
/**
 * 후잉 엑서스 토큰 발급
 * @param {GetWhooingAccessTokenData} GetWhooingAccessTokenData 폼데이터
 */
export const getWhooingAccessToken = async function (GetWhooingAccessTokenData) {
  const url = 'https://whooing.com/app_auth/access_token'
  let formData = new FormData()
  for (var key in GetWhooingAccessTokenData) {
    formData.append(key, GetWhooingAccessTokenData[key])
  }
  // console.log(GetWhooingAccessTokenData, formData)
  const res = await axios.post(url, formData)
  return res.data
}
/**
 * 후잉 엑서스 토큰 발급용 데이터
 */
export class GetWhooingAccessTokenData {
  app_id;
  app_secret;
  token;
  pin;
  constructor(app_id, app_secret, token, pin) {
    this.app_id = app_id
    this.app_secret = app_secret
    this.token = token
    this.pin = pin
  }
}
