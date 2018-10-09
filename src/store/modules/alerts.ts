import {
  addAlertTop,
  removeAlretTop
} from '../mutation-types'
import { MutationTree, GetterTree, ActionTree, Module } from 'vuex'
import { AlertsStateModel } from '../../Types';

const state = <AlertsStateModel>{
  top: []
}

const getters: GetterTree<AlertsStateModel, any> = {}

const mutations: MutationTree<AlertsStateModel> = {
  [addAlertTop](state, alert) {
    state.top.push(alert)
  },
  [removeAlretTop](state, alert) {
    state.top = state.top.filter(a => a !== alert)
  }
}
const actions: ActionTree<AlertsStateModel, any> = {}

export default <Module<AlertsStateModel, any>>{
  state,
  getters,
  mutations,
  actions
}
