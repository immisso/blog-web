/*
 * @Author: 柒叶
 * @Date: 2020-05-05 14:52:52
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 12:59:05
 */

import React, { useEffect } from 'react'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import { connect } from 'dva'

const Login = props => {
  const [form] = Form.useForm()
  const { dispatch, history, location, account } = props
  useEffect(() => {
    if (account && account.id) {
      history.push('/')
    }
  }, [])
  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'user/login',
        payload: values,
        callback(res) {
          dispatch({
            type: 'user/account',
            callback(user) {
              if (location.isRegister) {
                history.push('/')
              } else {
                history.goBack()
              }
            },
          })
        },
      })
    }
  }
  return (
    <>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ background: '#ddd', minHeight: '100vh' }}
      >
        <div style={{ width: 370, padding: 33, background: '#fff' }}>
          <h3 className="tc mt-10m">登录</h3>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '不是有效的电子邮箱',
                },
                {
                  required: true,
                  message: '电子邮箱必填',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="输入您的电子邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入你的密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox checked>自动登录</Checkbox>
              </Form.Item>
              <a className="fr" href="/">
                忘记密码
              </a>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
            <Link to="/register">注册账户</Link>
          </Form>
        </div>
      </Row>
    </>
  )
}

export default connect(({ user: { account }, loading }) => ({
  account,
  loading,
}))(Login)
