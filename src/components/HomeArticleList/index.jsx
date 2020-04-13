/*
 * @Author: 柒叶
 * @Date: 2020-04-09 07:58:49
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-12 21:25:10
 */

import React, { useState, useEffect } from 'react';
import { Tooltip, List, Skeleton, Tag, Card, Button } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import moment from 'moment';
import { connect } from 'dva';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const HomeArticleList = props => {
  const { dispatch, articles, loading } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/articles' });
    }
  }, []);
  return (
    <div>
      <Card bordered={false}>
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="vertical"
          // loadMore="加载更多"
          pagination
          dataSource={articles}
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
                    text={item.like}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comment}
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={150}
                    // className="mt-20"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
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
                {/* <div className="ft-13">{item.abstract}</div> */}
              </List.Item>
            </Skeleton>
          )}
        />
      </Card>
    </div>
  );
};

export default connect(({ article: { articles }, loading }) => ({
  articles,
  loading: loading.effects['article/articles'],
}))(HomeArticleList);
