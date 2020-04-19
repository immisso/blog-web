/*
 * @Author: 柒叶
 * @Date: 2020-04-07 12:58:34
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-19 10:59:59
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

// 更新draft
export async function updateDraft(data) {
  return request('/api/update/draft', {
    method: 'POST',
    data,
  })
}
