import {
  pushHistory
} from '../mutation-types'

const state = {
  list: []
}

const getters = {}

const mutations = {
  [pushHistory](state, item) {
    state.list.push(item)
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
