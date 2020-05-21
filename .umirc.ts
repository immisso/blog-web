import { defineConfig } from 'umi'

export default defineConfig({
  title: '这是个人网站首页',
  favicon:
    'https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589714215963-2.png',
  proxy: {
    '/api': {
      target: 'http://localhost:7001/api',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: '@/pages/Home',
      // exact: true,
      routes: [
        {
          path: '/home',
          component: '@/components/HomeArticleList',
          // exact: true,
        },
        {
          path: '/home/:category',
          exact: true,
          component: '@/components/HomeArticleList',
        },
        {
          path: '/home/:category/:tag',
          exact: true,
          component: '@/components/HomeArticleList',
        },
      ],
    },
    {
      path: '/article/:id',
      component: '@/pages/Article',
    },
    {
      path: '/write/drafts',
      component: '@/pages/Draft',
    },
    {
      path: '/write/draft/:key',
      component: '@/pages/Write',
    },
    {
      path: '/admin',
      component: '@/pages/Admin',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/categories',
        },
        {
          path: '/admin/categories',
          component: '@/components/Admin/Category',
        },
        {
          path: '/admin/tags',
          component: '@/components/Admin/Tag',
        },
        {
          path: '/admin/articles',
          component: '@/components/Admin/Article',
        },
        {
          path: '/admin/comments',
          component: '@/components/Admin/Comment',
        },
      ],
    },
    {
      path: '/login',
      component: '@/pages/Login',
    },
    {
      path: '/register',
      component: '@/pages/Register',
    },
    {
      path: '/account',
      component: '@/pages/Account',
      routes: [
        {
          path: '/account',
          redirect: '/account/me',
        },
        {
          path: '/account/me',
          component: '@/components/Account/Me',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
})
