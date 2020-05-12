/*
 * @Author: 柒叶
 * @Date: 2020-05-06 09:25:04
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 15:00:16
 */
import { message } from 'antd'
import { history } from 'umi'
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
    *register({ payload }, { call, put }) {
      const { status } = yield call(registerAccount, payload)
      if (status === 200) {
        message.success('注册成功')
        history.push({ path: '/login', isRegister: true })
      } else {
        message.warn('注册失败，请重新注册')
      }
    },

    *login({ payload, callback }, { call, put }) {
      const response = yield call(loginAccount, payload)
      if (callback) callback(response)
    },

    *account({ payload, callback }, { call, put }) {
      const response = yield call(getAccount, payload)
      if (callback) callback(response)
      if (response.status === 200) {
        yield put({
          type: 'handle',
          payload: {
            account: response.data,
          },
        })
      }
    },

    *logout({ payload }, { call, put }) {
      yield call(logoutAccount, payload)
      yield put({
        type: 'updateAccount',
        payload: {},
      })
    },

    *setAccount({ payload, callback }, { call, put }) {
      const { status, data } = yield call(modifyAccount, payload)
      if (status === 200) {
        yield put({
          type: 'handle',
          payload: {
            account: data,
          },
        })
        message.success('更新成功')
      }
    },
  },
  reducers: {
    updateAccount(state, { payload }) {
      return {
        account: payload,
      }
    },
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
