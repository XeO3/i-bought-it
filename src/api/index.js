import axios from 'axios'

/**
 * 후잉 토큰 얻기
 * @param {GetWhooingAppTokenData} getWhooingAppTokenData 폼데이터
 */
const getWhooingAppToken = async function (getWhooingAppTokenData) {
  const url = 'https://whooing.com/app_auth/request_token'
  let formData = new FormData()
  for (var key in getWhooingAppTokenData) {
    formData.append(key, getWhooingAppTokenData[key])
  }
  const res = await axios.post(url, formData)
  return res.data
}

/**
 * 후잉 엑서스 토큰 발급
 * @param {GetWhooingAccessTokenData} GetWhooingAccessTokenData 폼데이터
 */
const getWhooingAccessToken = async function (GetWhooingAccessTokenData) {
  const url = 'https://whooing.com/app_auth/authorize'
  let formData = new FormData()
  for (var key in GetWhooingAccessTokenData) {
    formData.append(key, GetWhooingAccessTokenData[key])
  }
  const res = await axios.post(url, formData)
  return res.data
}

/**
 * 후잉 로그인 토큰 발급용 데이터
 */
export class GetWhooingAppTokenData {
  app_id
  app_secret
  constructor(appId, appSecret) {
    this.app_id = appId
    this.app_secret = appSecret
  }
}

/**
 * 후잉 엑서스 토큰 발급용 데이터
 */
export class GetWhooingAccessTokenData {
  app_id
  app_secret
  token
  pin
  constructor(app_id, app_secret, token, pin) {
    this.app_id = app_id
    this.app_secret = app_secret
    this.token = token
    this.pin = pin
  }
}

export {
  getWhooingAppToken,
  getWhooingAccessToken
}
