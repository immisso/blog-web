/*
 * @Author: 柒叶
 * @Date: 2020-04-12 14:10:08
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 20:48:12
 */

import React, { useState } from 'react'
import { Button, Input, Form } from 'antd'
import { connect } from 'dva'

const LoginCommentForm = props => {
  const { id, author, dispatch } = props
  const [form] = Form.useForm()
  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'article/addComment',
        payload: { ...values, article_id: id, author },
      })
    }
    form.resetFields()
  }
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: '输入你的评论',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="发表您的看法" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            评论
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default connect(({ loading }) => ({
  loading,
}))(LoginCommentForm)
