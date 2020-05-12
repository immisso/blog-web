/*
 * @Author: 柒叶
 * @Date: 2020-04-13 21:20:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-12 11:11:17
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
  Upload,
  Dropdown,
  Menu,
  Drawer,
  List,
  Affix,
  Modal,
  message,
  Tooltip,
} from 'antd'
import {
  CaretDownOutlined,
  PlusOutlined,
  EllipsisOutlined,
  PictureOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FullscreenOutlined,
  UploadOutlined,
  InboxOutlined,
  TableOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { history, Link } from 'umi'
import MathJax from 'react-mathjax'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import UserAvatar from '@/components/UserAvatar'
import Markdown from '@/components/Markdown'
import AliOssUpload from '@/components/AliOssUpload'
import storageHelper from '@/utils/storage'

// import './vue.css'
import './markdown.css'
import styles from './index.less'

const { CheckableTag } = Tag

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

const ImageModal = props => {
  const {
    imageModalVisible,
    closeImageModal,
    insertImageOk,
    returnImage,
    insertImageValue,
    insertImageValueChange,
  } = props

  // const a = {
  //   name: 'file',
  //   multiple: true,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange (info) {
  //     const { status } = info.file
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList)
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`)
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`)
  //     }
  //   }
  // }
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
      // footer={null}
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
  const inputEl = useRef(null)
  // const [selectedCategory, setSelectedCategory] = useState(null)
  // const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    if (!account.id) {
      const user = storageHelper.get('user')
      if (user && user.exp * 1000 > new Date().getTime()) {
        dispatch({ type: 'user/updateAccount', payload: user })
      } else {
        history.push('/login')
      }
    }
    if (dispatch) {
      dispatch({ type: 'write/categories' })
      // dispatch({ type: 'article/tags' })
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({ type: 'write/draft', payload: { id: key } })
      }
    }
    if (inputEl) {
      inputEl.current.focus()
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

  const showImageModal = () => {
    setImageModalVisible(true)
  }

  const closeImageModal = () => {
    setInsertImages([])
    setImageModalVisible(false)
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
        callback: res => {
          if (res.status === 200) {
            history.push('/')
          }
        },
      })
    }
  }

  const insertImageValueChange = e => {
    setInsertImageValue(e.target.value)
  }

  const insertImageOk = () => {
    let images = []
    if (insertImageValue) {
      images = [...insertImages, insertImageValue]
    }

    if (images.length > 0) {
      let str = ''
      images.length > 0 &&
        images.map(image => {
          str += `![](${image})`
        })
      if (dispatch) {
        dispatch({
          type: 'write/setMarkdown',
          payload: { markdown: markdown + str },
        })
      }
    }
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
  const addBold = () => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown: markdown + '**加粗**' },
      })
    }
  }

  const addItalic = () => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown: markdown + '*斜体*' },
      })
    }
  }

  const addTable = () => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: {
          markdown:
            markdown +
            '\n| Col1 | Col2 | Col3 |\n| :----: | :----: | :----: |\n| field1 | field2 | field3 |',
        },
      })
    }
  }
  const addLink = () => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: { markdown: markdown + '[描述](链接)' },
      })
    }
  }

  const addHeading = () => {
    if (dispatch) {
      dispatch({
        type: 'write/setMarkdown',
        payload: {
          markdown: markdown ? `${markdown}\n## 标题` : markdown + '## 标题',
        },
      })
    }
  }
  const onKeyEvent = (key, e) => {
    e.preventDefault()
    console.log('444444444444444444444444')
    console.log(key)
    switch (key) {
      case 'ctrl+b':
        addBold()
        break
      case 'ctrl+h':
        addHeading()
        break
      case 'ctrl+l':
        addLink()
        break
      case 'ctrl+alt+t':
        addTable()
        break
      case 'ctrl+i':
        showImageModal()
        break
      case 'ctrl+alt+i':
        addItalic()
        break
      default:
        break
    }
  }

  const fastMenu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={showImageModal}>
          <Tooltip title="图片" placement="left">
            <PictureOutlined />
          </Tooltip>
        </a>
      </Menu.Item>
      <Menu.Item key="bold">
        <a onClick={addBold}>
          <Tooltip title="加粗" placement="left">
            <BoldOutlined />
          </Tooltip>
        </a>
      </Menu.Item>
      {/* <Menu.Divider /> */}
      <Menu.Item key="italic">
        <a onClick={addItalic}>
          <Tooltip title="斜体" placement="left">
            <ItalicOutlined />
          </Tooltip>
        </a>
      </Menu.Item>
      <Menu.Item key="table">
        <a onClick={addTable}>
          <Tooltip title="表格" placement="left">
            <TableOutlined />
          </Tooltip>
        </a>
      </Menu.Item>

      <Menu.Item key="link">
        <a onClick={addLink}>
          <Tooltip title="链接" placement="left">
            <LinkOutlined />
          </Tooltip>
        </a>
      </Menu.Item>
      <Menu.Item key="heading">
        <a onClick={addHeading}>
          <Tooltip title="标题" placement="left">
            <svg
              t="1587646200731"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="18237"
              width="1em"
              height="1em"
            >
              <path
                d="M235.5 871.691v-740h98v304h385v-304h98v740h-98v-349h-385v349h-98z"
                p-id="18238"
                fill="#515151"
              ></path>
            </svg>
          </Tooltip>
        </a>
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
              ref={inputEl}
            />
          </div>
        </Col>
        <Col span={5} style={{ background: '#fff' }}>
          {/* <FullscreenOutlined /> */}
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
          <div style={{ position: 'absolute', right: 20, top: 10, zIndex: 10 }}>
            <Dropdown overlay={fastMenu} placement="bottomCenter" overlayStyle>
              <EllipsisOutlined style={{ fontSize: 25 }} />
            </Dropdown>
            {/* <span className="ml-10"><FullscreenOutlined style={{ fontSize: 20 }} /></span> */}
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
              ]}
              onKeyEvent={onKeyEvent}
            >
              <Input.TextArea
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
                rows={27}
                onChange={onChangeMarkdown}
                value={markdown}
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
