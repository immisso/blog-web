/*
 * @Author: 柒叶
 * @Date: 2020-04-05 11:41:31
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-09 21:24:32
 */

import React, { useEffect } from 'react';
import { Layout, Card } from 'antd';
import { connect } from 'dva';
import Header from '@/components/common/Header';
import SiderList from '@/components/SiderList';
import styles from './index.less';

const { Content } = Layout;

const Home = props => {
  const { dispatch, hots } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/hot' });
    }
  }, []);
  return (
    <>
      <Header />
      <Content className={styles.homeContainer}>
        <div className={styles.homeContainerWrapper}>
          <div className={styles.homeContainerList}>{props.children}</div>
          <div className={styles.homeContainerSiderlist}>
            <Card size="small" bordered={false} title="热门文章">
              <SiderList
                dataSource={hots}
                bordered={false}
                size="small"
                split={false}
              />
            </Card>
            <div className="mt-10 ft-13 pl-10">
              <div className={styles.aboutColor}>
                <span className="mr-5">友情链接</span>
                <a href="http://www.scxingm.cn/">www.scxingm.cn</a>
              </div>
              <div className={styles.aboutColor}>蜀ICP备16032900号-2</div>
              <div className={styles.aboutColor}>©2019 柒叶 Create by QiYe</div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

// export default Home

export default connect(({ article: { hots }, loadding }) => ({
  hots,
  loadding,
}))(Home);
