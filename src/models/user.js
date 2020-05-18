/*
 * @Author: 柒叶
 * @Date: 2020-05-06 09:25:04
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-17 19:31:36
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
import storageHelper from '@/utils/storage'

const avatars = [
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/003.png',
  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/004.png',
]

const initAccount = () => {
  const user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    return {}
  }
  return user
}

export default {
  namespace: 'user',
  state: {
    account: initAccount(),
    avatar: null,
  },
  effects: {
    *register({ payload }, { call, put }) {
      const { status } = yield call(registerAccount, payload)
      if (status === 200) {
        message.success('注册成功')
        history.push({ pathname: '/login', isRegister: true })
      } else {
        message.warn('注册失败，请重新注册')
      }
    },

    *login({ payload, callback }, { call, put }) {
      const response = yield call(loginAccount, payload)
      if (response.status !== 200) {
        message.error(response.message)
      } else {
        message.success('登录成功')
        if (callback) callback(response)
      }
    },

    *account({ payload, callback }, { call, put }) {
      const response = yield call(getAccount, payload)
      if (response.status === 200) {
        storageHelper.set('user', response.data)
        if (callback) callback(response)
        yield put({
          type: 'handle',
          payload: {
            account: response.data,
            avatar: response.data.avatar,
          },
        })
      }
    },

    *logout({ payload }, { call, put }) {
      yield call(logoutAccount, payload)
      yield put({
        type: 'handle',
        payload: {
          account: {},
        },
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
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    changeAvatar(state) {
      return { ...state, avatar: avatars[Math.floor(Math.random() * 4)] }
    },
  },
}
