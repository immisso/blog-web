/*
 * @Author: 柒叶
 * @Date: 2020-04-11 20:19:37
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 16:38:45
 */
import React, { useEffect } from 'react'
import { connect } from 'dva'
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
  const { account, dispatch, id, author, comments, loading } = props
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
      {account && account.id ? (
        <Comment
          avatar={<UserAvatar src={account.avatar} />}
          content={<LoginCommentForm id={id} author={author} />}
        />
      ) : (
        <NoLoginCommentForm id={id} author={author} />
      )}
    </Card>
  )
}

export default connect(
  ({ article: { comments }, user: { account }, loading }) => ({
    comments,
    account,
    loading: loading.effects['article/comments'],
  }),
)(AddComment)
