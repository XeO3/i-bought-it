import {setMoney} from '../mutation-types'

const state = {
  money: 0
}

const getters = {}

const mutations = {
  [setMoney](state, money) {
    state.money = money
  }
}

const actions = {}

const alerts = {
  state,
  getters,
  mutations,
  actions
}
export default alerts
