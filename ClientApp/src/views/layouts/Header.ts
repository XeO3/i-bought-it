import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/App';
import LoginModal from '@/components/login/LoginModal';

@Component({
  components: {
    LoginModal,
  },
})
export default class Header extends Vue {
  public functional: true = true;
  public ToggleSidebar() {
    AppModule.ToggleSideBar();
  }
}
