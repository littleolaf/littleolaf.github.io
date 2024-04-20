---
title: 用VS Code配置LaTeX
published: 2024-04-17
description: '学习用VS Code配置LaTeX'
image: ''
tags: [latex]
category: '实践学习'
draft: false 
---
步骤：  
- [环境配置](#环境配置)
	- [1. tex live安装](#1-tex-live安装)
	- [2. vs code 插件](#2-vs-code-插件)
	- [3. 配置相关信息](#3-配置相关信息)
		- [工作区设置](#工作区设置)
		- [LaTeX具体配置信息](#latex具体配置信息)
	- [4. Sumatra PDF](#4-sumatra-pdf)
- [Latex 模板下载与使用](#latex-模板下载与使用)
	- [IEEE论文模板](#ieee论文模板)
# 环境配置
要是嫌麻烦可以直接搜索并下载使用tex studio
## 1. tex live安装
官方网址：[TeX Live - TeX Users Group (tug.org)](https://tug.org/texlive/)  
可以在自定义安装中：1. 修改安装路径。2. 取消安装tex前端。3. 修改需要安装的语言包  
安装完后测试：`tex -v`  

## 2. vs code 插件
Latex workshop

## 3. 配置相关信息
以下内容2选1即可：
1. 在用户设置(settings.json)配置全局信息
2. 在工作区配置tex相关信息
### 工作区设置
在文件目录下创建`.vscode/`文件夹，然后添加`.code-workspace`文件，在其中输入工作区间的文件夹路径，和相应的vs code配置信息。  
```json
{
	"folders": [
        {
            "path": "path/to/work"
        }
    ],
    "settings": {
		"": "",
	}
}
```
### LaTeX具体配置信息
可参考如下的链接：  
[latex vscode-CSDN](https://blog.csdn.net/weixin_45477628/article/details/130511209)  
[VSCode+LaTeX](https://blog.csdn.net/FRIGIDWINTER/article/details/125826505)  
注意：SumatraPDF配置反向编译的地方千万不要使用cli.js的任何信息！！  
否则反向搜索会直接出现cli.js文件。  
```json
// 用于反向同步的外部查看器的命令行参数。%LINE%为跳转行，%TEX%为tex文件名，%PDF%为pdf文件名
"latex-workshop.view.pdf.external.synctex.args": [
	"-forward-search",
	"%TEX%",
	"%LINE%",
	"-reuse-instance",
	"-inverse-search",
	"\"D:/Software/Microsoft VS Code/Code.exe\" -r -g \"%f:%l\"",
	"%PDF%"
],
```
## 4. Sumatra PDF
官方网址：[Free PDF Reader - Sumatra PDF](https://www.sumatrapdfreader.org/free-pdf-reader)

# Latex 模板下载与使用
## IEEE论文模板
官网下载，具体如何使用待学习。
[IEEE论文LaTeX模板解析](https://blog.csdn.net/FreshManInC/article/details/135459047)  
