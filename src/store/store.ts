import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import createPersistedState from "vuex-persistedstate";
import { IRootState } from "../models/IRootState";
import { App } from "./modules/App";
import { AppData } from "./modules/AppData";
import { Auth } from "./modules/Auth";
import { Entries } from "./modules/Entries";
import { Settings } from "./modules/Settings";
import { User } from "./modules/User";

Vue.use(Vuex);

const store = new Vuex.Store<IRootState>({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    App,
    Auth,
    User,
    Settings,
    AppData,
    Entries,
  },
});
export default store;

export const AppModule = getModule(App, store);
export const AuthModule = getModule(Auth, store);
export const UserModule = getModule(User, store);
export const SettingsModule = getModule(Settings, store);
export const AppDataModule = getModule(AppData, store);
export const EntriesModule = getModule(Entries, store);
