import LoginModalVue from './components/LoginModal.vue';
import { mapState, mapMutations } from 'vuex';
import { removeAlretTop } from './store/mutation-types';
import UserMenuVue from './components/UserMenu.vue';
export default {
    name: 'App',
    components: {
        LoginModal: LoginModalVue,
        UserMenu: UserMenuVue
    },
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: true,
            items: [{
                    icon: 'bubble_chart',
                    title: 'Inspire'
                }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: '이거 샀어'
        };
    },
    computed: Object.assign({}, mapState({
        alertsTop: state => state.alerts.top,
        user: state => state.user.user
    })),
    methods: Object.assign({}, mapMutations([removeAlretTop])),
    created() { }
};
//# sourceMappingURL=app.js.map