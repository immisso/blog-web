/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 14:58:18
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
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            categories: data,
          },
        })
      }
    },

    *articles({ payload }, { call, put }) {
      const { status, data } = yield call(getArticles, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            articles: data.articles,
            articleCount: data.count,
          },
        })
      }
    },

    *hot({ payload }, { call, put }) {
      const { status, data } = yield call(getHotArticles, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            hots: data,
          },
        })
      }
    },

    *detail({ payload }, { call, put }) {
      const { status, data } = yield call(getArticleDetail, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            detail: data,
            favoriteCount: data.favorite,
          },
        })
      }
    },

    *comments({ payload }, { call, put }) {
      const { status, data } = yield call(getComments, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            comments: data,
          },
        })
      }
    },

    *tags({ payload }, { call, put }) {
      const { status, data } = yield call(getTags, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        })
      }
    },

    *addNoLoginComment({ payload }, { call, put }) {
      const { status, data } = yield call(createNoLoginComment, payload)
      if (status === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
    },

    *addComment({ payload }, { call, put }) {
      const { status, data } = yield call(createComment, payload)
      if (status === 200) {
        yield put({
          type: 'createCommentHandle',
          payload: data,
        })
      }
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
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            isFavorite: data,
          },
        })
      }
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
    createCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      }
    },
  },
}
