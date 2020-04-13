/*
 * @Author: 柒叶
 * @Date: 2020-04-11 20:19:37
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 20:45:48
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Comment, Divider, Tooltip, List } from 'antd';
import moment from 'moment';
import UserAvatar from '@/components/Common/UserAvatar';
import LoginCommentForm from '@/components/forms/LoginCommentForm';
import NoLoginCommentForm from '@/components/forms/NoLoginCommentForm';

moment.locale('zh-cn');
const Content = ({ content }) => <p>{content}</p>;

const Datetime = ({ time }) => {
  return (
    <Tooltip title={time}>
      <span>{moment(time).fromNow()}</span>
    </Tooltip>
  );
};

const AddComment = props => {
  const { user, dispatch, id, comments } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/comments', payload: { id } });
    }
  }, []);
  return (
    <>
      <List
        className="comment-list"
        itemLayout="horizontal"
        split={false}
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <Comment
              author={item.user.nickname}
              avatar={<UserAvatar src={item.user.avatar} />}
              content={<Content content={item.content} />}
              datetime={<Datetime time={item.createdAt} />}
            />
          </List.Item>
        )}
      />
      <Divider orientation="left">我想说↓</Divider>
      {user && user.id ? (
        <Comment
          avatar={
            <UserAvatar
              src={
                'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/003.png'
              }
            />
          }
          content={<LoginCommentForm />}
        />
      ) : (
        <NoLoginCommentForm id={id} />
      )}
    </>
  );
};

export default connect(({ article: { comments }, loading }) => ({
  comments,
  loading,
}))(AddComment);
