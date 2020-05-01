/*
 * @Author: 柒叶
 * @Date: 2020-04-28 20:59:36
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-30 07:59:21
 */

import React, { useEffect } from 'react'
import { Card, Table, Button, Tag } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '评论用户',
    dataIndex: 'user',
    ellipsis: true,
    render(user) {
      return <span>{user.nickname}</span>
    },
  },
  {
    title: '评论文章',
    dataIndex: 'article',
    ellipsis: true,
    width: 150,
    render(article) {
      return (
        <Link className="ft-13" to={`/article/${article.id}`}>
          {article.title}
        </Link>
      )
    },
  },
  {
    title: '评论内容',
    dataIndex: 'content',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    render(status) {
      return status === 1 ? (
        <Tag color="success">可见</Tag>
      ) : (
        <Tag color="error">不可见</Tag>
      )
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    render(date) {
      return <span>{moment(date).format('YYYY-MM-DD')}</span>
    },
  },
  {
    title: '操作',
    render() {
      return (
        <Button size="small" type="danger">
          删除
        </Button>
      )
    },
  },
]

const Comment = props => {
  const { dispatch, comments, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/comments' })
    }
  }, [])
  return (
    <>
      <Card size="small">
        <Table
          columns={columns}
          dataSource={comments}
          rowKey={() => uuidv4()}
          loading={loading}
          // pagination={{
          //   pageSize: 10,
          //   total: articleCount,
          //   current: page,
          //   onChange: pageChange
          // }}
        />
      </Card>
    </>
  )
}

export default connect(({ admin: { comments }, loading }) => ({
  comments,
  loading: loading.effects['admin/comments'],
}))(Comment)
