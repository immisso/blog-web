/*
 * @Author: 柒叶
 * @Date: 2020-04-28 21:00:14
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-01 17:57:18
 */
import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Select,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select

const Tag = props => {
  const { dispatch, categories, tags, loading } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/categories' })
      dispatch({ type: 'admin/tags' })
    }
  }, [])
  const handleCancel = () => {
    setVisible(false)
  }
  const showModal = () => {
    setVisible(true)
  }
  const onSubmit = values => {
    if (dispatch) {
      dispatch({ type: 'admin/createTag', payload: values })
    }
    form.resetFields()
  }
  const deleteTag = id => {
    if (dispatch) {
      dispatch({ type: 'admin/deleteTag', payload: { id } })
    }
  }

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
      render(tag) {
        return (
          <Popconfirm
            title="确定要删除吗？"
            cancelText="取消"
            okText="确定"
            onConfirm={() => deleteTag(tag.id)}
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
          添加标签
        </Button>
      </Space>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table
          columns={columns}
          dataSource={tags}
          rowKey={() => uuidv4()}
          loading={loading}
          pagination={false}
        />
      </Card>
      <Modal
        title="添加标签"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={400}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="category_id"
            label="分类名称"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              {categories &&
                categories.map(category => (
                  <Option value={category.id} key={category.en_name}>
                    {category.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="标签名称"
            rules={[
              {
                required: true,
                message: '标签名不能为空',
              },
            ]}
          >
            <Input placeholder="输入标签名" />
          </Form.Item>
          <Form.Item
            name="en_name"
            label="标签英文名"
            rules={[
              {
                required: true,
                message: '标签英文名不能为空',
              },
            ]}
          >
            <Input placeholder="输入标签英文名" />
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

export default connect(({ admin: { categories, tags }, loading }) => ({
  tags,
  categories,
  loading: loading.effects['admin/tags'],
}))(Tag)
