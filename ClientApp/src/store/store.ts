import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IRootState } from '../models/IRootState';

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({
  strict: true,
  plugins: [createPersistedState()],
});
export default store;
