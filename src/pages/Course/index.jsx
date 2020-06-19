/*
 * @Author: 柒叶
 * @Date: 2020-05-21 09:51:22
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 10:50:31
 */
import React, { useState, useEffect } from 'react'
import { Cow, Col, Drawer, Layout, Tree } from 'antd'
import styles from './index.less'
const { Header, Footer, Sider, Content } = Layout
const { TreeNode } = Tree
const Course = props => {
  return (
    <Layout>
      <Sider
        className={styles.courseSider}
        theme="light"
        width={250}
        collapsible={true}
        collapsedWidth={0}
      >
        <Tree
          // showLine
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          // onSelect={this.onSelect}
          className={`${styles.menuTree} ft-13`}
        >
          <TreeNode title="前言" key="000" />
          <TreeNode title="第一章" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
            <TreeNode title="leaf" key="0-0-0-2" />
          </TreeNode>
          <TreeNode title="第二章" key="0-0-1" />
          <TreeNode title="第三章" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </Tree>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  )
}

export default Course
