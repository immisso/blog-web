/*
 * @Author: 柒叶
 * @Date: 2020-04-29 18:05:19
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 18:07:20
 */

import { getComments } from '@/services/admin'

export default {
  namespace: 'admin',
  state: {
    comments: [],
  },
  effects: {
    *comments({ payload }, { call, put }) {
      const response = yield call(getComments, payload)
      yield put({
        type: 'commentHandle',
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
  },
}
