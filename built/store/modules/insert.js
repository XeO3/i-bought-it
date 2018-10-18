import { setMoney } from '../mutation-types';
const state = {
    money: 0
};
const getters = {};
const mutations = {
    [setMoney](state, money) {
        state.money = money;
    }
};
const actions = {};
export default {
    state,
    getters,
    mutations,
    actions
};
//# sourceMappingURL=insert.js.map