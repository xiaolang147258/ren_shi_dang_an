
// 统一身份认证生产环境 client_id:wybt

let baseURL = 'http://2949d3408t.qicp.vip'
// let baseURL = 'http://223.83.172.216'
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
    // production 生产环境
    baseURL = 'http://wg.jxyh.gov.cn:82'
  }
}
const iconfontVersion = ['font_1574193_z6kb1l8olc']
const iconfontUrl = `//at.alicdn.com/t/$key.css`
export default {
  key: 'ar-cloth',
  // 登录相关
  baseURL: baseURL, // 单点登录地址
  iconfontUrl,
  iconfontVersion
}
