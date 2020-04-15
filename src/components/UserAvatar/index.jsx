/*
 * @Author: 柒叶
 * @Date: 2020-04-10 09:04:59
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-10 09:10:38
 */

import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserAvatar = props =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

export default UserAvatar;
