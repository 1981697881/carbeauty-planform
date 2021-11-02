export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),
  'project': () => import('@/views/basic/project'),

  'tickets': () => import('@/views/ticketing/tickets'),

  'advert': () => import('@/views/extension/advert'),
  'coupon': () => import('@/views/extension/coupon'),

  'memberInformation': () => import('@/views/member/memberInformation'),
  'groupExchange': () => import('@/views/member/groupExchange'),
  'recharge': () => import('@/views/member/recharge'),

  'users': () => import('@/views/system/users'),
  'paylog': () => import('@/views/system/paylog'),
  'wechatLog': () => import('@/views/system/wechatLog'),
  'about': () => import('@/views/system/about'),
  'journal': () => import('@/views/system/journal'),
  'notice': () => import('@/views/system/notice'),
}
