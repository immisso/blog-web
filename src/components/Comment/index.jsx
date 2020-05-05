/*
 * @Author: 柒叶
 * @Date: 2020-04-11 20:19:37
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-04 15:47:44
 */
import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import { Comment, Divider, Tooltip, List, Card } from 'antd'
import moment from 'moment'
import UserAvatar from '@/components/UserAvatar'
import LoginCommentForm from '@/components/Forms/LoginCommentForm'
import NoLoginCommentForm from '@/components/Forms/NoLoginCommentForm'

moment.locale('zh-cn')
const Content = ({ content }) => <p>{content}</p>

const Datetime = ({ time }) => {
  return (
    <Tooltip title={time}>
      <span>{moment(time).fromNow()}</span>
    </Tooltip>
  )
}

const AddComment = props => {
  const { user, dispatch, id, author, comments, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/comments', payload: { id } })
    }
  }, [])
  return (
    <Card
      title="评论"
      bordered={false}
      loading={loading}
      className="mtb-20"
      id="comment"
    >
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
      <Divider />
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
        <NoLoginCommentForm id={id} author={author} />
      )}
    </Card>
  )
}

export default connect(({ article: { comments }, loading }) => ({
  comments,
  loading: loading.effects['article/comments'],
}))(AddComment)
