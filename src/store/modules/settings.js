import {
  setSelectedSection,
  setSettings
} from '../mutation-types'
import {
  SettingsMemuItemModel
} from '../../model/ValueLabelModel'

class SettingsModel {
  selectedSection = null
  data = {}
}
class SettingsDataModel {
  sectionId
  itemList = []
  leftMenuList = []
  rightMenuList = []
}

function getTestSettings() {
  let settings = new SettingsModel()
  settings.sectionId = 's36403'
  settings.itemList = ['점심(이온)', '이거샀어!']
  settings.leftMenuList = [
    new SettingsMemuItemModel('x50', '식비', 'expenses'),
    new SettingsMemuItemModel('x51', '교통비', 'expenses'),
    new SettingsMemuItemModel('x125', '불명', 'expenses')
  ]
  settings.rightMenuList = [
    new SettingsMemuItemModel('x131', '스이카_정기권', 'assets'),
    new SettingsMemuItemModel('x80', '현금', 'assets')
  ]
  return settings
}

const state = new SettingsDataModel()

const getters = {}

const mutations = {
  [setSelectedSection](state, sectionId) {
    state.selectedSection = sectionId
  },
  [setSettings](state, settings) {
    Object.assign(state, new SettingsModel(), settings)
  }
}

const actions = {
  setTestSettings({
    commit
  }) {
    commit(setSettings, getTestSettings())
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
