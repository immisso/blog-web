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
      path: '/article/:id',
      component: '@/pages/Article',
    },
    {
      path: '/',
      component: '@/pages/Home',
      routes: [
        {
          path: '/',
          component: '@/components/HomeArticleList',
        },
      ],
    },
  ],
});
