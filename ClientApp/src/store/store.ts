import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/App';
import { IAuthState } from './modules/Auth';
import { IUserState } from './modules/User';

Vue.use(Vuex);

export interface IRootState {
  App: IAppState;
  Auth: IAuthState;
  User: IUserState;
}

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({});
export default store;
