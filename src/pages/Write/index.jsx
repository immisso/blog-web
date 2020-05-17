/*
 * @Author: 柒叶
 * @Date: 2020-04-13 21:20:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-17 19:25:16
 */

import React, { useState, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'dva'
import moment from 'moment'
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Dropdown,
  Menu,
  Drawer,
  List,
  Modal,
  Table,
} from 'antd'
import {
  CaretDownOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { history, Link } from 'umi'
import MathJax from 'react-mathjax'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import UserAvatar from '@/components/UserAvatar'
import Markdown from '@/components/Markdown'
import AliOssUpload from '@/components/AliOssUpload'

import styles from './index.less'

const { CheckableTag } = Tag
const { TextArea } = Input

const Content = props => {
  const {
    categories,
    tags,
    selectedTag,
    selectedCategory,
    checkTagHandle,
    checkCategorysHandle,
    onPublish,
    returnCoverImageUrl,
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
        <AliOssUpload type="click" returnImageUrl={returnCoverImageUrl} />
      </div>
      <div className="mt-20 tc">
        <Button type="primary" onClick={onPublish}>
          发布文章
        </Button>
      </div>
    </div>
  )
}

const ShortCutKey = () => {
  const columns = [
    {
      title: 'Markdown',
      dataIndex: 'markdown',
      key: 'markdown',
    },
    {
      title: '说明',
      dataIndex: 'explain',
      key: 'explain',
    },
    {
      title: '快捷键',
      dataIndex: 'keybord',
      key: 'keybord',
    },
  ]
  const dataSource = [
    {
      markdown: '## 标题',
      explain: 'H2',
      keybord: 'Ctrl / ⌘ + H',
    },
    {
      markdown: '**文本**',
      explain: '加粗',
      keybord: 'Ctrl / ⌘ + B',
    },
    {
      markdown: '*文本*',
      explain: '斜体',
      keybord: 'Ctrl / ⌘ + Alt + I',
    },
    {
      markdown: '[描述](链接)',
      explain: '链接',
      keybord: 'Ctrl / ⌘ + L',
    },
    {
      markdown: '![描述](链接)',
      explain: '插入图片',
      keybord: 'Ctrl / ⌘ + I',
    },
    {
      markdown: '> 引用',
      explain: '引用',
      keybord: 'Ctrl / ⌘ + Q',
    },
    {
      markdown: '```code```',
      explain: '代码块',
      keybord: 'Ctrl / ⌘ + Alt + C',
    },
    {
      markdown: '`code`',
      explain: '行代码块',
      keybord: 'Ctrl / ⌘ + Alt + K',
    },
    {
      markdown: '省略',
      explain: '表格',
      keybord: 'Ctrl / ⌘ + Alt + T',
    },
  ]
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
    />
  )
}

