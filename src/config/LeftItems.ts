export interface LeftItem {
  icon?: string;
  text?: string;
  click: LeftItemClick;
  link?: string;
  divider?: boolean;
  isLogin?: boolean;
}

export enum LeftItemClick {
  None = 'None',
  Link = 'Link',
  NewTab = 'NewTab',
}

const LeftItems: LeftItem[] = [
  { icon: 'home', text: 'Home', click: LeftItemClick.Link, link: 'home' },
  { icon: 'info', text: 'About', click: LeftItemClick.Link, link: 'about' },
  { divider: true, click: LeftItemClick.None },
  { icon: 'dashboard', text: 'DashBoard', click: LeftItemClick.Link, link: 'dashboard', isLogin: true },
  { icon: 'add_circle', text: 'Input', click: LeftItemClick.Link, link: 'input', isLogin: true  },
  { icon: 'settings', text: 'Settings', click: LeftItemClick.Link, link: 'settings', isLogin: true  },
  { divider: true, click: LeftItemClick.None, isLogin: true },
  {
    icon: 'open_in_new',
    text: 'Whooing 바로가기',
    click: LeftItemClick.NewTab,
    link: 'https://whooing.com/',
  },
];
export default LeftItems;
