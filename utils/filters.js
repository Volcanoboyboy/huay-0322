import dateformat from 'dateformat'

/**
 * 价格处理
 */
export function priceFilter(val) {
  return val ? parseFloat(val).toFixed(2) : 0
}

/**
 * 格式化时间
 */
export function timeFormatFilter(val, format = 'yyyy-mm-dd HH:MM:ss') {
  return val ? dateformat(val * 1000, format) : ''
}

/**
 * 格式化时间
 */
export function timeFormatFilterMinute(val, format = 'yyyy-mm-dd HH:MM') {
  return val ? dateformat(val * 1000, format) : ''
}
