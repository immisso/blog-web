/*
 * @Author: 柒叶
 * @Date: 2020-05-12 16:05:52
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 16:33:39
 */

import React from 'react'
import { Button, Space } from 'antd'
import { Link } from 'umi'

const NoPage = props => {
  return (
    <div>
      <h3 className="tc">404</h3>
      <div className="tc">很抱歉，该页面不存在！(*￣︶￣)</div>
      <div className="tc">
        <Space>
          点击
          <Button type="primary" size="small">
            <Link to="/">回到首页</Link>
          </Button>
          <span>送你回去</span>
        </Space>
      </div>
    </div>
  )
}

export default NoPage
