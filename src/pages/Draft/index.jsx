/*
 * @Author: 柒叶
 * @Date: 2020-05-20 17:30:58
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 07:47:15
 */
import React, { useEffect } from 'react'
import { Card, List, Skeleton, Tag, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import Header from '@/components/Header'
import styles from './index.less'

const Draft = props => {
  const { dispatch, drafts, loading, account, history } = props
  useEffect(() => {
    if (!account || !account.id) {
      history.push('/login')
    }
    if (dispatch) {
      dispatch({ type: 'write/drafts' })
    }
  }, [])

  const deleteDraft = id => {
    if (dispatch) {
      dispatch({ type: 'write/deleteDraft', payload: { id } })
    }
  }
  return (
    <>
      <Header />
      <div className={styles.homeContainer}>
        <Card bordered={false}>
          <List
            loading={loading}
            dataSource={drafts}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item
                actions={[
                  <Link key="draft-edit" to={`/write/draft/${item.id}`}>
                    编辑
                  </Link>,
                  <Popconfirm
                    key="draft-delete"
                    title="你确定要删除吗？"
                    onConfirm={() => deleteDraft(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Link to={`/write/draft/${item.id}`}>
                        <strong>{item.title}</strong>
                        {item.is_publish ? (
                          <Tag color="success" className="ml-10">
                            已发表
                          </Tag>
                        ) : null}
                      </Link>
                    }
                    description={`上次修改于${moment(item.updatedAt).format(
                      'YYYY[年]MM[月]DD[日] HH:mm',
                    )}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          ></List>
        </Card>
      </div>
    </>
  )
}

export default connect(({ write: { drafts }, user: { account }, loading }) => ({
  drafts,
  account,
  loading: loading.effects['write/drafts'],
}))(Draft)
