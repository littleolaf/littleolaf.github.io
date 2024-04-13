---
title: VS Code 配置远程开发记录
published: 2024-04-13 11:00:00
description: "尝试用VS Code配置远程开发环境"
# image: "./cover.jpeg"
tags: [远程开发]
category: 实践学习
draft: false
---
两步：
1. 配置远程连接SSH
2. 配置python运行的解释器环境
# 配置远程连接SSH
流程：  
&ensp;1. 下载Remote SSH插件  
&ensp;2. 生成SSH密钥  
&ensp;3. 将公钥上传至服务器，生成 authorized_keys 文件  
&ensp;4. 在本地vs code中配置SSH的config文件  

## 生成SSH密钥
打开一个终端，输入`ssh-keygen -t rsa`是一个用于生成SSH密钥对的命令。其中`-t`选项指定密钥类型，`rsa`是一种广泛使用的密钥算法。  
指定密钥文件的名字和存储位置，可以使用`-f`选项：`ssh-keygen -t rsa -f ~/.ssh/my_key`  
生成的文件中，`.pub`是公钥，同名文件为留存本地的私钥。
## 公钥上传服务器，生成 authorized_keys 文件
将`.pub`文件上传至服务器中`.ssh/`路径下  
进入 .ssh 目录，使用命令`cat id_rsa.pub > authorized_keys`，生成 authorized_keys 文件。  
- 查看公钥有没有导入成功： `cat authorized_keys`  
	- 设置文件权限命令: `chmod 600 authorized_keys  #所有者可读写`
	- `chmod 700 ~/.ssh           #所有者可读可写可执行`
	- 查看权限是否设置成功命令：`ls -la`
	- 重启服务器ssh命令： `service ssh restart`

## 在本地vs code中配置SSH的config文件
点击 **远程资源管理器**，点击SSH的配置小齿轮，选择config文件，输入如下的配置信息并保存。
```
Host <远程主机名称> 
    HostName <远程主机IP> 
    User <用户名> 
    Port <ssh端口，默认22> 
    IdentityFile <本机SSH私钥路径> 
    ForwardAgent yes <VSCode 自己添加的，未知作用> 
```


参考文档：
[VSCode使用Remote SSH连接远程服务器_vscode连接远程服务器-CSDN博客](https://blog.csdn.net/qijitao/article/details/130584752)  
[在 Visual Studio Code中进行远程Python开发](https://juejin.cn/post/6844904158164680712)


# 配置python解释器
1. 下载python插件 并且 打开项目文件夹目录
2. ctrl+shift+p 打开命令终端，输入python，选择解释器interpreter
3. 在调试页面选择创建launch.json并配置相关信息。更多有关launch.json配置信息可参考其他攻略。

参考文档：
[使用vscode编写、运行Python程序_vscode运行python-CSDN博客](https://blog.csdn.net/Java_ZZZZZ/article/details/133028138)


# 后台自动运行程序
```bash
nohup <some_command> > output.log 2>&1 &
```


