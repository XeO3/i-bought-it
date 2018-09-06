import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import appSetting from '../../appSetting.json'
import user from './modules/user'
import states from './modules/states'
import alerts from './modules/alerts'

Vue.use(Vuex)

const state = {
  app_id: appSetting.app_id,
  app_secret: appSetting.app_secret
}

const store = new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state,
  modules: {
    user: user,
    states: states,
    alerts: alerts
  }
})

export default store
