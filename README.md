# 个人博客网站
> 如果这个项目对你有用，麻烦动动手指点star，谢谢！

接下来我将对该项目进行大致的使用说明，后续也会写一份更为详细的免费的《Node全栈开发——带你从零开发前后端分离的个人网站》教程，带你从零开发到部署上线的全过程，敬请期待。您现在看的这个项目只是网站的前端项目，服务端项目地址请点击[博客网站服务端](https://github.com/immisso/blog-server)

该项目采用`React+antd+umi+dva`技术栈进行实现，线上地址[https://www.immisso.com](https://www.immisso.com)（最新暂时还没有部署上去，这是以前的网站，最新的将于近期部署上去）

>**注意：** 接下来的说明都只针对该前端项目的说明。因为是前后端分离。所以启动是需要前后端一起启动的。服务端项目请移步[博客网站服务端](https://github.com/immisso/blog-server)

## 运行效果
下面是一些主要功能的效果图。请君参考。

首页详情页
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E9%A6%96%E9%A1%B5%E8%AF%A6%E6%83%85%E9%A1%B5001.gif)

写文章
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E7%BC%96%E8%BE%91%E5%99%A8%E9%A1%B5%E9%9D%A2002.gif)

管理页
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E7%AE%A1%E7%90%86%E9%A1%B5003.gif)

## 如何开始

#### clone项目到本地

```git
$ git clone https://github.com/immisso/blog-web
```

#### 安装依赖

```bash
$ npm install
```
或者
```bash
$ yarn
```
#### 启动项目

```bash
$ npm run start
```
或
```bash
$ yarn start
```
启动成功后，然后再浏览器上打开[http://localhost:8888](http://localhost:8888)即可！
虽然此时可以我们可以成功启动，但是还不能上传文件到阿里云，因为我们还需要一些配置。在`src/`目录下创建`config`文件夹，然后创建一个`secret.js`文件。改文件内容如下:

```javascript
module.exports = {
  accessKeyId: '', // 阿里云Keyid
  accessKeySecret: '', // 阿里云Key secret
  bucket: '', // Oss bucket 名字
  ENCRYPT_KEY: '' // localStorage加密Key
}
```
这样配置好，就可以成功上传文件了！

> 当然你要和服务端同时启用。

## 功能介绍
这个项目虽然不大，但是功能还算齐全。大体来说分为主网站和管理系统两部分。目前已经实现主要功能如下：

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

## 特别说明
该项目会长期更新。会逐步完善其他许多功能。如果写教程功能、邮件提醒、用户管理、主题风格、代码风格等。欢迎长期关注，请您star、star、star！谢谢


