/*
 * @Author: 柒叶
 * @Date: 2020-05-12 17:13:29
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 17:36:34
 */

import React from 'react'
import storageHelper from '@/utils/storage'
const withAuth = ElementComponent => {
  let user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    user = null
  }
  return props => <ElementComponent {...props} account={user} />
}

export default withAuth
