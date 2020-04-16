/*
 * @Author: 柒叶
 * @Date: 2020-04-13 21:20:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-16 08:09:27
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Row, Col, Button, Popover, Tag, Upload } from 'antd';
import {
  CaretDownOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import UserAvatar from '@/components/UserAvatar';
import Markdown from '@/components/Markdown';

import './vue.css';

const { CheckableTag } = Tag;

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
          categories.map((category, index) => (
            <CheckableTag key={category.en_name} checked={index === 0}>
              {category.name}
            </CheckableTag>
          ))}
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
      <div>
        {tags &&
          tags.map((tag, index) => (
            <CheckableTag key={tag.en_name} checked={index === 0}>
              {tag.name}
            </CheckableTag>
          ))}
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>文章封面图</h4>
      <div>
        {/* <Input bordered={false}/> */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          <div>
            {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </div>
      <div className="mt-20 tc">
        <Button type="primary">发布文章</Button>
      </div>
    </div>
  );
};

const Write = props => {
  const { dispatch, categories, tags } = props;
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/categories' });
      dispatch({ type: 'article/tags' });
    }
  }, []);

  const onChangeMarkdown = e => {
    setMarkdown(e.target.value);
  };
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
              // height: 'auto',
              minHeight: 600,
              background: '#fff',
              borderRight: '1px solid #ccc',
            }}
          >
            <Input.TextArea
              style={{
                border: 'none',
                outline: 'none',
                padding: 20,
                resize: 'none',
              }}
              placeholder="请输入Markdown"
              rows={27}
              onChange={onChangeMarkdown}
              value={markdown}
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              autocorrect="off"
              autoSize
              // allowClear={true}
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ height: '100%', background: '#fff', padding: 20 }}>
            <div className="markdown-body">
              <Markdown markdown={markdown} />
            </div>
          </div>
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
