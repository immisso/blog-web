/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 11:15:40
 */

import { getDraft, createDraft, updateDraft } from '@/services/write'

export default {
  namespace: 'write',
  state: {
    markdown: null,
    title: null,
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
    *updateDraft({ payload }, { call, put }) {
      const response = yield call(updateDraft, payload)
      yield put({
        type: 'updateDraftHandle',
        payload: response,
      })
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
    updateDraftHandle(state, { payload }) {
      return {
        ...state,
        markdown:
          payload.status === 200 ? payload.data.markdown : state.markdown,
        title: payload.status === 200 ? payload.data.title : state.title,
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
