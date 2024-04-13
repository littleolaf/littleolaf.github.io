---
title: 个人主页搭建学习记录
published: 2024-04-13
description: "尝试在GitHub上搭建个人主页"
# image: "./cover.jpeg"
tags: ["Website"]
category: 实践学习
draft: false
---
# Hexo个人主页学习记录
安装笔记
https://www.bilibili.com/read/cv32931591

官网皮肤
[Themes | Hexo](https://hexo.io/themes/)

github选定皮肤，查看安装文档  
[hexo-theme-vivia/README.zh-CN.md at main · saicaca/hexo-theme-vivia (github.com)](https://github.com/saicaca/hexo-theme-vivia/blob/main/README.zh-CN.md)

每次更新的时候都要 清除之前的编译，重新编译  
`hexo clean` `hexo generate`

```bash
hexo clean && hexo g && hexo s
```

# Astro个人主页学习记录
我选的GitHub主题网站：  
https://github.com/saicaca/fuwari  

Astro官方文档：  
https://docs.astro.build/en/install/auto/  
## 全流程
>- 可以先挑选喜欢的theme，根据theme的github文档指示安装。比如我目前使用的theme就是将theme的仓库clone到本地然后初始化并构建依赖。  
或者可以根据官方文档的流程进行。  
>- 构建依赖后即可进行个性化设置与内容制作。此时可使用`pnpm dev`命令启动本地预览。
>- 完成内容制作后，参考[部署文档](https://docs.astro.build/en/guides/deploy/)将项目部署至GitHub即发布成功。  

### 完成个性化设置需要知道的必备知识：  
>1. 修改`src/configs.ts`  
>2. 文章内容存储在`src/content/posts`中，`/spec`是about页面的专属文件夹。
>3. 若需要新建分类栏页面可参考官方文档，在`src/pages`中新建`.astro`文件。  

# PicList图床与在线图片仓库使用记录
PicList Github：[GitHub](https://github.com/Kuingsmile/PicList)  
  PicList使用教程：[PicList官方文档](https://piclist.cn/app.html)  

流程：
- 下载PicList软件：[download](https://github.com/Kuingsmile/PicList/releases/latest)  

- 下载完后需在`图床/GitHub`和`管理/GitHub`中进行配置，连接到github中的<font color="#ff0000">Public Repository</font>。

- 将上传图片得到的url链接粘贴在Markdown文档中即可使用。