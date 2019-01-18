export interface LeftItem {
  icon?: string;
  text?: string;
  click: LeftItemClick;
  link?: string;
  divider?: boolean;
}

export enum LeftItemClick {
  None = 'None',
  Link = 'Link',
  NewTab = 'NewTab',
}

const LeftItems: LeftItem[] = [
  { icon: 'home', text: 'Home', click: LeftItemClick.Link, link: 'home' },
  { icon: 'dashboard', text: 'DashBoard', click: LeftItemClick.Link, link: 'dashboard' },
  { divider: true, click: LeftItemClick.None },
  { icon: 'settings', text: 'Settings', click: LeftItemClick.Link, link: 'settings'  },
  { icon: 'info', text: 'About', click: LeftItemClick.Link, link: 'about' },
  { divider: true, click: LeftItemClick.None },
  {
    icon: 'open_in_new',
    text: 'Whooing 바로가기',
    click: LeftItemClick.NewTab,
    link: 'https://whooing.com/',
  },
];
export default LeftItems;
