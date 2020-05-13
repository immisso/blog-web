/*
 * @Author: 柒叶
 * @Date: 2020-05-12 17:13:29
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 12:50:41
 */

import React from 'react'
import storageHelper from '@/utils/storage'

const withAuth = WrappedComponent => {
  let user = storageHelper.get('user')
  if (!user || user.exp * 1000 < new Date().getTime()) {
    user = {}
  }

  return props => <WrappedComponent {...props} account={user} />
}

export default withAuth
