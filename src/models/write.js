/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 07:28:44
 */
import { message } from 'antd'
import { history } from 'umi'
import {
  getDraft,
  createDraft,
  updateDraft,
  getDrafts,
  getCategories,
  createPublish,
  deleteDraft,
} from '@/services/write'

export default {
  namespace: 'write',
  state: {
    drafts: [],
    categories: [],
    tags: [],
    markdown: '',
    title: null,
    selectedCategory: null,
    selectedTag: null,
  },
  effects: {
    *saveDraft({ payload, callback }, { call, put }) {
      const { status, data } = yield call(createDraft, payload)
      if (status === 200) {
        history.push(`/write/draft/${data.id}`)
        message.success('保存草稿成功')
      }
    },

    *draft({ payload }, { call, put }) {
      const { status, data } = yield call(getDraft, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            markdown: data.markdown,
            title: data.title,
          },
        })
      }
    },

    *drafts({ payload }, { call, put }) {
      const { status, data } = yield call(getDrafts, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            drafts: data,
          },
        })
      }
    },

    *categories({ payload }, { call, put }) {
      const { status, data } = yield call(getCategories, payload)
      if (status === 200) {
        yield put({
          type: 'categoriesHandle',
          payload: {
            categories: data,
            selectedCategory: data.length > 0 && data[0].id,
            tags: data.length > 0 && data[0].tags,
            selectedTag:
              data.length > 0 && data[0].tags.length > 0 && data[0].tags[0].id,
          },
        })
      }
    },

    *updateDraft({ payload }, { call, put }) {
      const { status } = yield call(updateDraft, payload)
      if (status === 200) {
        message.success('保存草稿成功')
      }
    },

    *deleteDraft({ payload }, { call, put }) {
      const { status, data } = yield call(deleteDraft, payload)
      if (status === 200) {
        yield put({
          type: 'deleteDraftHandle',
          payload: data,
        })
      }
    },

    *publish({ payload, callback }, { call, put }) {
      const { status } = yield call(createPublish, payload)
      if (status === 200) {
        message.success('发布文章成功')
        yield put({
          type: 'setMarkdown',
          payload: { markdown: '' },
        })
        history.push('/')
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },

    categoriesHandle(state, { payload }) {
      return {
        ...state,
        ...payload,
        selectedCategory: state.selectedCategory || payload.selectedCategory,
        selectedTag: state.selectedTag || payload.selectedTag,
      }
    },
    deleteDraftHandle(state, { payload }) {
      return {
        ...state,
        drafts: [...state.drafts].filter(item => item.id !== payload.id),
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
