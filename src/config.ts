import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'
// 站点配置
export const siteConfig: SiteConfig = {
  title: 'Tang\'s little house',
  subtitle: '珠海拾遗',
  lang: 'en',
  themeHue: 250,
  banner: { // 站点横幅
    enable: true,
    src: 'https://raw.githubusercontent.com/littleolaf/Web-picture-repo/master/life/202404140110296.jpg',// 默认 'assets/images/demo-banner.png',
  },
}
// 导航栏配置
export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com/littleolaf',
    //   external: true,
    // },
  ],
}
// 个人信息配置
export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/head.jpg', // 头像
  name: 'Tang Wuyang',
  bio: '糖的云上小窝',
  links: [
    {
      name: 'CV',
      icon: 'fa6-solid:circle-user',
      url: '',
    },
    {
      name: 'Google',
      icon: 'fa6-brands:google',
      url: 'https://google.com',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/littleolaf',
    },
    {
      name: 'Bilibili',
      icon: 'fa6-brands:bilibili',
      url: 'https://space.bilibili.com/700906452',
    }
  ],
}
// 版权信息配置
export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
