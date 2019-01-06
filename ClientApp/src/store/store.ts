import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IRootState } from '../models/IRootState';
import { App } from './modules/App';
import { getModule } from 'vuex-module-decorators';
import { Auth } from './modules/Auth';
import { User } from './modules/User';
import { Settings } from './modules/Settings';

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    App,
    Auth,
    User,
    Settings,
  },
});
export default store;

export const AppModule = getModule(App, store);
export const AuthModule = getModule(Auth, store);
export const UserModule = getModule(User, store);
export const SettingsModule = getModule(Settings, store);
