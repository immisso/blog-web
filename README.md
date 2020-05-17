# 个人博客网站
> 如果这个项目对你有用，麻烦动动手指点star，谢谢！

接下来我将对该项目进行大致的使用说明，后续也会写一份更为详细的免费的《Node全栈应用——从零开发前后端分离的个人网站》教程，带你走进从零开始开发的全过程。您现在看的这个项目只是个人网站的前端项目，服务端项目地址请点击[个人博客网站API]()

该项目采用`React+antd+umi+dva`技术栈进行实现，线上地址[https://www.immisso.com](https://www.immisso.com)（暂时还没有部署上去，这是以前的网站）

>**注意：** 接下来的说明都只针对该前端项目的说明。因为是前后端分离。所以启动是需要前后端一起启动的。服务端项目请移步[个人博客网站API]()

## 运行效果
下面是一些主要功能的效果图。请君参考。

![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589705083563-2.gif)

![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589707610125-2.gif)

![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589709593652-2.gif)

## 如何开始

+ clone项目到本地

```git
$ git clone https://github.com/immisso/blog-web
```

+ 安装包

```bash
$ npm install
```
或者
```bash
$ yarn
```
+ 启动项目

```bash
$ npm run start
```
或
```bash
$ yarn start
```
启动成功后，然后再浏览器上打开[http://localhost:8888](http://localhost:8888)即可！

> 当然你要和服务端同时启用。

## 功能介绍
这个项目虽然不大，但是功能还算齐全。大体来说分为主网站和管理系统两部分。目前已实现主要功能如下：

### 主网站
+ 登录
+ 注册
+ 文章列表
+ 点赞
+ 评论
+ markdown写文章
+ 阿里云上传图片
+ 保存草稿
+ 发表文章
+ 个人信息更新

### 管理系统
+ 分类管理（分类列表、添加、删除）
+ 标签管理（标签列表、添加、删除）
+ 文章管理（文章列表、删除）
+ 评论管理（评论列表、删除）

## 技术栈

该网站采用前后端分离技术，前端采用`React`开发，服务端采用`Node`开发。主要功能模块包括
+ `react`
+ `antd`
+ `umi`
+ `dva`
+ `react-markdown`
+ `highlight.js`




