import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import appSetting from '../../appSetting.json';
import user from './modules/user';
import settings from './modules/settings';
import alerts from './modules/alerts';
import history from './modules/history';
Vue.use(Vuex);
const state = {
    app_id: appSetting.app_id,
    app_secret: appSetting.app_secret
};
const store = new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state,
    modules: {
        user: user,
        settings: settings,
        alerts: alerts,
        history: history
    }
});
export default store;
//# sourceMappingURL=index.js.map