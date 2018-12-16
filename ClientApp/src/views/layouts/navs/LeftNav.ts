import { Component, Vue, Prop } from 'vue-property-decorator';
import LeftItems, { LeftItem, LeftItemClick } from '@/config/LeftItems';
import { AppModule } from '@/store/modules/App';

@Component({})
export default class LeftNav extends Vue {
  private items = LeftItems;

  get opened(): boolean {
    return AppModule.sidebar.opened;
  }
  set opened(v) {
    AppModule.SET_SIDEBAR(v);
  }

  public itemClick(item: LeftItem) {
    switch (item.click) {
      case LeftItemClick.NewTab:
        this.opened = false;
        const win = window.open(item.link, '_blank');
        if (win instanceof Window) {
          win.focus();
        }
        break;
      case LeftItemClick.Link:
        this.$router.push({ name: item.link });
        break;
    }
  }
}
