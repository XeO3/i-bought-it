import axios from 'axios'
/**
 * 후잉 토큰 얻기
 * @param {GetWhooingAppTokenData} getWhooingAppTokenData 폼데이터
 */
export const getWhooingAppToken = async function (getWhooingAppTokenData) {
  const url = 'https://old.whooing.com/app_auth/request_token'
  let formData = new FormData()
  for (var key in getWhooingAppTokenData) {
    formData.append(key, getWhooingAppTokenData[key])
  }
  // console.log(getWhooingAppTokenData, formData)
  const res = await axios.post(url, formData)
  return res.data
}

/**
 * 후잉 로그인 토큰 발급용 데이터
 */
export class GetWhooingAppTokenData {
  app_id;
  app_secret;
  constructor(appId, appSecret) {
    this.app_id = appId
    this.app_secret = appSecret
  }
}
