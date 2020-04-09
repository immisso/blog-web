/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:53:08
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-07 12:53:50
 */

import { extend } from 'umi-request';

const request = extend({
  // errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
