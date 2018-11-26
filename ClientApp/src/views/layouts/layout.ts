import { Component, Prop, Vue } from 'vue-property-decorator';
import LeftNav from './navs/LeftNav';
import { AppModule } from '@/store/modules/app';


@Component({
  components: {
    LeftNav,
  },
})
export default class Layout extends Vue {
  public ToggleLeftNav() {
    AppModule.ToggleSideBar();
  }
}
