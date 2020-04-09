/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-09 07:46:54
 */

import { getCategories, getArticles, getHotArticles } from '@/services/article';

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    hots: [],
  },
  effects: {
    *categories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload);
      yield put({
        type: 'categoriesHandle',
        payload: response,
      });
    },
    *articles({ payload }, { call, put }) {
      const response = yield call(getArticles, payload);
      yield put({
        type: 'articlesHandle',
        payload: response,
      });
    },
    *hot({ payload }, { call, put }) {
      const response = yield call(getHotArticles, payload);
      yield put({
        type: 'hotHandle',
        payload: response,
      });
    },
  },
  reducers: {
    categoriesHandle(state, { payload }) {
      return {
        ...state,
        categories: payload.status === 200 ? payload.data : [],
      };
    },
    articlesHandle(state, { payload }) {
      return {
        ...state,
        articles: payload.status === 200 ? payload.data : [],
      };
    },
    hotHandle(state, { payload }) {
      return {
        ...state,
        hots: payload.status === 200 ? payload.data : [],
      };
    },
  },
};
