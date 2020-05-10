/*
 * @Author: 柒叶
 * @Date: 2020-04-16 20:44:38
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-16 21:35:25
 */

import React from 'react'

const HeadTag = ({ level, children }) => {
  if (children.length === 0) return null
  const {
    props: { nodeKey, value },
  } = children[0]
  return React.createElement(
    `h${level}`,
    { className: 'fw-700', key: nodeKey },
    value,
  )
}

export default HeadTag
