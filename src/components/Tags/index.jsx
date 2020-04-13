/*
 * @Author: 柒叶
 * @Date: 2020-04-13 07:33:17
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-13 07:58:05
 */

import React, { useState, useEffect } from 'react';
import { Tag, Button, Space, Card } from 'antd';
import { connect } from 'dva';

const Tags = props => {
  const { dispatch, tags, loading } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/tags' });
    }
  }, []);
  return (
    <Card
      loading={loading}
      size="small"
      bordered={false}
      title="常用标签"
      className="mt-20"
    >
      {tags &&
        tags.map(tag => (
          <Tag key={tag.en_name} className="mb-10">
            {tag.name}
          </Tag>
        ))}
    </Card>
  );
};

export default connect(({ article: { tags }, loading }) => ({
  tags,
  loading: loading.effects['article/tags'],
}))(Tags);
