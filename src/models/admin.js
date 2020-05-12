/*
 * @Author: 柒叶
 * @Date: 2020-04-29 18:05:19
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 09:41:04
 */

import {
  getComments,
  getCategories,
  deleteCategory,
  createCategory,
  getTags,
  deleteTag,
  createTag,
  deleteArticle,
  deleteComment,
  getArticles,
} from '@/services/admin'

const rv = (s, d, f = []) => {
  return s === 200 ? d : f
}

export default {
  namespace: 'admin',
  state: {
    comments: [],
    categories: [],
    tags: [],
    articles: [],
    articleCount: 0,
  },
  effects: {
    *comments({ payload }, { call, put }) {
      const { status, data } = yield call(getComments, payload)
      yield put({
        type: 'handle',
        payload: {
          comments: rv(status, data),
        },
      })
    },
    *categories({ payload }, { call, put }) {
      const { status, data } = yield call(getCategories, payload)
      yield put({
        type: 'handle',
        payload: {
          categories: rv(status, data),
        },
      })
    },
    *deleteCategory({ payload }, { call, put }) {
      const response = yield call(deleteCategory, payload)
      yield put({
        type: 'deleteCategoryHandle',
        payload: response,
      })
    },
    *createCategory({ payload }, { call, put }) {
      const response = yield call(createCategory, payload)
      yield put({
        type: 'createCategoryHandle',
        payload: response,
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
    *deleteTag({ payload }, { call, put }) {
      const response = yield call(deleteTag, payload)
      yield put({
        type: 'deleteTagHandle',
        payload: response,
      })
    },
    *createTag({ payload }, { call, put }) {
      const response = yield call(createTag, payload)
      yield put({
        type: 'createTagHandle',
        payload: response,
      })
    },
    *deleteArticle({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload)
      yield put({
        type: 'deleteArticleHandle',
        payload: response,
      })
    },
    *deleteComment({ payload }, { call, put }) {
      const response = yield call(deleteComment, payload)
      yield put({
        type: 'deleteCommentHandle',
        payload: response,
      })
    },
    *articles({ payload }, { call, put }) {
      const { status, data } = yield call(getArticles, payload)
      yield put({
        type: 'handle',
        payload: {
          articles: rv(status, data.articles),
          articleCount: rv(status, data.count, 0),
        },
      })
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    deleteCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories:
          payload.status === 200
            ? [...state.categories].filter(item => item.id !== payload.data.id)
            : [...state.categories],
      }
    },
    createCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories:
          payload.status === 200
            ? [...state.categories, payload.data]
            : [...state.categories],
      }
    },
    deleteTagHandle(state, { payload }) {
      return {
        ...state,
        tags:
          payload.status === 200
            ? [...state.tags].filter(item => item.id !== payload.data.id)
            : [...state.tags],
      }
    },
    createTagHandle(state, { payload }) {
      return {
        ...state,
        tags:
          payload.status === 200
            ? [...state.tags, payload.data]
            : [...state.tags],
      }
    },
    deleteArticleHandle(state, { payload }) {
      return {
        ...state,
        articles:
          payload.status === 200
            ? [...state.articles].filter(item => item.id !== payload.data.id)
            : [...state.articles],
      }
    },
    deleteCommentHandle(state, { payload }) {
      return {
        ...state,
        comments:
          payload.status === 200
            ? [...state.comments].filter(item => item.id !== payload.data.id)
            : [...state.comments],
      }
    },
  },
}
