/*
 * @Author: 柒叶
 * @Date: 2020-05-06 09:25:04
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-09 12:44:39
 */
import {
  registerAccount,
  loginAccount,
  getAccount,
  logoutAccount,
  modifyAccount,
} from '@/services/user'

export default {
  namespace: 'user',
  state: {
    account: {},
  },
  effects: {
    *register({ payload, callback }, { call, put }) {
      const response = yield call(registerAccount, payload)
      if (callback) callback(response)
    },
    *login({ payload, callback }, { call, put }) {
      const response = yield call(loginAccount, payload)
      if (callback) callback(response)
    },

    *account({ payload, callback }, { call, put }) {
      const response = yield call(getAccount, payload)
      if (callback) callback(response)
      yield put({
        type: 'accountHandle',
        payload: response,
      })
    },

    *logout({ payload }, { call, put }) {
      yield call(logoutAccount, payload)
      yield put({
        type: 'updateAccount',
        payload: {},
      })
    },

    *setAccount({ payload, callback }, { call, put }) {
      const response = yield call(modifyAccount, payload)
      if (callback) callback(response)
      yield put({
        type: 'accountHandle',
        payload: response,
      })
    },
  },
  reducers: {
    updateAccount(state, { payload }) {
      return {
        account: payload,
      }
    },
    accountHandle(state, { payload }) {
      return {
        account: payload.status === 200 ? payload.data : {},
      }
    },
  },
}
