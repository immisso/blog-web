/*
 * @Author: 柒叶
 * @Date: 2020-04-09 21:43:20
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 16:27:25
 */

import React, { useEffect, useState } from 'react';
import { Layout, Card, List, Row, Col, Divider, Tooltip, Button } from 'antd';
import moment from 'moment';
import { Link } from 'umi';
import { connect } from 'dva';
import {
  createFromIconfontCN,
  WeiboCircleOutlined,
  GlobalOutlined,
  GithubOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Header from '@/components/common/Header';
import UserAvatar from '@/components/common/UserAvatar';
import ArticleAnchor from '@/components/Anchor';
import AddComment from '@/components/Comment';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import less from 'highlight.js/lib/languages/less';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import cpp from 'highlight.js/lib/languages/cpp';
import nginx from 'highlight.js/lib/languages/nginx';
import shell from 'highlight.js/lib/languages/shell';

import styles from './index.less';
import './markdown-github.css';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('less', less);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('shell', shell);

const { Content } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1439645_kzb7blmpkvc.js',
});

const createMarkup = body => {
  return { __html: body };
};

const Article = props => {
  const {
    dispatch,
    detail,
    hots,
    match: {
      params: { id },
    },
  } = props;

  // const anchors = JSON.parse(detail.anchor || '[]');

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { id } });
      dispatch({ type: 'article/hot' });
    }
  }, []);
  console.log('2222222222222222222222222222222222');
  console.log(detail);
  return (
    <>
      <Header />
      <Content className={styles.articleContainer}>
        <div className={styles.articleContainerWrapper}>
          <div className={styles.articleContainerDetail}>
            <Card
              bordered={false}
              // loading={loading}
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
                      <UserAvatar src={detail.user.avatar} />
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
                <h2 className="mt-15m fw-700">{detail.title}</h2>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={createMarkup(detail.content_html)}
                />
              </div>
            </Card>
            <Card
              title="评论"
              bordered={false}
              // loading={loading}
              className="mtb-20"
              id="comment"
              // size="small"
            >
              <AddComment id={id} />
            </Card>
          </div>
          <div className={styles.articleContainerSider}>
            <Card
              title="关于作者"
              bordered={false}
              size="small"
              // loading={loading}
            >
              <div style={{ display: 'flex', marginBottom: 20 }}>
                {detail && detail.user && detail.user.avatar && (
                  <UserAvatar src={detail.user.avatar} />
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
                <Tooltip title="https://www.immisso.com">
                  <a href="https://www.immisso.com" className="mr-10">
                    <GlobalOutlined />
                  </a>
                </Tooltip>
                <Tooltip title="https://github.com/immisso">
                  <a href="https://github.com/immisso" className="mr-10">
                    <GithubOutlined />
                  </a>
                </Tooltip>
                <Tooltip title="微博">
                  <a href="/" className="mr-10">
                    <WeiboCircleOutlined />
                  </a>
                </Tooltip>
                <Tooltip title="https://gitee.com/misso">
                  <a href="https://gitee.com/misso">
                    <IconFont type="icon-gitee" />
                  </a>
                </Tooltip>
              </div>
            </Card>
            <Card
              title="相关文章"
              size="small"
              bordered={false}
              // loading={loading}
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
                        <span className="pl-2 pointer">{item.like}</span>
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
                <LikeOutlined style={{ color: '#ccc' }} />
                {/* <ThumbsUp color={islike ? '#007bff' : '#ccc'} onClick={this.handleLike} /> */}
              </div>
              <div className={styles.articlePanelCount}>
                {/* <span>{likeNum}</span> */}
                <span>100</span>
              </div>
            </div>
            <div className={styles.articlePanelItem}>
              <div className={styles.articlePanelIcon}>
                <MessageOutlined style={{ color: '#ccc' }} />
                {/* <MessageSquare color="#ccc" onClick={this.handleMessage} /> */}
              </div>
              <div className={styles.articlePanelCount}>
                {/* <span>{commentNum}</span> */}
                <span>123</span>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default connect(({ article: { detail, hots }, loading }) => ({
  detail,
  hots,
  loading,
}))(Article);
