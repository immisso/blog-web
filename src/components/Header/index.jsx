/*
 * @Author: 柒叶
 * @Date: 2020-04-05 12:05:06
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-04 20:04:03
 */

import React, { useState, useEffect } from 'react'
import { Layout, Menu, Drawer, Button, Dropdown } from 'antd'
import { connect } from 'dva'
import Icon, { MenuOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import UserAvatar from '@/components/UserAvatar'

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
  const { dispatch, categories, pathname } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/categories' })
    }
  }, [])

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const handleClick = () => {}
  return (
    <Header>
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderLeft}>
          <div className={styles.homeHeaderPc}>
            <Link to="/" className={styles.brand}>
              <svg
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
          {/* <span>
            <Link to="/user/login">登录</Link>
            <span className="pd-5">·</span>
            <Link to="/user/register">注册</Link>
          </span> */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="setting:1">
                  <Link to="/write/draft/new">写文章</Link>
                </Menu.Item>
                <Menu.Item key="setting:2">写教程</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:4">
                  <Link to="/admin">管理中心</Link>
                </Menu.Item>
                <Menu.Item key="setting:5">个人中心</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:7">退出</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <UserAvatar
                src={
                  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png'
                }
                size="large"
              />
            </a>
          </Dropdown>
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

export default connect(({ article: { categories }, loading }) => ({
  categories,
  loading: loading,
}))(MainHeader)
