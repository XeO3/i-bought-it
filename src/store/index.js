import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import states from './modules/states'
import appSetting from '../../appSetting.json'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  app_id: appSetting.app_id,
  app_secret: appSetting.app_secret
}

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  modules: {
    user: user,
    states: states
  }
})

export default store
