/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-21 12:46:54
 */

import {
  getDraft,
  createDraft,
  updateDraft,
  getDrafts,
  getCategories,
  createPublish,
} from '@/services/write'

export default {
  namespace: 'write',
  state: {
    drafts: [],
    categories: [],
    tags: [],
    markdown: null,
    title: null,
    selectedCategory: null,
    selectedTag: null,
  },
  effects: {
    *saveDraft({ payload, callback }, { call, put }) {
      const response = yield call(createDraft, payload)
      if (callback) callback(response)
      // yield put({
      //   type: 'createDraftHandle',
      //   payload: response
      // })
    },
    *draft({ payload }, { call, put }) {
      const response = yield call(getDraft, payload)
      yield put({
        type: 'draftHandle',
        payload: response,
      })
    },
    *drafts({ payload }, { call, put }) {
      const response = yield call(getDrafts, payload)
      yield put({
        type: 'draftsHandle',
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
    *updateDraft({ payload }, { call, put }) {
      const response = yield call(updateDraft, payload)
      yield put({
        type: 'updateDraftHandle',
        payload: response,
      })
    },

    *publish({ payload, callback }, { call, put }) {
      const response = yield call(createPublish, payload)
      if (callback) callback(response)
    },
  },
  reducers: {
    // createDraftHandle (state, { payload }) {
    //   return {
    //     ...state
    //   }
    // }
    draftHandle(state, { payload }) {
      return {
        ...state,
        markdown:
          payload.status === 200 ? payload.data.markdown : state.markdown,
        title: payload.status === 200 ? payload.data.title : state.title,
      }
    },
    draftsHandle(state, { payload }) {
      return {
        ...state,
        drafts: payload.status === 200 ? payload.data : [],
      }
    },
    updateDraftHandle(state, { payload }) {
      return {
        ...state,
        // markdown:
        //   payload.status === 200 ? payload.data.markdown : state.markdown,
        // title: payload.status === 200 ? payload.data.title : state.title,
      }
    },

    categoriesHandle(state, { payload }) {
      return {
        ...state,
        categories: payload.status === 200 ? payload.data : [],
        selectedCategory:
          payload.status === 200 &&
          payload.data.length > 0 &&
          !state.selectedCategory
            ? payload.data[0].id
            : state.selectedCategory,
        tags:
          payload.status === 200 && payload.data.length > 0
            ? payload.data[0].tags
            : [],
        selectedTag:
          payload.status === 200 &&
          payload.data.length > 0 &&
          payload.data[0].tags.length > 0 &&
          !state.selectedTag
            ? payload.data[0].tags[0].id
            : state.selectedTag,
      }
    },

    setSelecteCategory(state, { payload }) {
      return { ...state, selectedCategory: payload.selectedCategory }
    },
    setSelecteTag(state, { payload }) {
      return { ...state, selectedTag: payload.selectedTag }
    },
    setTags(state, { payload }) {
      return {
        ...state,
        tags: payload.tags,
        selectedTag: payload.tags.length > 0 ? payload.tags[0].id : null,
      }
    },
    setMarkdown(state, { payload }) {
      return { ...state, markdown: payload.markdown }
    },
    setTitle(state, { payload }) {
      return { ...state, title: payload.title }
    },
  },
}
