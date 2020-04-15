/*
 * @Author: 柒叶
 * @Date: 2020-04-13 21:20:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-14 13:01:45
 */

import React, { useState, useEffect } from 'react';
// import ReactMde from 'react-mde'
// import { Converter } from 'showdown'
import { connect } from 'dva';
import { Input, Row, Col, Button, Popover, Typography, Tag } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import UserAvatar from '@/components/UserAvatar';

const { CheckableTag } = Tag;
// import 'react-mde/lib/styles/css/react-mde-all.css'

// const converter = new Converter({
//   tables: true,
//   simplifiedAutoLink: true,
//   strikethrough: true,
//   tasklists: true
// })

// const content = (
//   <div>
//     <p>Content</p>
//     <p>Content</p>
//   </div>
// )

const Content = props => {
  const { categories, tags } = props;
  console.log('eeeeeeeeeeeeeeeeeeeee');
  console.log(tags);
  console.log(categories);
  return (
    <div>
      <h4 style={{ marginBottom: 16 }}>分类</h4>
      <div>
        {categories &&
          categories.map(category => (
            <CheckableTag key={category.en_name}>{category.name}</CheckableTag>
          ))}
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
      <div>
        {tags &&
          tags.map(tag => (
            <CheckableTag key={tag.en_name}>{tag.name}</CheckableTag>
          ))}
      </div>
      <div className="mt-20 tc">
        <Button type="primary">发布文章</Button>
      </div>
    </div>
  );
};

const Write = props => {
  const { dispatch, categories, tags } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/categories' });
      dispatch({ type: 'article/tags' });
    }
  }, []);
  return (
    <>
      <Row>
        <Col span={19}>
          <div style={{ height: 55 }}>
            <Input
              style={{
                height: 55,
                fontSize: 18,
                border: 'none',
                outline: 'none',
                fontWeight: 700,
              }}
              size="large"
              placeholder="请输入标题"
            />
          </div>
        </Col>
        <Col span={5} style={{ background: '#fff' }}>
          <Popover
            placement="bottom"
            title={<strong>发布文章</strong>}
            content={<Content categories={categories} tags={tags} />}
            overlayStyle={{ width: 300 }}
            trigger="click"
          >
            <Button type="link">
              发布
              <CaretDownOutlined />
            </Button>
          </Popover>
          <Button type="primary" className="mt-10 mr-20">
            保存草稿
          </Button>
          <UserAvatar
            src={'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png'}
          />
        </Col>
      </Row>
      <Row style={{ borderTop: '1px solid #ccc' }}>
        <Col span={12}>
          <div
            style={{
              height: 600,
              background: '#fff',
              borderRight: '1px solid #ccc',
            }}
          >
            <Input.TextArea
              style={{ border: 'none', outline: 'none', padding: 20 }}
              placeholder="请输入Markdown"
              rows={27}
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ height: '100%', background: '#fff' }}></div>
        </Col>
      </Row>
    </>
  );
};

export default connect(({ article: { categories, tags }, loading }) => ({
  categories,
  tags,
  loading,
}))(Write);
