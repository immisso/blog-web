/*
 * @Author: 柒叶
 * @Date: 2020-05-08 13:06:19
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-08 13:09:52
 */

import CryptoJS from 'crypto-js'
import { ENCRYPT_KEY } from '../config/secret'

const encrypt = dataToStorage => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY)
}

const decrypt = dataFromStorage => {
  const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const storageHelper = {
  get: key => {
    try {
      const formatted = decrypt(localStorage.getItem(key))
      return formatted
    } catch (e) {
      return undefined
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, encrypt(value))
  },
  clear: key => {
    localStorage.removeItem(key)
  },
}

export default storageHelper
