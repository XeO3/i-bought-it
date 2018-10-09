import {
  pushHistory
} from '../mutation-types'
import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { HistoryStateModel } from '../../Types';

const state: HistoryStateModel = {
  list: []
}

const getters: GetterTree<HistoryStateModel, any> = {}

const mutations: MutationTree<HistoryStateModel> = {
  [pushHistory](state, item) {
    state.list.push(item)
  }
}

const actions: ActionTree<HistoryStateModel, any> = {}

export default <Module<HistoryStateModel, any>>{
  state,
  getters,
  mutations,
  actions
}
