import {
  setUserToken,
  setUser,
  logout,
  setSections,
  setAccounts,
  setFrequentItems
} from '../mutation-types'
import sha1 from 'js-sha1'
import {
  getWhooingUser
} from '../../api/getWhooingUser'
import {
  getWhooingSections
} from '../../api/getWhooingSections'
import {
  getWhooingAccounts
} from '../../api/getWhooingAccounts'
import {
  getWhooingFrequentItems
} from '../../api/getWhooingFrequentItems'
import { UserState } from '../../Types';
import { GetterTree, MutationTree, ActionTree } from 'vuex';



const state = <UserState>{}

const getters = <GetterTree<UserState, any>>{
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

const mutations = <MutationTree<UserState>>{
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
  },
  [setSections](state, sections) {
    state.sections = sections
  },
  [setAccounts](state, accounts) {
    state.accounts = accounts
  },
  [setFrequentItems](state, frequentItems) {
    state.frequentItems = frequentItems
  },
  [logout](state) {
    Object.assign(state, new UserState())
  }
}

const actions = <ActionTree<UserState, any>>{
  async initUserDataAsync({
    commit,
    dispatch
  }) {
    // 유저정보
    let userdata = await getWhooingUser()
    commit(setUser, userdata.results)
    // 섹션리스트
    let sectionsdata = await getWhooingSections()
    commit(setSections, sectionsdata.results)
    // 항목리스트
    let promiseAccounts = sectionsdata.results
      .map(section => getWhooingAccounts(section.section_id))
    Promise.all(promiseAccounts)
      .then(values => commit(setAccounts, values.map(v => v.results)))
    // 자주입력거래 리스트
    let promiseFrequentItems = sectionsdata.results
      .map(section => getWhooingFrequentItems(section.section_id))
    Promise.all(promiseFrequentItems)
      .then(values => commit(setFrequentItems, values.map(v => v.results)))

    // settins
    dispatch('setTestSettings')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
