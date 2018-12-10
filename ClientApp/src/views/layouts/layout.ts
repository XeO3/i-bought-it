import { Component, Vue } from 'vue-property-decorator';
import LeftNav from './navs/LeftNav';

@Component({
  components: {
    LeftNav,
  },
})
export default class Layout extends Vue {
}
