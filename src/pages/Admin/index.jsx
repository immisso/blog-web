/*
 * @Author: 柒叶
 * @Date: 2020-04-27 17:56:34
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 06:23:06
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
import withAuth from '@/components/withAuth'

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
  const { children, dispatch, account, history } = props
  useEffect(() => {
    if (account && account.id) {
      dispatch({ type: 'user/updateAccount', payload: account })
    } else {
      history.push('/login')
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

export default connect(({ user, loading }) => ({
  user,
  loading,
}))(withAuth(Admin))
