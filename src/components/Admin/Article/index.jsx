/*
 * @Author: 柒叶
 * @Date: 2020-04-28 20:58:37
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 13:22:51
 */
import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Tag } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '分类',
    dataIndex: 'category',
    render(category) {
      return <Tag color="warning">{category.name}</Tag>
    },
  },
  {
    title: '标签',
    dataIndex: 'tag',
    render(tag) {
      return <Tag color="#87d068">{tag.name}</Tag>
    },
  },
  {
    title: '作者',
    dataIndex: 'user',
    render(user) {
      return <span>{user.nickname}</span>
    },
  },
  {
    title: '点赞数',
    dataIndex: 'like',
  },
  {
    title: '浏览量',
    dataIndex: 'view',
  },
  {
    title: '评论数',
    dataIndex: 'comment',
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

const Article = props => {
  const { dispatch, articles, articleCount, loading } = props
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/articles', payload: { page, pageSize: 10 } })
    }
  }, [])
  const pageChange = pageNum => {
    setPage(pageNum)
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { page: pageNum, pageSize: 10 },
      })
    }
  }
  return (
    <>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table
          columns={columns}
          dataSource={articles}
          rowKey={() => uuidv4()}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: articleCount,
            current: page,
            onChange: pageChange,
          }}
        />
      </Card>
    </>
  )
}

export default connect(({ article: { articles }, loading }) => ({
  articles,
  loading: loading.effects['article/articles'],
}))(Article)
