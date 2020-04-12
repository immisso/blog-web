/*
 * @Author: 柒叶
 * @Date: 2020-04-12 14:10:08
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 14:13:21
 */

import React, { useState } from 'react';
import { Button, Input, Form, Comment } from 'antd';

const LoginCommentForm = props => (
  <>
    <div className="mb-10">
      <Input.TextArea
        rows={3}
        // onChange={onChange}
        // value={value}
      />
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <div style={{ opacity: 0 }}>
        <span>表情</span>
      </div>
      <div>
        <Button
          htmlType="submit"
          // loading={submitting}
          // onClick={onSubmit}
          type="primary"
        >
          评论
        </Button>
      </div>
    </div>
  </>
);

export default LoginCommentForm;
