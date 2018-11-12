import LoginModalVue from './components/LoginModal.vue'
import { mapState, mapMutations } from 'vuex'
import { removeAlretTop } from './store/mutation-types'
import UserMenuVue from './components/UserMenu.vue'

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
    }
  },
  computed: {
    ...mapState({
      alertsTop: state => (state as any).alerts.top,
      user: state => (state as any).user.user
    })
  },
  methods: {
    ...mapMutations([removeAlretTop])
  },

  created() { }
}
