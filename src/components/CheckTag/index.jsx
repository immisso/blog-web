/*
 * @Author: 柒叶
 * @Date: 2020-04-19 17:15:56
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 20:01:42
 */

import React from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

const CheckTag = props => {
  const { data, checkTagHandle } = props
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map(item => (
          <CheckableTag
            key={item.en_name}
            onChange={checked => checkTagHandle(item.id, checked)}
          >
            {item.name}
          </CheckableTag>
        ))}
    </>
  )
}

export default CheckTag
