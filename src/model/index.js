export class UserTokenData {
  token
  token_secret
  user_id
}

export class AlertModel {
  message
  icon
  dismissible = false
  outline = false
  transition
  /**
   * success, info, warning, error
   */
  type = 'error'
  value = true
}
