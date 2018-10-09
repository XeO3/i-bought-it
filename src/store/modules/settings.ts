import {
  setSelectedSection,
  setSettings
} from '../mutation-types'
import { SettingsMemuItemModel, SettingsModel, SettingsDataModel } from '../../Types';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';


function getTestSettings() {
  let settings = <SettingsDataModel>{
    sectionId: 's36403',
    itemList: ['점심(이온)', '이거샀어!'],
    leftMenuList: [
      new SettingsMemuItemModel('x50', '식비', 'expenses'),
      new SettingsMemuItemModel('x51', '교통비', 'expenses'),
      new SettingsMemuItemModel('x125', '불명', 'expenses')
    ],
    rightMenuList: [
      new SettingsMemuItemModel('x131', '스이카_정기권', 'assets'),
      new SettingsMemuItemModel('x80', '현금', 'assets')
    ]
  }
  return settings
}

const state = <SettingsModel>{}

const getters = <GetterTree<SettingsModel, any>>{}

const mutations = <MutationTree<SettingsModel>>{
  [setSelectedSection](state, sectionId) {
    state.selectedSection = sectionId
  },
  [setSettings](state, settings) {
    Object.assign(state, <SettingsModel>{}, settings)
  }
}

const actions = <ActionTree<SettingsModel, any>>{
  setTestSettings({
    commit
  }) {
    commit(setSettings, getTestSettings())
  }
}

export default <Module<SettingsModel, any>>{
  state,
  getters,
  mutations,
  actions
}
