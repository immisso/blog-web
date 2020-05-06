/*
 * @Author: 柒叶
 * @Date: 2020-05-06 20:18:13
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-06 20:56:01
 */
import React from 'react'
import { Button, Menu, Row, Col } from 'antd'
import Header from '@/components/Header'
import styles from './index.less'

const Account = props => {
  const { children } = props
  return (
    <>
      <Header />
      <Row className="mt-20">
        <Col span={18} offset={3}>
          <div className={styles.main}>
            <div className={styles.leftmenu}>
              <Menu mode="inline">
                <Menu.Item>我的信息</Menu.Item>
                <Menu.Item>主题设置</Menu.Item>
                <Menu.Item>代码风格</Menu.Item>
              </Menu>
            </div>
            <div className={styles.right}>
              {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
              {children}
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Account