const ImageModal = props => {
  const {
    imageModalVisible,
    closeImageModal,
    insertImageOk,
    returnImage,
    insertImageValue,
    insertImageValueChange,
  } = props

  return (
    <Modal
      title="插入图片"
      okText="确定"
      cancelText="取消"
      width={350}
      closable={false}
      destroyOnClose={true}
      onCancel={closeImageModal}
      visible={imageModalVisible}
      onOk={insertImageOk}
    >
      <AliOssUpload type="drag" returnImageUrl={returnImage} />
      <p className="tc mt-10">或</p>
      <Input
        placeholder="输入网络图片地址"
        size="large"
        value={insertImageValue}
        prefix={<PictureOutlined />}
        style={{ border: '1px solid #ccc' }}
        onChange={insertImageValueChange}
      />
    </Modal>
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
    account,
    loading,
    match: {
      params: { key },
    },
  } = props

  const [visible, setVisible] = useState(false)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState(null)
  const [insertImages, setInsertImages] = useState([])
  const [insertImageValue, setInsertImageValue] = useState(null)
  const inputRef = useRef()
  const textAreaRef = useRef()

  useEffect(() => {
    if (!account || !account.id) {
      history.push('/login')
    }
    if (dispatch) {
      dispatch({ type: 'write/categories' })
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({ type: 'write/draft', payload: { id: key } })
      } else {
        dispatch({ type: 'write/setMarkdown', payload: { markdown: null } })
        dispatch({ type: 'write/setTitle', payload: { title: null } })
      }
    }
    if (inputRef) {
      inputRef.current.focus()
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

  const showImageModal = () => {
    setImageModalVisible(true)
  }

  const closeImageModal = () => {
    setInsertImages([])
    setImageModalVisible(false)
  }

  const writeNew = () => {
    dispatch({ type: 'write/setMarkdown', payload: { markdown: null } })
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
  }

  const onPublish = () => {
    if (dispatch) {
      dispatch({
        type: 'write/publish',
        payload: {
          markdown,
          title,
          selectedTag,
          selectedCategory,
          coverImageUrl,
          html: ReactDOMServer.renderToString(
            <MathJax.Provider input="tex">
              <Markdown markdown={markdown} />
            </MathJax.Provider>,
          ),
        },
      })
    }
  }

  const insertImageValueChange = e => {
    setInsertImageValue(e.target.value)
  }

  const insertImageOk = () => {
    let images = [...insertImages]
    if (insertImageValue) {
      images = [...images, insertImageValue]
    }

    if (images.length > 0) {
      const str = images.map(image => `![](${image})`).join('\n')
      setMarkdown(textAreaRef.current.resizableTextArea.textArea, str)
    }
    setImageModalVisible(false)
  }

  const returnImage = imageUrl => {
    setInsertImages([...insertImages, imageUrl])
  }

  const returnCoverImageUrl = imageUrl => {
    setCoverImageUrl(imageUrl)
  }

  const writeMenu = (
    <Menu className="mt-20">
      <Menu.Item key="0">
        <a onClick={writeNew}>新文章</a>
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

  const setMarkdown = (el, data, start, num) => {
    if (dispatch) {
      const { selectionStart, selectionEnd } = el
      dispatch({
        type: 'write/setMarkdown',
        payload: {
          markdown: [
            markdown.substring(0, selectionStart),
            data,
            markdown.substring(selectionEnd),
          ].join(''),
        },
      })
      el.focus()
      el.setSelectionRange(selectionStart + start, selectionStart + start + num)
    }
  }

  const addBold = el => {
    setMarkdown(el, '**加粗**', 2, 2)
  }
  const addItalic = el => {
    setMarkdown(el, '*斜体*', 1, 2)
  }
  const addImage = el => {
    setMarkdown(el, '![描述](链接)', 6, 2)
  }
  const addLink = el => {
    setMarkdown(el, '[描述](链接)', 5, 2)
  }
  const addCode = el => {
    setMarkdown(el, '\n```\n```', 4, 0)
  }
  const addLineCode = el => {
    setMarkdown(el, '``', 1, 0)
  }
  const addQuote = el => {
    setMarkdown(el, '\n> 引用', 3, 2)
  }
  const addTable = el => {
    setMarkdown(
      el,
      '\n\n| Col1 | Col2 | Col3 |\n| :----: | :----: | :----: |\n| field1 | field2 | field3 |\n',
      4,
      4,
    )
  }
  const addHeading = el => {
    let title = '## 标题'
    let start = 3
    if (markdown) {
      title = '\n## 标题'
      start = 4
    }
    setMarkdown(el, title, start, 2)
  }

  const onKeyEvent = (key, e) => {
    e.preventDefault()
    switch (key) {
      case 'ctrl+b':
        addBold(e.target)
        break
      case 'ctrl+h':
        addHeading(e.target)
        break
      case 'ctrl+l':
        addLink(e.target)
        break
      case 'ctrl+alt+t':
        addTable(e.target)
        break
      case 'ctrl+i':
        addImage(e.target)
        break
      case 'ctrl+q':
        addQuote(e.target)
        break
      case 'ctrl+alt+i':
        addItalic(e.target)
        break
      case 'ctrl+alt+c':
        addCode(e.target)
        break
      case 'ctrl+alt+k':
        addLineCode(e.target)
        break
      default:
        break
    }
  }

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
              ref={inputRef}
            />
          </div>
        </Col>
        <Col span={5} style={{ background: '#fff' }}>
          <Popover
            placement="bottom"
            title={<strong>快捷键</strong>}
            overlayStyle={{ width: 350 }}
            content={<ShortCutKey />}
          >
            <QuestionCircleOutlined />
          </Popover>
          <Popover
            placement="bottom"
            title={<strong>发布文章</strong>}
            content={
              <Content
                categories={categories}
                tags={tags}
                checkTagHandle={checkTagHandle}
                checkCategorysHandle={checkCategorysHandle}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onPublish={onPublish}
                returnCoverImageUrl={returnCoverImageUrl}
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
              <UserAvatar src={account.avatar} />
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
                          {item.is_publish ? (
                            <Tag color="success" className="ml-10">
                              已发表
                            </Tag>
                          ) : null}
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
          <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 10 }}>
            <Button type="link" onClick={showImageModal}>
              <PictureOutlined className="ft-20" />
            </Button>
          </div>
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
            <KeyboardEventHandler
              handleKeys={[
                'ctrl+b',
                'ctrl+l',
                'ctrl+h',
                'ctrl+alt+t',
                'ctrl+i',
                'ctrl+alt+i',
                'ctrl+alt+c',
                'ctrl+alt+k',
                'ctrl+q',
              ]}
              onKeyEvent={onKeyEvent}
            >
              <TextArea
                style={{
                  // minHeight: 'calc(100vh - 60px)',
                  border: 'none',
                  outline: 'none',
                  padding: 20,
                  resize: 'none',
                }}
                className={styles.textareScroll}
                selectiontext="我们"
                placeholder="请输入Markdown"
                rows={3}
                onChange={onChangeMarkdown}
                value={markdown}
                ref={textAreaRef}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoSize
              />
            </KeyboardEventHandler>
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
      <ImageModal
        imageModalVisible={imageModalVisible}
        closeImageModal={closeImageModal}
        insertImageOk={insertImageOk}
        returnImage={returnImage}
        insertImageValue={insertImageValue}
        insertImageValueChange={insertImageValueChange}
      />
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
    user: { account },
    loading,
  }) => ({
    categories,
    tags,
    title,
    markdown,
    drafts,
    selectedCategory,
    selectedTag,
    account,
    loading: loading.effects['write/updateDraft'],
  }),
)(Write)
