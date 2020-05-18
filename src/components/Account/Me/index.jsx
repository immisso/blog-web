/*
 * @Author: 柒叶
 * @Date: 2020-05-06 20:59:56
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 20:41:23
 */

import React, { useEffect } from 'react'
import { Form, Input, Row, Col, Avatar, Button, Tag } from 'antd'
import { connect } from 'dva'

const Me = props => {
  const { dispatch, account, history, avatar } = props
  const [form] = Form.useForm()
  useEffect(() => {
    if (!account || !account.id) {
      history.push('/login')
    }
    dispatch({
      type: 'user/account',
      callback(res) {
        if (res.status === 200) {
          const account = res.data
          Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {}
            obj[key] = account[key] || null
            form.setFieldsValue(obj)
          })
        }
      },
    })
  }, [])

  const changeAvatar = () => {
    dispatch({ type: 'user/changeAvatar' })
  }

  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'user/setAccount',
        payload: { ...values, avatar },
      })
    }
  }

  return (
    <>
      <h2>个人信息</h2>
      <Row>
        <Col span={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '不是有效的电子邮箱',
                },
              ]}
            >
              <Input disabled placeholder="输入您的电子邮箱" />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input placeholder="输入您的昵称" />
            </Form.Item>
            <Form.Item name="profession" label="职业">
              <Input placeholder="职业" />
            </Form.Item>
            <Form.Item name="summary" label="简介">
              <Input.TextArea rows={4} placeholder="简介" />
            </Form.Item>
            <Form.Item
              name="website"
              label="个人网站"
              rules={[{ type: 'url' }]}
            >
              <Input placeholder="个人网站地址" />
            </Form.Item>
            <Form.Item
              name="github"
              label="Github地址"
              rules={[{ type: 'url' }]}
            >
              <Input placeholder="Github地址" />
            </Form.Item>
            <Form.Item name="gitee" label="码云地址" rules={[{ type: 'url' }]}>
              <Input placeholder="gitee地址" />
            </Form.Item>
            <Form.Item name="weibo" label="微博地址" rules={[{ type: 'url' }]}>
              <Input placeholder="微博地址" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div className="tc">
            <Avatar size={128} src={avatar} />
          </div>
          <div className="tc mt-10">
            <Button onClick={changeAvatar}>切换图片</Button>
          </div>
          <div className="tc mt-10">
            <span>
              账户类型：<Tag color="blue">管理员</Tag>
            </span>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default connect(({ user: { avatar, account }, loading }) => ({
  avatar,
  account,
  loading,
}))(Me)
