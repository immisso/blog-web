/*
 * @Author: 柒叶
 * @Date: 2020-04-09 07:58:49
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 16:51:28
 */

import React, { useState, useEffect } from 'react'
import { Tooltip, List, Skeleton, Tag, Card } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import moment from 'moment'
import { connect } from 'dva'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

const HomeArticleList = props => {
  const {
    dispatch,
    articles,
    articleCount,
    loading,
    location: { state = {} },
  } = props
  const { category, tag } = state
  const [page, setPage] = useState(1)
  useEffect(
    () => {
      if (dispatch) {
        dispatch({
          type: 'article/articles',
          payload: { page, pageSize: 10, category, tag },
        })
      }
    },
    tag ? [tag] : category ? [category] : [],
  )
  const pageChange = pageNum => {
    setPage(pageNum)
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { page: pageNum, pageSize: 10, category, tag },
      })
    }
  }
  return (
    <div>
      <Card bordered={false}>
        <List
          // className="demo-loadmore-list"
          loading={loading}
          itemLayout="vertical"
          dataSource={articles}
          pagination={{
            pageSize: 10,
            total: articleCount,
            current: page,
            onChange: pageChange,
          }}
          renderItem={item => (
            <Skeleton avatar title={false} loading={false} active>
              <List.Item
                actions={[
                  <IconText
                    icon={EyeOutlined}
                    text={item.view}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={item.favorite}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comment}
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  item.cover ? (
                    <img width={150} height={92} alt="logo" src={item.cover} />
                  ) : null
                }
              >
                <List.Item.Meta
                  title={
                    <Link to={`/article/${item.id}`} target="_block">
                      <h3 className="fw-700 ft-16">{item.title}</h3>
                    </Link>
                  }
                  description={
                    <span>
                      <Tag color="orange">{item.tag && item.tag.name}</Tag>
                      <span>{item.user && item.user.nickname}</span>
                      <span className="mrl-5">·</span>
                      <span>
                        <Tooltip title={item.createdAt}>
                          {moment(item.createdAt).fromNow()}
                        </Tooltip>
                      </span>
                    </span>
                  }
                />
              </List.Item>
            </Skeleton>
          )}
        />
      </Card>
    </div>
  )
}

export default connect(({ article: { articles, articleCount }, loading }) => ({
  articles,
  articleCount,
  loading: loading.effects['article/articles'],
}))(HomeArticleList)
