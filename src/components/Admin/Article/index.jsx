/*
 * @Author: 柒叶
 * @Date: 2020-04-28 20:58:37
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 12:46:30
 */
import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Tag, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const Article = props => {
  const { dispatch, articles, articleCount, loading } = props
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/articles', payload: { page, pageSize: 10 } })
    }
  }, [])

  const pageChange = pageNum => {
    setPage(pageNum)
    if (dispatch) {
      dispatch({
        type: 'admin/articles',
        payload: { page: pageNum, pageSize: 10 },
      })
    }
  }
  const deleteArticle = id => {
    if (dispatch) {
      dispatch({ type: 'admin/deleteArticle', payload: { id } })
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: '标题',
      width: 150,
      ellipsis: true,
      render(article) {
        return (
          <Link className="ft-13" to={`/article/${article.id}`}>
            {article.title}
          </Link>
        )
      },
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
      dataIndex: 'favorite',
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
      dataIndex: 'id',
      render(id) {
        return (
          <Popconfirm
            title="确定要删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => deleteArticle(id)}
          >
            <Button size="small" type="danger">
              删除
            </Button>
          </Popconfirm>
        )
      },
    },
  ]
  return (
    <>
      <Card size="small">
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

export default connect(({ admin: { articles, articleCount }, loading }) => ({
  articles,
  articleCount,
  loading: loading.effects['admin/articles'],
}))(Article)
