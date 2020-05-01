/*
 * @Author: 柒叶
 * @Date: 2020-04-29 18:05:19
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-01 17:48:21
 */

import {
  getComments,
  getCategories,
  deleteCategory,
  createCategory,
  getTags,
  deleteTag,
  createTag,
} from '@/services/admin'

export default {
  namespace: 'admin',
  state: {
    comments: [],
    categories: [],
    tags: [],
  },
  effects: {
    *comments({ payload }, { call, put }) {
      const response = yield call(getComments, payload)
      yield put({
        type: 'commentHandle',
        payload: response,
      })
    },
    *categories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload)
      yield put({
        type: 'categoriesHandle',
        payload: response,
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
      const response = yield call(getTags, payload)
      yield put({
        type: 'getTagsHandle',
        payload: response,
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
  },
  reducers: {
    commentHandle(state, { payload }) {
      return {
        ...state,
        comments: payload.status === 200 ? payload.data : [],
      }
    },
    categoriesHandle(state, { payload }) {
      return {
        ...state,
        categories: payload.status === 200 ? payload.data : [],
      }
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
    getTagsHandle(state, { payload }) {
      return {
        ...state,
        tags: payload.status === 200 ? payload.data : [],
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
  },
}
