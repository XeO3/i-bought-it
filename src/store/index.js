import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import appSetting from '../../appSetting.json'

Vue.use(Vuex)

const state = {
  app_id: appSetting.app_id,
  app_secret: appSetting.app_secret
}

const store = new Vuex.Store({
  state,
  modules: {
    user: user
  }
})

export default store
