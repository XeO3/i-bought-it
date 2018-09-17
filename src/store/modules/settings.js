import {
  setSelectedSection
} from '../mutation-types'
import {
  ValueLabelModel
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
  settings.itemList = ['이거샀어!', '점심(이온)']
  settings.leftMenuList = [
    new SettingsDataModel('x50', '식비', 'expenses'),
    new SettingsDataModel('x51', '교통비', 'expenses')
  ]
  settings.rightMenuList = [
    new SettingsDataModel('x131', '스이카_정기권', 'assets'),
    new SettingsDataModel('x80', '현금', 'assets')
  ]
}

const state = getTestSettings()

const getters = {}

const mutations = {
  [setSelectedSection](state, sectionId) {
    state.selectedSection = sectionId
  }
}

const actions = {}

const states = {
  state,
  getters,
  mutations,
  actions
}
export default states
