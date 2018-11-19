import { Component, Vue, Prop } from 'vue-property-decorator';
import LeftItems, { LeftItem, LeftItemClick } from '../config/LeftItems';

@Component({})
export default class LeftNav extends Vue {
  @Prop()
  private value = false;
  private items = LeftItems;
  public itemClick(item: LeftItem) {
    switch (item.click) {
      case LeftItemClick.NewTab:
        const win = window.open(item.link, '_blank');
        if (win instanceof Window) {
          win.focus();
          return;
        }
      case LeftItemClick.Link:
        this.$router.push({ name: item.link });
        return;
    }
  }
}
