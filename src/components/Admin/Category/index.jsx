/*
 * @Author: 柒叶
 * @Date: 2020-04-28 20:56:49
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 11:12:46
 */
import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Input,
  Form,
  Popconfirm,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { PlusOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'

const Category = props => {
  const { dispatch, categories, loading } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/categories' })
    }
  }, [])
  const addCategory = () => {}
  const handleCancel = () => {
    setVisible(false)
  }
  const showModal = () => {
    setVisible(true)
  }
  const onSubmit = values => {
    if (dispatch) {
      dispatch({ type: 'admin/createCategory', payload: values })
    }
    form.resetFields()
  }
  const deleteCategory = id => {
    if (dispatch) {
      dispatch({ type: 'admin/deleteCategory', payload: { id } })
    }
  }
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
      render(date) {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '操作',
      render(category) {
        return (
          <Popconfirm
            title="确定要删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => deleteCategory(category.id)}
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
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          添加分类
        </Button>
      </Space>
      <Card size="small">
        <Table
          columns={columns}
          dataSource={categories}
          rowKey={() => uuidv4()}
          loading={loading}
          pagination={false}
        />
      </Card>
      <Modal
        title="添加分类"
        okText="添加"
        cancelText="取消"
        visible={visible}
        onOk={addCategory}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={400}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="分类名称"
            rules={[
              {
                required: true,
                message: '分类名不能为空',
              },
            ]}
          >
            <Input placeholder="输入分类名" />
          </Form.Item>
          <Form.Item
            name="en_name"
            label="分类英文名"
            rules={[
              {
                required: true,
                message: '分类英文名不能为空',
              },
            ]}
          >
            <Input placeholder="输入分类英文名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default connect(({ admin: { categories }, loading }) => ({
  categories,
  loading: loading.effects['admin/categories'],
}))(Category)
