/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-13 07:47:56
 */

import {
  getCategories,
  getArticles,
  getHotArticles,
  getArticleDetail,
  getComments,
  getTags,
  createNoLoginComment,
} from '@/services/article';

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    hots: [],
    comments: [],
    tags: [],
    detail: {},
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
    *detail({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload);
      yield put({
        type: 'detailHandle',
        payload: response,
      });
    },
    *comments({ payload }, { call, put }) {
      const response = yield call(getComments, payload);
      yield put({
        type: 'commentHandle',
        payload: response,
      });
    },
    *tags({ payload }, { call, put }) {
      const response = yield call(getTags, payload);
      yield put({
        type: 'tagsHandle',
        payload: response,
      });
    },
    *addNoLoginComment({ payload }, { call, put }) {
      const response = yield call(createNoLoginComment, payload);
      yield put({
        type: 'createNoLoginCommentHandle',
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
    detailHandle(state, { payload }) {
      return {
        ...state,
        detail: payload.status === 200 ? payload.data : {},
      };
    },
    commentHandle(state, { payload }) {
      return {
        ...state,
        comments: payload.status === 200 ? payload.data : [],
      };
    },
    tagsHandle(state, { payload }) {
      return {
        ...state,
        tags: payload.status === 200 ? payload.data : [],
      };
    },
    createNoLoginCommentHandle(state, { payload }) {
      return {
        ...state,
        comments:
          payload.status === 200
            ? [payload.data, ...state.comments]
            : [...state.comments],
      };
    },
  },
};
