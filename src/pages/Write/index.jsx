/*
 * @Author: 柒叶
 * @Date: 2020-04-13 21:20:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 21:01:31
 */

import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Upload,
  Dropdown,
  Menu,
  Drawer,
  List,
} from 'antd'
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { history, Link } from 'umi'
import MathJax from 'react-mathjax'

import UserAvatar from '@/components/UserAvatar'
import Markdown from '@/components/Markdown'
import CheckTag from '@/components/CheckTag'

// import './vue.css'
import './markdown.css'

const { CheckableTag } = Tag

const Content = props => {
  const {
    categories,
    tags,
    selectedTag,
    selectedCategory,
    checkTagHandle,
    checkCategorysHandle,
  } = props
  return (
    <div>
      <h4 style={{ marginBottom: 16 }}>分类</h4>
      <div>
        {/* {categories && <CheckTag checkTagHandle={checkTagHandle} data={categories} />} */}
        {categories &&
          categories.map(category => (
            <CheckableTag
              key={category.en_name}
              checked={category.id === selectedCategory}
              onChange={selected => checkCategorysHandle(category)}
            >
              {category.name}
            </CheckableTag>
          ))}
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
      <div>
        {tags &&
          tags.map(tag => (
            <CheckableTag
              key={tag.en_name}
              checked={tag.id === selectedTag}
              onChange={() => checkTagHandle(tag)}
            >
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
  )
}

const Write = props => {
  const {
    dispatch,
    categories,
    tags,
    title,
    markdown,
    drafts,
    selectedCategory,
    selectedTag,
    loading,
    match: {
      params: { key },
    },
  } = props

  const [visible, setVisible] = useState(false)
  // const [selectedCategory, setSelectedCategory] = useState(null)
  // const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'write/categories' })
      // dispatch({ type: 'article/tags' })
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({ type: 'write/draft', payload: { id: key } })
      }
    }
  }, [key])

  const onChangeMarkdown = e => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown: e.target.value },
      })
    }
  }

  const onChangeTitle = e => {
    if (dispatch) {
      dispatch({ type: 'write/setTitle', payload: { title: e.target.value } })
    }
  }

  const saveDraft = () => {
    if (dispatch) {
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({
          type: 'write/updateDraft',
          payload: { markdown, title, id: key },
        })
      } else {
        dispatch({
          type: 'write/saveDraft',
          payload: { markdown, title },
          callback: res => {
            if (res.status === 200) {
              history.push(`/write/draft/${res.data.id}`)
            }
          },
        })
      }
    }
  }

  const showDrawer = () => {
    if (dispatch) {
      dispatch({ type: 'write/drafts' })
    }
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const writeNew = () => {
    dispatch({
      type: 'write/setMarkdown',
      payload: { markdown: null },
    })
    dispatch({ type: 'write/setTitle', payload: { title: null } })
    history.push('/write/draft/new')
  }

  const checkTagHandle = tag => {
    if (dispatch) {
      dispatch({
        type: 'write/setSelecteTag',
        payload: { selectedTag: tag.id },
      })
    }
  }

  const checkCategorysHandle = category => {
    if (dispatch) {
      dispatch({
        type: 'write/setSelecteCategory',
        payload: { selectedCategory: category.id },
      })
      dispatch({ type: 'write/setTags', payload: { tags: category.tags } })
    }
    // setSelectedCategory(category.id)
  }

  const writeMenu = (
    <Menu className="mt-20">
      <Menu.Item key="0">
        <a onClick={writeNew}>写文章</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={showDrawer}>草稿箱</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to="/">回到首页</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <Row>
        <Col span={19}>
          <div style={{ height: 55 }}>
            <Input
              className="fw-700 h-55 ft-18 bdn tln"
              value={title}
              onChange={onChangeTitle}
              size="large"
              placeholder="请输入标题"
            />
          </div>
        </Col>
        <Col span={5} style={{ background: '#fff' }}>
          <Popover
            placement="bottom"
            // title={<strong>发布文章</strong>}
            content={
              <Content
                categories={categories}
                tags={tags}
                checkTagHandle={checkTagHandle}
                checkCategorysHandle={checkCategorysHandle}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
              />
            }
            overlayStyle={{ width: 300 }}
            trigger="click"
          >
            <Button type="link">
              发布
              <CaretDownOutlined />
            </Button>
          </Popover>
          <Button
            loading={loading}
            type="primary"
            className="mt-10 mr-20"
            onClick={saveDraft}
          >
            保存草稿
          </Button>
          <Dropdown overlay={writeMenu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <UserAvatar
                src={
                  'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png'
                }
              />
            </a>
          </Dropdown>
          {visible && (
            <Drawer title="草稿箱" onClose={onClose} visible={visible}>
              <List
                itemLayout="horizontal"
                dataSource={drafts}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <a
                          onClick={() => {
                            history.push(`/write/draft/${item.id}`)
                            onClose()
                          }}
                        >
                          {item.title}
                        </a>
                      }
                      description={`${moment(item.updatedAt).format(
                        'YYYY[年]MM[月]DD[日] HH:mm',
                      )}`}
                    />
                  </List.Item>
                )}
              />
            </Drawer>
          )}
        </Col>
      </Row>
      <Row style={{ borderTop: '1px solid #ccc' }}>
        <Col span={12}>
          <div
            style={{
              // height: 'auto',
              minHeight: 'calc(100vh - 56px)',
              // minHeight: 600,
              overflowY: 'auto',
              background: '#fff',
              borderRight: '1px solid #ccc',
            }}
          >
            <Input.TextArea
              style={{
                minHeight: 'calc(100vh - 60px)',
                border: 'none',
                outline: 'none',
                padding: 20,
                resize: 'none',
              }}
              placeholder="请输入Markdown"
              rows={27}
              onChange={onChangeMarkdown}
              value={markdown}
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              autoSize
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ height: '100%', background: '#fff', padding: 20 }}>
            <div className="markdown-body">
              <MathJax.Provider input="tex">
                <Markdown markdown={markdown} />
              </MathJax.Provider>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default connect(
  ({
    write: {
      title,
      markdown,
      drafts,
      categories,
      tags,
      selectedCategory,
      selectedTag,
    },
    loading,
  }) => ({
    categories,
    tags,
    title,
    markdown,
    drafts,
    selectedCategory,
    selectedTag,
    loading: loading.effects['write/updateDraft'],
  }),
)(Write)
