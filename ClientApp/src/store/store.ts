import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/App';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
}

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({});
export default store;
