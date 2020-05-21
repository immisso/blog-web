/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:58:34
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-21 07:25:11
 */

import { stringify } from 'qs'
import request from '@/utils/request'

// 保存draft
export async function createDraft(data) {
  return request('/api/create/draft', {
    method: 'POST',
    data,
  })
}

// 获取 draft
export async function getDraft(params) {
  return request(`/api/draft?${stringify(params)}`)
}

// 获取drafts
export async function getDrafts() {
  return request('/api/drafts')
}

// 更新draft
export async function updateDraft(data) {
  return request('/api/update/draft', {
    method: 'POST',
    data,
  })
}

// 删除draft
export async function deleteDraft(data) {
  return request('/api/delete/draft', {
    method: 'POST',
    data,
  })
}

// 获到标签和分类
export async function getCategories() {
  return request('/api/categories')
}

// 发布文章
export async function createPublish(data) {
  return request('/api/create/publish', {
    method: 'POST',
    data,
  })
}
