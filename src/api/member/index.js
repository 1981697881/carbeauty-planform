import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 会员信息-获取列表
export function getMemberList(params, data) {
  const url = '/member/memberList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 账表统计-获取列表
export function getReportFormList(params, data) {
  const url = '/orderCar/reportForm/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 会员信息-充值列表
export function getRechargeList(params, data) {
  const url = '/logsRecharge/logsRechargeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 会员信息-消费列表
export function getOrderList(params, data) {
  const url = '/orderCar/orderList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 会员信息-会员卡列表
export function getVipList(params, data) {
  const url = '/vipCar/vipList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 会员信息-会员卡新增
export function addVip(data) {
  const url = '/vipCar/addVip'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}// 会员信息-会员卡充值
export function increaseRecharge(data) {
  const url = '/vipCar/increaseRecharge'
  return request({
    url: url,
    headers: {
      'authorization': getToken('cinerx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
