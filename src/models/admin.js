/*
 * @Author: 柒叶
 * @Date: 2020-04-29 18:05:19
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 14:53:44
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
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            comments: data,
          },
        })
      }
    },

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

    *deleteCategory({ payload }, { call, put }) {
      const { status, data } = yield call(deleteCategory, payload)
      if (status === 200) {
        yield put({
          type: 'deleteCategoryHandle',
          payload: data,
        })
      }
    },

    *createCategory({ payload }, { call, put }) {
      const { status, data } = yield call(createCategory, payload)
      if (status === 200) {
        yield put({
          type: 'createCategoryHandle',
          payload: data,
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

    *deleteTag({ payload }, { call, put }) {
      const { status, data } = yield call(deleteTag, payload)
      if (status === 200) {
        yield put({
          type: 'deleteTagHandle',
          payload: data,
        })
      }
    },
    *createTag({ payload }, { call, put }) {
      const { status, data } = yield call(createTag, payload)
      if (status === 200) {
        yield put({
          type: 'createTagHandle',
          payload: data,
        })
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      const { status, data } = yield call(deleteArticle, payload)
      if (status === 200) {
        yield put({
          type: 'deleteArticleHandle',
          payload: data,
        })
      }
    },
    *deleteComment({ payload }, { call, put }) {
      const { status, data } = yield call(deleteComment, payload)
      if (status === 200) {
        yield put({
          type: 'deleteCommentHandle',
          payload: data,
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
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    createCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories: [...state.categories, payload],
      }
    },
    createTagHandle(state, { payload }) {
      return {
        ...state,
        tags: [...state.tags, payload],
      }
    },
    deleteCategoryHandle(state, { payload }) {
      return {
        ...state,
        categories: [...state.categories].filter(
          item => item.id !== payload.id,
        ),
      }
    },
    deleteTagHandle(state, { payload }) {
      return {
        ...state,
        tags: [...state.tags].filter(item => item.id !== payload.id),
      }
    },
    deleteArticleHandle(state, { payload }) {
      return {
        ...state,
        articles: [...state.articles].filter(item => item.id !== payload.id),
      }
    },
    deleteCommentHandle(state, { payload }) {
      return {
        ...state,
        comments: [...state.comments].filter(item => item.id !== payload.id),
      }
    },
  },
}
