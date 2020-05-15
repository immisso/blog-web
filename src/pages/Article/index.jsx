/*
 * @Author: 柒叶
 * @Date: 2020-04-09 21:43:20
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 10:54:50
 */

import React, { useEffect, useState } from 'react'
import { Layout, Card, List, Row, Col, Divider, Tooltip } from 'antd'
import moment from 'moment'
import { Link } from 'umi'
import { connect } from 'dva'
import {
  createFromIconfontCN,
  WeiboCircleOutlined,
  GlobalOutlined,
  GithubOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import MathJax from 'react-mathjax'
import Header from '@/components/Header'
import UserAvatar from '@/components/UserAvatar'
import ArticleAnchor from '@/components/Anchor'
import AddComment from '@/components/Comment'
import Markdown from '@/components/Markdown'

import styles from './index.less'
import './markdown.css'

const { Content } = Layout
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1439645_kzb7blmpkvc.js',
})

const Article = props => {
  const {
    dispatch,
    loading,
    loading2,
    detail,
    hots,
    isFavorite,
    favoriteCount,
    match: {
      params: { id },
    },
  } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { id } })
      dispatch({ type: 'article/isFavorite', payload: { id } })
      dispatch({ type: 'article/hot' })
    }
  }, [])

  const handleFavorite = () => {
    if (dispatch) {
      dispatch({
        type: 'article/favorite',
        payload: { id, author: detail.uid },
      })
    }
  }

  return (
    <>
      <Header />
      <Content className={styles.articleContainer}>
        <div className={styles.articleContainerWrapper}>
          <div className={styles.articleContainerDetail}>
            <Card
              size="small"
              bordered={false}
              loading={loading}
              className="p-1m"
            >
              <div className="pt-3">
                <div
                  className="mb-1m"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {detail && detail.user && detail.user.avatar && (
                      <UserAvatar size="large" src={detail.user.avatar} />
                    )}
                    <div className="pl-1m">
                      <h4 className="mb-0 fw-700">
                        {detail.user && detail.user.nickname}
                      </h4>
                      <small>
                        {moment(detail.createdAt).format(
                          'YYYY[年]MM[月]DD[日]',
                        )}
                        <span className="ml-10">{detail.view}阅读</span>
                      </small>
                    </div>
                  </div>
                </div>
                {detail && detail.cover && (
                  <div>
                    <img style={{ width: '100%' }} src={detail.cover} />
                  </div>
                )}

                <h1 className="mt-15m fw-700 mb-15m">{detail.title}</h1>
                <div className="markdown-body ft-16">
                  <MathJax.Provider>
                    <Markdown markdown={detail.markdown} />
                  </MathJax.Provider>
                </div>
              </div>
            </Card>
            <AddComment id={id} author={detail.uid} />
          </div>
          <div className={styles.articleContainerSider}>
            <Card
              title="关于作者"
              bordered={false}
              size="small"
              loading={loading}
            >
              <div style={{ display: 'flex', marginBottom: 20 }}>
                {detail && detail.user && detail.user.avatar && (
                  <UserAvatar size="large" src={detail.user.avatar} />
                )}
                <div className="pl-1m">
                  <h5>{detail.user && detail.user.nickname}</h5>
                  <small>{detail.user && detail.user.profession}</small>
                </div>
              </div>
              <Row
                className="tc"
                type="flex"
                align="middle"
                justify="space-between"
              >
                <Col span={8}>
                  <h2 className="m-0">
                    <b>{detail.user && detail.user.total_view}</b>
                  </h2>
                  <small>浏览</small>
                </Col>
                <Col span={8}>
                  <h2 className="m-0">
                    <b>{detail.user && detail.user.total_like}</b>
                  </h2>
                  <small>点赞</small>
                </Col>
                <Col span={8}>
                  <h2 className="m-0">
                    <b>{detail.user && detail.user.total_comment}</b>
                  </h2>
                  <small>评论</small>
                </Col>
              </Row>
              <Divider dashed className="mb-0" />
              <div className="ft-16 ml-10 mt-10">
                {detail.user && detail.user.website && (
                  <Tooltip title={detail.user.website}>
                    <a href={detail.user.website} className="mr-10">
                      <GlobalOutlined />
                    </a>
                  </Tooltip>
                )}
                {detail.user && detail.user.github && (
                  <Tooltip title={detail.user.github}>
                    <a href={detail.user.github} className="mr-10">
                      <GithubOutlined />
                    </a>
                  </Tooltip>
                )}
                {detail.user && detail.user.weibo && (
                  <Tooltip title={detail.user.weibo}>
                    <a href={detail.user.weibo} className="mr-10">
                      <WeiboCircleOutlined />
                    </a>
                  </Tooltip>
                )}
                {detail.user && detail.user.gitee && (
                  <Tooltip title={detail.user.gitee}>
                    <a href={detail.user.gitee}>
                      <IconFont type="icon-gitee" />
                    </a>
                  </Tooltip>
                )}
              </div>
            </Card>
            <Card
              title="相关文章"
              size="small"
              bordered={false}
              loading={loading2}
              className="mt-20"
            >
              <List
                itemLayout="vertical"
                dataSource={hots}
                bordered={false}
                size="small"
                split={false}
                renderItem={item => (
                  <List.Item
                    className="pl-0"
                    actions={[
                      <span key="1">
                        <EyeOutlined />
                        <span className="pl-2 pointer">{item.view}</span>
                      </span>,
                      <span key="2">
                        <LikeOutlined />
                        <span className="pl-2 pointer">{item.favorite}</span>
                      </span>,
                    ]}
                  >
                    <Link
                      to={`/article/${item.id}`}
                      target="_block"
                      style={{ color: '#000000a6' }}
                    >
                      {item.title}
                    </Link>
                  </List.Item>
                )}
              />
            </Card>
            {detail && detail.anchor && (
              <ArticleAnchor anchors={JSON.parse(detail.anchor || '[]')} />
            )}
          </div>
          <div className={styles.articlePanel}>
            <div className={styles.articlePanelItem}>
              <div className={styles.articlePanelIcon}>
                <LikeOutlined
                  style={{ color: isFavorite ? '#007bff' : '#ccc' }}
                  onClick={handleFavorite}
                />
              </div>
              <div className={styles.articlePanelCount}>
                <span>{favoriteCount}</span>
              </div>
            </div>
            <div className={styles.articlePanelItem}>
              <div className={styles.articlePanelIcon}>
                <MessageOutlined style={{ color: '#ccc' }} />
              </div>
              <div className={styles.articlePanelCount}>
                <span>{detail.comment}</span>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default connect(
  ({ article: { detail, hots, isFavorite, favoriteCount }, loading }) => ({
    detail,
    hots,
    isFavorite,
    favoriteCount,
    loading: loading.effects['article/detail'],
    loading2: loading.effects['article/hot'],
  }),
)(Article)
