/*
 * @Author: 柒叶
 * @Date: 2020-04-29 18:04:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-29 18:07:25
 */
import { stringify } from 'qs'
import request from '@/utils/request'

// 获取评论

export async function getComments() {
  return request('/api/admin/comments')
}
