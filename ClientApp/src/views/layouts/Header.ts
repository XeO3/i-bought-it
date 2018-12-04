import { Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
export default class Layout extends Vue {
  public functional: true = true;
  public ToggleSidebar() {
    AppModule.ToggleSideBar();
  }
}
