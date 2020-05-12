/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 11:08:19
 */
import { history } from 'umi'
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

const rv = (s, d, f = []) => {
  return s === 200 ? d : f
}

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
      const { status, data } = yield call(getCategories, payload)
      yield put({
        type: 'handle',
        payload: {
          categories: rv(status, data, []),
        },
      })
    },
    *articles({ payload }, { call, put }) {
      const { status, data } = yield call(getArticles, payload)
      yield put({
        type: 'handle',
        payload: {
          articles: rv(status, data.articles, []),
          articleCount: rv(status, data.count, 0),
        },
      })
    },
    *hot({ payload }, { call, put }) {
      const { status, data } = yield call(getHotArticles, payload)
      yield put({
        type: 'handle',
        payload: {
          hots: rv(status, data, []),
        },
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
      const { status, data } = yield call(getComments, payload)
      yield put({
        type: 'handle',
        payload: {
          comments: rv(status, data),
        },
      })
    },
    *tags({ payload }, { call, put }) {
      const { status, data } = yield call(getTags, payload)
      yield put({
        type: 'handle',
        payload: {
          tags: rv(status, data),
        },
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
    *favorite({ payload }, { call, put }) {
      const { status } = yield call(updateFavorite, payload)
      if (status === 200) {
        yield put({ type: 'changeFavorite' })
      } else {
        history.push('/login')
      }
    },

    *isFavorite({ payload, callback }, { call, put }) {
      const { status, data } = yield call(getIsFavorite, payload)
      yield put({
        type: 'handle',
        payload: {
          isFavorite: rv(status, data, false),
        },
      })
    },
  },
  reducers: {
    changeFavorite(state) {
      const type = state.isFavorite ? 'reduce' : 'plus'
      let favoriteCount = state.favoriteCount
      if (type === 'plus') {
        favoriteCount += 1
      }
      if (type === 'reduce') {
        favoriteCount -= 1
      }
      return {
        ...state,
        isFavorite: !state.isFavorite,
        favoriteCount,
      }
    },
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    detailHandle(state, { payload }) {
      return {
        ...state,
        detail: rv(payload.status, payload.data, {}),
        favoriteCount: rv(
          payload.status,
          payload.data.favorite,
          state.favoriteCount,
        ),
      }
    },
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: rv(
          payload.status,
          [payload.data, ...state.comments],
          [...state.comments],
        ),
      }
    },
  },
}
