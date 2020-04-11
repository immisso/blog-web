/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:58:34
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-10 07:15:05
 */

import { stringify } from 'qs';
import request from '@/utils/request';

// 获取分类

export async function getCategories() {
  return request('/api/categories');
}

// 获取文章列表
export async function getArticles() {
  return request('/api/articles');
}

// 获取热门文章列表
export async function getHotArticles() {
  return request('/api/hot');
}

// 获取文章详情
export async function getArticleDetail(params) {
  return request(`/api/detail?${stringify(params)}`);
}
