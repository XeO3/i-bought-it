import {
  addAlertTop,
  removeAlretTop
} from '../mutation-types'

const state = {
  top: []
}

const getters = {}

const mutations = {
  [addAlertTop](state, alert) {
    state.top.push(alert)
  },
  [removeAlretTop](state, alert) {
    state.top = state.top.filter(a => a !== alert)
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
