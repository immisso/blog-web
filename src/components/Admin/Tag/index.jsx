/*
 * @Author: 柒叶
 * @Date: 2020-04-28 21:00:14
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 12:51:59
 */
import React, { useEffect } from 'react'
import { Card, Table, Button } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '英文名称',
    dataIndex: 'en_name',
    key: 'en_name',
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

const Tag = props => {
  const { dispatch, tags, loading } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/tags' })
    }
  }, [])
  return (
    <>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table
          columns={columns}
          dataSource={tags}
          rowKey={() => uuidv4()}
          loading={loading}
        />
      </Card>
    </>
  )
}

export default connect(({ article: { tags }, loading }) => ({
  tags,
  loading: loading.effects['article/tags'],
}))(Tag)
