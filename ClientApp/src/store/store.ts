import Vue from 'vue';
import Vuex from 'vuex';
import { IRootState } from '../models/IRootState';
import { AppModule } from './modules/App';
import { AuthModule } from './modules/Auth';
import { UserModule } from './modules/User';

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({});
export default store;
