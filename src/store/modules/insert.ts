import { setMoney } from '../mutation-types'
import { InsertStateModel } from '../../Types';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';


const state: InsertStateModel = {
  money: 0
}

const getters: GetterTree<InsertStateModel, any> = {}

const mutations: MutationTree<InsertStateModel> = {
  [setMoney](state, money) {
    state.money = money
  }
}

const actions: ActionTree<InsertStateModel, any> = {}

export default <Module<InsertStateModel, any>>{
  state,
  getters,
  mutations,
  actions
}
