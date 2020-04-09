/*
 * @Author: 柒叶
 * @Date: 2020-04-08 07:37:50
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-09 07:33:31
 */

import React from 'react';
import { List } from 'antd';
import { Link } from 'umi';

const SiderList = props => {
  // eslint-disable-next-line react/prop-types
  const { dataSource, bordered, size, split } = props;
  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      // bordered={bordered}
      size={size}
      split={split}
      renderItem={item => (
        <List.Item
          actions={[
            <span style={{ fontSize: 13 }} key="111">
              {/* <Icon
              type="eye"
              theme="outlined"
            /> */}
              阅读
              <span className="pl-5 pointer">{item.view}</span>
            </span>,
          ]}
        >
          <Link
            to={`/article/${item.id}`}
            style={{ color: '#000000a6' }}
            target="_block"
          >
            {item.title}
          </Link>
        </List.Item>
      )}
    />
  );
};

export default SiderList;
