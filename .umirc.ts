import { defineConfig } from 'umi'

export default defineConfig({
  scripts: [
    // {
    //   content:`MathJax = {
    //     tex: {
    //       inlineMath: [['$', '$'], ['\\(', '\\)']]
    //     },
    //     svg: {
    //       fontCache: 'global'
    //     }
    //   };`
    // },
    // {
    //   src:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML",
    //   // type:'text/javascript',
    //   async:true
    // },
    // {
    //   src:'https://mathjax.rstudio.com/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML',
    //   // id:'MathJax-script',
    //   async:true,
    //   // charset:'utf-8',
    // }
  ],
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
