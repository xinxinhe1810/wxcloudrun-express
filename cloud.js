const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
console.log('cloud', cloud)
exports.main = async (event, context) => {
  return await cloud.openapi.security.msgSecCheck-v1({ content:"安全检查测试文本" })
}