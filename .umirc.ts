import { defineConfig } from 'umi';

export default defineConfig({
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
      routes: [
        {
          path: '/',
          component: '@/components/HomeArticleList',
        },
      ],
    },
    {
      path: '/article/:id',
      component: '@/pages/Article',
    },
  ],
});
