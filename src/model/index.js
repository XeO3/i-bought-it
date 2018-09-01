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
