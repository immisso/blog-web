/*
 * @Author: 柒叶
 * @Date: 2020-04-05 12:05:06
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 07:21:24
 */

import React, { useState, useEffect } from 'react'
import { Layout, Menu, Drawer, Button, Dropdown } from 'antd'
import { connect } from 'dva'
import Icon, { MenuOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import UserAvatar from '@/components/UserAvatar'
import storageHelper from '@/utils/storage'

import styles from './index.less'

const { Header } = Layout
const { SubMenu } = Menu

const tabs = [
  {
    title: '首页',
    key: 'home',
    icon: 'home',
    path: '/',
  },
  // {
  //   title: '文章',
  //   key: 'articles',
  //   key2: 'all',
  //   icon: 'file-done',
  //   path: '/home/articles/all'
  // },
  // {
  //   title: '教程',
  //   key: 'course',
  //   key2: 'all',
  //   icon: 'project',
  //   path: '/home/course/all'
  // }
]

// const categories = null

const MainHeader = props => {
  const { dispatch, categories, account, pathname } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/categories' })
    }
  }, [])

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const logout = () => {
    storageHelper.clear('user')
    if (dispatch) {
      dispatch({ type: 'user/logout' })
    }
  }
  const handleClick = () => {}
  return (
    <Header>
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderLeft}>
          <div className={styles.homeHeaderPc}>
            <Link to="/" className={styles.brand} style={{ height: 64 }}>
              {/* <svg
                className="icon"
                width="48px"
                height="20.76px"
                viewBox="0 0 2368 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#007bff"
                  d="M809.325319 891.7236a3496.102927 3496.102927 0 0 0 785.32915-185.623254c220.526772-81.705962 426.774831-189.589563 607.241884-342.490768a1398.917128 1398.917128 0 0 0 165.196763-165.593394 171.146226 171.146226 0 0 0-59.494633-32.523732A2277.057905 2277.057905 0 0 0 1742.201158 16.954185a1800.307583 1800.307583 0 0 0-663.166838 31.928787C713.142329 138.124921 420.825368 341.001618 184.433361 629.947217c-3.173047 3.966309-7.932618 7.734302-2.578101 13.48545C606.646937 319.980181 1163.120067 253.941139 1478.044989 291.621073c-4.759571 10.312403-14.675343 8.725879-23.202906 9.519141a2181.469862 2181.469862 0 0 0-272.683733 46.207498c-274.071941 61.081156-535.451693 156.669199-773.430224 306.992304A1488.952339 1488.952339 0 0 0 0.396631 1024c126.921883-68.022197 263.759538-92.811627 403.571924-100.149298 135.449447-7.535987 270.700578-15.270289 405.356764-32.127102z"
                />
              </svg> */}
              <svg
                t="1589520726197"
                className="icon"
                viewBox="0 0 1027 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11810"
                width="64"
                height="64"
              >
                <path
                  d="M996.266667 622.933333c-10.666667 2.133333-19.2 4.266667-29.866667 4.266667-68.266667 0-121.6-53.333333-121.6-117.333333 0-64 55.466667-117.333333 121.6-117.333333 6.4 0 8.533333 0 17.066667 2.133333l27.733333-49.066667c-14.933333-4.266667-27.733333-6.4-44.8-6.4-64 0-119.466667 32-149.333333 81.066667-32-49.066667-87.466667-81.066667-149.333333-81.066667-17.066667 0-32 2.133333-44.8 6.4l27.733333 49.066667c6.4 0 10.666667-2.133333 17.066667-2.133333 68.266667 0 121.6 53.333333 121.6 117.333333 0 64-55.466667 117.333333-121.6 117.333333-10.666667 0-21.333333-2.133333-29.866667-4.266667-6.4-2.133333-29.866667 46.933333-29.866667 46.933333 19.2 6.4 38.4 10.666667 59.733333 10.666667 64 0 119.466667-32 149.333333-81.066667 32 49.066667 87.466667 81.066667 149.333333 81.066667 21.333333 0 40.533333-4.266667 59.733333-10.666667C1026.133333 669.866667 1002.666667 622.933333 996.266667 622.933333zM452.266667 341.333333c-29.866667 0-57.6 6.4-83.2 17.066667l23.466667 51.2c17.066667-8.533333 36.266667-12.8 57.6-12.8 72.533333 0 130.133333 55.466667 130.133333 123.733333 0 68.266667-57.6 123.733333-130.133333 123.733333-72.533333 0-130.133333-55.466667-130.133333-123.733333l0-51.2c0-85.333333-72.533333-153.6-160-153.6-85.333333 0-153.6 61.866667-160 140.8l0 0L0 682.666667l59.733333 0 0-209.066667c0-53.333333 44.8-96 100.266667-96 55.466667 0 100.266667 42.666667 100.266667 96l0 51.2c0 100.266667 85.333333 181.333333 189.866667 181.333333 104.533333 0 189.866667-81.066667 189.866667-181.333333C642.133333 422.4 556.8 341.333333 452.266667 341.333333z"
                  p-id="11811"
                  fill="#007bff"
                ></path>
              </svg>
            </Link>
            <Menu
              mode="horizontal"
              style={{ height: '64px', borderBottom: 'none' }}
              defaultSelectedKeys={['/home']}
              selectedKeys={[pathname]}
            >
              {tabs &&
                tabs.map(item => (
                  <Menu.Item key="/home">
                    <Link
                      to={{
                        pathname: item.path,
                        state: { category: item.key, tag: item.key2 },
                      }}
                    >
                      {item.title}
                    </Link>
                  </Menu.Item>
                ))}
              {categories.length > 0 &&
                categories.map(item => {
                  return item.tags.length > 0 ? (
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          {item.name}
                        </span>
                      }
                      key={`/home/${item.en_name}`}
                    >
                      {item.tags.map(tag => (
                        <Menu.Item key={`/home/${item.en_name}/${tag.name}`}>
                          <Link
                            to={{
                              pathname: `/home/${item.en_name}/${tag.name}`,
                              state: { category: item.id, tag: tag.id },
                            }}
                          >
                            {tag.name}
                          </Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={`/home/${item.en_name}`}>
                      <Link
                        to={{
                          pathname: `/home/${item.en_name}`,
                          state: { category: item.id },
                        }}
                      >
                        {item.name}
                      </Link>
                    </Menu.Item>
                  )
                })}
            </Menu>
          </div>
          <div className={styles.homeHeaderMobile}>
            <Button type="link" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <span>柒叶</span>
          </div>
        </div>
        <div className={styles.homeHeaderRight}>
          {account && account.email && account.id ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="setting:1">
                    <Link to="/write/draft/new">写文章</Link>
                  </Menu.Item>
                  <Menu.Item key="setting:2">
                    <Link to="/write/drafts">草稿箱</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="setting:3">写教程</Menu.Item>
                  <Menu.Divider />
                  {account.account_type === 'ADMIN' ? (
                    <Menu.Item key="setting:4">
                      <Link to="/admin">管理中心</Link>
                    </Menu.Item>
                  ) : (
                    ''
                  )}
                  <Menu.Item key="setting:5">
                    <Link to="/account">个人中心</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="setting:7" onClick={logout}>
                    退出
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                <UserAvatar src={account.avatar} size="large" />
              </a>
            </Dropdown>
          ) : (
            <span>
              <Link to="/login">登录</Link>
              <span className="pd-5">·</span>
              <Link to="/register">注册</Link>
            </span>
          )}
        </div>
      </div>
      <Drawer
        title={
          <>
            <Link to="/" className="brand mr-10">
              <svg
                className="icon"
                width="24px"
                height="10.38px"
                viewBox="0 0 2368 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#007bff"
                  d="M809.325319 891.7236a3496.102927 3496.102927 0 0 0 785.32915-185.623254c220.526772-81.705962 426.774831-189.589563 607.241884-342.490768a1398.917128 1398.917128 0 0 0 165.196763-165.593394 171.146226 171.146226 0 0 0-59.494633-32.523732A2277.057905 2277.057905 0 0 0 1742.201158 16.954185a1800.307583 1800.307583 0 0 0-663.166838 31.928787C713.142329 138.124921 420.825368 341.001618 184.433361 629.947217c-3.173047 3.966309-7.932618 7.734302-2.578101 13.48545C606.646937 319.980181 1163.120067 253.941139 1478.044989 291.621073c-4.759571 10.312403-14.675343 8.725879-23.202906 9.519141a2181.469862 2181.469862 0 0 0-272.683733 46.207498c-274.071941 61.081156-535.451693 156.669199-773.430224 306.992304A1488.952339 1488.952339 0 0 0 0.396631 1024c126.921883-68.022197 263.759538-92.811627 403.571924-100.149298 135.449447-7.535987 270.700578-15.270289 405.356764-32.127102z"
                />
              </svg>
            </Link>
            <span>导航栏</span>
          </>
        }
        placement="left"
        closable
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={['home']}
          // defaultOpenKeys={['sub1']}
          // selectedKeys={[this.state.current]}
          mode="inline"
        >
          {tabs &&
            tabs.map(item => (
              <Menu.Item key={item.key}>
                <Link
                  to={{
                    pathname: item.path,
                    state: { category: item.key, tag: item.key2 },
                  }}
                >
                  <Icon type={item.icon} />
                  {item.title}
                </Link>
              </Menu.Item>
            ))}
          {categories &&
            categories.map(item => {
              return item.tags.length > 0 ? (
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">{item.name}</span>
                  }
                  key={item.id}
                >
                  {item.tags.map(tag => (
                    <Menu.Item key={`${item.id}-${tag.id}`}>
                      <Link
                        to={{
                          pathname: `/home/${item.en_name}/${tag.name}`,
                          state: { category: item.id, tag: tag.id },
                        }}
                      >
                        {tag.name}
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={item.id}>
                  <Link
                    to={{
                      pathname: `/home/${item.en_name}`,
                      state: { category: item.id },
                    }}
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              )
            })}
        </Menu>
      </Drawer>
    </Header>
  )
}

export default connect(
  ({ article: { categories }, user: { account }, loading }) => ({
    categories,
    account,
    loading: loading,
  }),
)(MainHeader)
