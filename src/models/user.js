/*
 * @Author: 柒叶
 * @Date: 2020-05-06 09:25:04
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-06 13:06:33
 */
import { registerAccount, loginAccount } from '@/services/user'

export default {
  namespace: 'user',
  state: {},
  effects: {
    *register({ payload, callback }, { call, put }) {
      const response = yield call(registerAccount, payload)
      if (callback) callback(response)
    },
    *login({ payload, callback }, { call, put }) {
      const response = yield call(loginAccount, payload)
      if (callback) callback(response)
    },
  },
  reducers: {},
}
