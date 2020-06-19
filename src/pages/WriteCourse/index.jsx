/*
 * @Author: 柒叶
 * @Date: 2020-05-21 09:51:22
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 13:05:03
 */
import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Drawer,
  Layout,
  Tree,
  Space,
  Button,
  Divider,
  Input,
} from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import styles from './index.less'
const { Header, Footer, Sider, Content } = Layout
const { TreeNode } = Tree
const Course = props => {
  return (
    <div className={styles.courseEditor}>
      <div className={styles.courseWrapper}>
        <div className={styles.courseHeaderContainer}>
          <div>
            <MenuOutlined />
          </div>
          <div>
            <Space size="large">
              <span>预览</span>
              <span>保存</span>
            </Space>
          </div>
        </div>
        <div>
          <Input
            className="fw-700 h-55 ft-18 bdn tln"
            // value={title}
            // onChange={onChangeTitle}
            size="large"
            placeholder="请输入标题"
            // ref={inputRef}
            style={{ background: 'inherit' }}
          />
        </div>
        <Divider />
      </div>
    </div>
    // <Layout>
    //   <Sider
    //     className={styles.courseSider}
    //     theme="light"
    //     width={250}
    //     collapsible={true}
    //     collapsedWidth={0}
    //   >
    //     <Tree
    //       // showLine
    //       // switcherIcon={<DownOutlined />}
    //       defaultExpandedKeys={['0-0-0']}
    //       // onSelect={this.onSelect}
    //       className={`${styles.menuTree} ft-13`}
    //     >
    //       <TreeNode title="前言" key="000"/>
    //       <TreeNode title="第一章" key="0-0-0">
    //         <TreeNode title="leaf" key="0-0-0-0" />
    //         <TreeNode title="leaf" key="0-0-0-1" />
    //         <TreeNode title="leaf" key="0-0-0-2" />
    //       </TreeNode>
    //       <TreeNode title="第二章" key="0-0-1"/>
    //       <TreeNode title="第三章" key="0-0-2">
    //         <TreeNode title="leaf" key="0-0-2-0" />
    //         <TreeNode title="leaf" key="0-0-2-1" />
    //       </TreeNode>
    //     </Tree>
    //   </Sider>
    //   <Layout>
    //     <Header style={{ backgroundColor: '#eeeeee' }}>Header</Header>
    //     <Content>Content</Content>
    //   </Layout>
    // </Layout>
  )
}

export default Course
