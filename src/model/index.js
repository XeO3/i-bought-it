export class GetWhooingAppTokenData {
  app_id
  app_secret
  constructor(appId, appSecret) {
    this.app_id = appId
    this.app_secret = appSecret
  }
}

export class PostWhooingLoginHtmlData {
  token
  callbackuri
  constructor(token, callbackuri) {
    this.token = token
    this.callbackuri = callbackuri
  }
}
