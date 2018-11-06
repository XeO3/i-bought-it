import { setSelectedSection, setSettings } from '../mutation-types';
import { SettingsMemuItemModel } from '../../Types';
function getTestSettings() {
    let settings = {
        sectionId: 's36403',
        itemList: ['점심(이온)', '이거샀어!'],
        leftMenuList: [
            new SettingsMemuItemModel('x50', '식비', 'expenses'),
            new SettingsMemuItemModel('x51', '교통비', 'expenses'),
            new SettingsMemuItemModel('x125', '불명', 'expenses')
        ],
        rightMenuList: [
            new SettingsMemuItemModel('x131', '스이카_정기권', 'assets'),
            new SettingsMemuItemModel('x80', '현금', 'assets')
        ]
    };
    return settings;
}
const state = {};
const getters = {};
const mutations = {
    [setSelectedSection](state, sectionId) {
        state.selectedSection = sectionId;
    },
    [setSettings](state, settings) {
        Object.assign(state, {}, settings);
    }
};
const actions = {
    setTestSettings({ commit }) {
        commit(setSettings, getTestSettings());
    }
};
export default {
    state,
    getters,
    mutations,
    actions
};
//# sourceMappingURL=settings.js.map