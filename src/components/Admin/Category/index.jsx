/*
 * @Author: 柒叶
 * @Date: 2020-04-28 20:56:49
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 09:30:40
 */
import React, { useEffect } from 'react'
import { Card, Table } from 'antd'
import { connect } from 'dva'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '分类名称',
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
  },
]

const Category = props => {
  const { dispatch, categories } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/categories' })
    }
  }, [])
  return (
    <>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table columns={columns} dataSource={categories} />
      </Card>
    </>
  )
}

export default connect(({ article: { categories }, loading }) => ({
  categories,
  loading,
}))(Category)
