/*
 * @Author: 柒叶
 * @Date: 2020-05-06 20:18:13
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-17 19:29:37
 */
import React from 'react'
import { Menu, Row, Col } from 'antd'
import { Link } from 'umi'
import Header from '@/components/Header'
import styles from './index.less'

const Account = props => {
  const {
    children,
    location: { pathname },
  } = props
  return (
    <>
      <Header />
      <Row className="mt-20">
        <Col span={18} offset={3}>
          <div className={styles.main}>
            <div className={styles.leftmenu}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['/account/me']}
                selectedKeys={[pathname]}
              >
                <Menu.Item key="/account/me">
                  <Link to="/account/me">我的信息</Link>
                </Menu.Item>
                <Menu.Item>主题设置</Menu.Item>
                <Menu.Item>代码风格</Menu.Item>
              </Menu>
            </div>
            <div className={styles.right}>{children}</div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Account
