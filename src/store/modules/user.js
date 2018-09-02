import {
  setUserToken,
  setUser
} from '../mutation-types'
import sha1 from 'js-sha1'

class UserState {
  token
  token_secret
  user_id
  user
  constructor() {
    this.token = null
    this.token_secret = null
    this.user_id = null
    this.user = null
  }
}

const state = new UserState()

const getters = {
  apiKey(state, getters, rootState) {
    // X-API-KEY:app_id=45,
    // token=7580361ddabad0a55ab34ee880be438a0e5dc294,
    // signiture=f0bd0e904282 ea22a252b0a32d9638dc4c700e2,
    // nounce=dc5584feec085bbda9a26e013f702c9b77692625,timest
    if (!state.token) {
      return null
    }
    let signiture = sha1(rootState.app_secret + '|' + state.token_secret)
    let nounce = Math.random().toString(36).substring(7)
    let timestapme = Date.now()
    let list = [
      `app_id=${rootState.app_id}`,
      `token=${state.token}`,
      `signiture=${signiture}`,
      `nounce=${nounce}`,
      `timestapme=${timestapme}`
    ]
    return list.join(',')
  }
}

const mutations = {
  [setUserToken](state, {
    token,
    token_secret,
    user_id
  }) {
    state.token = token
    state.token_secret = token_secret
    state.user_id = user_id
  },
  [setUser](state, user) {
    state.user = user
  }
}

const user = {
  state,
  getters,
  mutations,
  actions: {}
}
export default user
