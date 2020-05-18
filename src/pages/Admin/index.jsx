/*
 * @Author: 柒叶
 * @Date: 2020-04-27 17:56:34
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-17 19:37:23
 */

import React, { useEffect } from 'react'
import { Link } from 'umi'
import { connect } from 'dva'
import ProLayout from '@ant-design/pro-layout'
import {
  FileTextOutlined,
  TagsOutlined,
  CommentOutlined,
  ClusterOutlined,
} from '@ant-design/icons'

const routes = {
  routes: [
    {
      exact: true,
      name: '分类管理',
      icon: <ClusterOutlined />,
      path: '/admin/categories',
    },
    {
      exact: true,
      name: '标签管理',
      icon: <TagsOutlined />,
      path: '/admin/tags',
    },
    {
      exact: true,
      name: '文章管理',
      icon: <FileTextOutlined />,
      path: '/admin/articles',
    },
    {
      exact: true,
      name: '评论管理',
      icon: <CommentOutlined />,
      path: '/admin/comments',
    },
  ],
}

const Admin = props => {
  const { children, account, history } = props
  useEffect(() => {
    if (!account || !account.id) {
      history.push('/login')
    }
    if (account.account_type !== 'ADMIN') {
      history.push('/404')
    }
  }, [])
  return (
    <div>
      <ProLayout
        title="后台管理中心"
        logo={null}
        siderWidth={200}
        contentWidth="Fluid"
        navTheme="light"
        fixSiderbar={true}
        fixedHeader={true}
        route={routes}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>
        }}
      >
        {children}
      </ProLayout>
    </div>
  )
}

export default connect(({ user: { account }, loading }) => ({
  account,
  loading,
}))(Admin)
