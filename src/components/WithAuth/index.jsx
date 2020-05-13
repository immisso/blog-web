/*
 * @Author: 柒叶
 * @Date: 2020-05-12 17:13:29
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 20:13:52
 */

import React from 'react'
import storageHelper from '@/utils/storage'

// const WithAuth = WrappedComponent => {
//   let user = storageHelper.get('user')
//   console.log('localStorage11111111111111111111')
//   if (!user || user.exp * 1000 < new Date().getTime()) {
//     user = {}
//   }

//   return props => <WrappedComponent {...props} account={user} />
// }

// export default WithAuth

function WithAuth(WrappedComponent) {
  const user = storageHelper.get('user')
  console.log('localStorage11111111111111111111')
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} account={user} />
    }
  }
}

export default WithAuth
