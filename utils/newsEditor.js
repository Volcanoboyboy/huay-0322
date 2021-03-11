/**
 * 过滤img标签style属性中的背景图样式
 */
export const filterImgStyleBackground = (contentp) => {
  let regexp1 = new RegExp(/(\<img )([^>]*)(background-image:)([^"]*\)[;\s]*)([^>]*)(\>)/, 'g')
  contentp = contentp.replace(regexp1, function (match, p1, p2, p3, p4, p5, p6) {
    return p1 + p2 + p5 + p6
  })
  return contentp
}

/**
 * 处理编辑器文本中data-src属性与src属性的关系
 */
export const changeImgDatasrcToSrc = (contentp) => {
  let regexp1 = new RegExp(/(\<img )([^>]*)(\>)/, 'g')

  let dataSrcGroupReg = /data-src\s?=\s?"\S*"/g
  contentp = contentp.replace(regexp1, function (match, p1, p2, p3) {
    if(p2.indexOf(" src")==-1&&p2.indexOf(" data-src")!=-1){
      // 有data-src属性但没有src属性，则将src替换data-src
      return p1 + p2.replace("data-src","src")+p3
    } else if(p2.indexOf(" src")!=-1&&p2.indexOf(" data-src")!=-1){
      // 有data-src属性也有src属性，则删除data-src属性
      return p1 + p2.replace(dataSrcGroupReg, '') + p3
    } else {
      return p1 + p2 + p3
    }
    
  })
  return contentp
}