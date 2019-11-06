import Urls from "./Urls";

export interface LeftItem {
  icon?: string;
  text?: string;
  click: LeftItemClick;
  link?: string;
  divider?: boolean;
  isLogin?: boolean;
}

export enum LeftItemClick {
  None = "None",
  Link = "Link",
  NewTab = "NewTab",
}

const LeftItems: LeftItem[] = [
  { icon: "home", text: "Home", click: LeftItemClick.Link, link: "home" },
  // { icon: "info", text: "About", click: LeftItemClick.Link, link: "about" },
  { divider: true, click: LeftItemClick.None },
  {
    icon: "dashboard",
    text: "대시보드",
    click: LeftItemClick.Link,
    link: "dashboard",
    isLogin: true,
  },
  {
    icon: "mdi-checkbox-multiple-marked-outline",
    text: "중복입력검색 (BETA)",
    click: LeftItemClick.Link,
    link: "checkDuplication",
    isLogin: true,
  },
  // {
  //   icon: "add_circle",
  //   text: "거래입력",
  //   click: LeftItemClick.Link,
  //   link: "input",
  //   isLogin: true,
  // },
  {
    icon: "settings",
    text: "환경설정",
    click: LeftItemClick.Link,
    link: "settings",
    isLogin: true,
  },
  { divider: true, click: LeftItemClick.None, isLogin: true },
  {
    icon: "help",
    text: "HELP",
    click: LeftItemClick.NewTab,
    link: Urls.xeo3_ibi,
  },
  {
    icon: "error",
    text: "버그신고 및 건의사항",
    click: LeftItemClick.NewTab,
    link: Urls.whooingIbi,
  },
  {
    icon: "open_in_new",
    text: "Whooing 바로가기",
    click: LeftItemClick.NewTab,
    link: Urls.whooing,
  },
];
export default LeftItems;
