/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 21:45:41
 * @LastEditTime: 2019-08-11 11:18:36
 * @LastEditors: Please set LastEditors
 */
/**
 * 版本比较
 */
export const versionDiff = function (curV, reqV) {
  if (!curV) {
    return false
  }
  var arr1 = curV.split('.')
  var arr2 = reqV.split('.')
  // 将两个版本号拆成数字
  var minL = Math.min(arr1.length, arr2.length)
  var pos = 0 // 当前比较位
  var diff = 0 // 当前为位比较是否相等

  // 逐个比较如果当前位相等则继续比较下一位
  while (pos < minL) {
    diff = parseInt(arr1[pos]) - parseInt(arr2[pos])
    if (diff !== 0) {
      break
    }
    pos++
  }

  if (diff >= 0) { // 新版本
    console.log('新版本')
    return true
  } else {
    console.log('旧版本')
    return false
  }
}
