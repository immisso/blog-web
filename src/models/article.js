/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 20:52:58
 */

import {
  getCategories,
  getArticles,
  getHotArticles,
  getArticleDetail,
  getComments,
  getTags,
  createNoLoginComment,
  createComment,
  updateFavorite,
  getIsFavorite,
} from '@/services/article'

export default {
  namespace: 'article',
  state: {
    categories: [],
    articles: [],
    hots: [],
    comments: [],
    tags: [],
    detail: {},
    articleCount: 0,
    isFavorite: false,
    favoriteCount: 0,
  },
  effects: {
    *categories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload)
      yield put({
        type: 'categoriesHandle',
        payload: response,
      })
    },
    *articles({ payload }, { call, put }) {
      const response = yield call(getArticles, payload)
      yield put({
        type: 'articlesHandle',
        payload: response,
      })
    },
    *hot({ payload }, { call, put }) {
      const response = yield call(getHotArticles, payload)
      yield put({
        type: 'hotHandle',
        payload: response,
      })
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload)
      yield put({
        type: 'detailHandle',
        payload: response,
      })
    },
    *comments({ payload }, { call, put }) {
      const response = yield call(getComments, payload)
      yield put({
        type: 'commentHandle',
        payload: response,
      })
    },
    *tags({ payload }, { call, put }) {
      const response = yield call(getTags, payload)
      yield put({
        type: 'tagsHandle',
        payload: response,
      })
    },
    *addNoLoginComment({ payload }, { call, put }) {
      const response = yield call(createNoLoginComment, payload)
      yield put({
        type: 'createCommentHandle',
        payload: response,
      })
    },
    *addComment({ payload }, { call, put }) {
      const response = yield call(createComment, payload)
      yield put({
        type: 'createCommentHandle',
        payload: response,
      })
    },
    *favorite({ payload, callback }, { call, put }) {
      const response = yield call(updateFavorite, payload)
      if (callback) callback(response)
    },

    *isFavorite({ payload, callback }, { call, put }) {
      const response = yield call(getIsFavorite, payload)
      yield put({
        type: 'isFavoriteHandle',
        payload: response,
      })
    },
  },
  reducers: {
    changeFavorite(state, { payload }) {
      let favoriteCount = state.favoriteCount
      if (payload.type === 'plus') {
        favoriteCount += 1
      }
      if (payload.type === 'reduce') {
        favoriteCount -= 1
      }
      return {
        ...state,
        isFavorite: !state.isFavorite,
        favoriteCount,
      }
    },
    categoriesHandle(state, { payload }) {
      return {
        ...state,
        categories: payload.status === 200 ? payload.data : [],
      }
    },
    articlesHandle(state, { payload }) {
      return {
        ...state,
        articles: payload.status === 200 ? payload.data.articles : [],
        articleCount: payload.status === 200 ? payload.data.count : 0,
      }
    },
    hotHandle(state, { payload }) {
      return {
        ...state,
        hots: payload.status === 200 ? payload.data : [],
      }
    },
    detailHandle(state, { payload }) {
      return {
        ...state,
        detail: payload.status === 200 ? payload.data : {},
        favoriteCount:
          payload.status === 200 ? payload.data.favorite : state.favoriteCount,
      }
    },
    commentHandle(state, { payload }) {
      return {
        ...state,
        comments: payload.status === 200 ? payload.data : [],
      }
    },
    tagsHandle(state, { payload }) {
      return {
        ...state,
        tags: payload.status === 200 ? payload.data : [],
      }
    },
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments:
          payload.status === 200
            ? [payload.data, ...state.comments]
            : [...state.comments],
      }
    },
    isFavoriteHandle(state, { payload }) {
      return {
        ...state,
        isFavorite: payload.status === 200 ? payload.data : false,
      }
    },
  },
}
