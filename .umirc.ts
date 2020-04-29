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
      component: '@/pages/Home',
      exact: true,
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
  ],
})
