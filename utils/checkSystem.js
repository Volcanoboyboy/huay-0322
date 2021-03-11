
export default function system () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isIOS) {
    return 'ios'
  } else if (isAndroid) {
    return 'android'
  } else {
    return 'pc'
  }
}
