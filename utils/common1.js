import { type } from "os";
import storage from 'storejs'

/**
 * 判断是否图片格式
 */
export const isImage = (url) => {
  if (!url) {
    return false
  }
  return url.match(/.(jpe?g|png|svg|gif)/) !== null
}
/** 下载文本内容
 * @param {filename 下载到系统中的文件名称}
 * @param {fileUrl 需要下载的文本或字符串内容}
 */
export const funDownload = (filename,fileUrl) => {
  // 创建隐藏的可下载链接
  const elLink = document.createElement('a');
  elLink.download = filename;
  elLink.style.display = 'none';
  // 添加下载链接
  elLink.href = fileUrl;
  // 触发点击
  document.body.appendChild(elLink);
  elLink.click();
  // 然后移除
  document.body.removeChild(elLink);
}

export function deepCopy(obj) {
  let temp = obj.constructor === Array ? [] : {}
  for (let val in obj) {
    if (Object.prototype.toString.call(obj[val]) === '[object Object]' || Object.prototype.toString.call(obj[val]) === '[object Array]') {
       temp[val] = deepCopy(obj[val])
    } else {
      temp[val] = obj[val]
    }

  }
  return temp
}
/**根据频道ID获取对应频道obj
 * @param {int} catid 频道ID
 * @returns {obj} channelInfo
 */
export function getChannelInfo(catid){
  let channelList = storage("channelList")
  let channelInfo = {}
  channelList.forEach(item=>{
    if(item.catid == catid){
      channelInfo = item
    }
  })
  return channelInfo
}
/**根据菜单ID获取对应菜单obj
 * @param {int} type 类型【0-目录,1-菜单,2-按钮】
 * @param {int} menuId 菜单ID
 * @returns {obj} menuInfo
 */
export function getMenuObjInfo({type,menuId}){
  let menuList = storage("menuList")
  let menuInfo = {}
  menuList.forEach(item=>{
    if(type===1){
      if(item.menuId == menuId){
        menuInfo = item
      }
    }else if(type===2){
      if(item.children){
        item.children.forEach(sonItem=>{
          if(sonItem.menuId===menuId){
            menuInfo = sonItem
          }
        })
      }
    }

  })
  return menuInfo
}


/**
 * 获取一个指定长得的不重复id
 * @param randomLength
 * @returns {string}
 * @constructor
 */
export function generateUUID(){
  return Number(Math.random().toString().substr(3,4) + Date.now()).toString(36)
}

/**
 * 添加 link 文件
 * @param href
 */
export function addLinkCss(href,id) {
  var isHasSameLinkId = false
  for (const item of document.getElementsByTagName('link')) {
    if (item.hasOwnProperty('id')&&item.id==id) {
      isHasSameLinkId=true
      
    }
  }
  if(!isHasSameLinkId){
    let link = document.createElement("link")
    link.rel = "stylesheet"
    link.href =  href
    link.id = id
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  
}

/**
 * 删除 link 文件
 */
export function removeLinkCss (ids) {
  return new Promise(resolve => {
    let links = document.getElementsByTagName("link")
    let attr = []
    for (let i = 0; i <= links.length; i++) {
      if (links[i] && links[i].id && ids.indexOf(links[i].id) !== -1) {
        attr.push(links[i])
      }
    }
    attr.forEach(v => {
      document.getElementsByTagName('head')[0].removeChild(v)
    })
    resolve()
  })

}

/**
 * 添加 script 文件
 */
export function addScriptJs (url, id) {
  let script = document.createElement("script")
  script.type = "text/javacript"
  script.src = url
  script.id = id
  document.getElementsByTagName('head')[0].appendChild(script)
}

/**
 * 删除 script 文件
 */
export function removeScriptJs (idList) {
  return new Promise(resolve => {
    let scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i] && scripts[i].id && idList.indexOf(scripts[i].id) !== -1) {
        scripts[i].parentNode.removeChild(scripts[i])
        console.log(scripts[i].id)
      }
    }
    resolve()
  })
}

/*
 * 将一个百数组分成几个同等长度度回的数组
 * array[分割答的原数组]
 * size[每个子数组的长度]
 */
export function copyBatchesArray(array, size) {
  let result = []
  for (var x = 0; x < Math.ceil(array.length / size); x++) {
      var start = x * size;
      var end = start + size;
      result = result.concat(array.slice(start, end));
  }
  return result;
}

/* 改变数组中值的类型
 * 
 * array[原数组]
 * changeType[将要转换的类型，'toString'-转换成字符串,'toNumber'-转换成整型]
 */
export function ArrayItemChangeType(array,changeType) {
  let result = []
  array.forEach(item=>{
    if(changeType==='toString'){
      result.push(String(item))
    }else if(changeType==='toNumber'){
      result.push(Number(item))
    }else{
      result.push(item)
    }
    
  })
  return result;
}

/** input/textarea获取光标位置
 * @param {Object} element-input/textarea对象
 */
export function getPosition(element){
  let cursorPos = 0;
  if (document.selection) {//IE
    let selectRange = document.selection.createRange();
    selectRange.moveStart('character', -element.value.length);
    cursorPos = selectRange.text.length;
  } else if (element.selectionStart || element.selectionStart == '0') {
    cursorPos = element.selectionStart;
  }
  return cursorPos;
}

/** 输入框高度自适应
 * @param {String} Dom元素id
 * @param {Number} minRow-最小行数
 * @param {Number} maxRow-最大行数，超过则出现滚动条
*/
export function ResizeTextarea(elId,minRow,maxRow){
  var t = document.getElementById(elId);
  if (t.scrollTop == 0) t.scrollTop = 1;
  while (t.scrollTop == 0) {
    if(t.rows > minRow)
      t.rows--;
    else
      break;
    t.scrollTop = 1;
    if (t.rows < maxRow)
      t.style.overflowY = "hidden";
    if (t.scrollTop > 0) {
      t.rows++;
      break;
    }
  }
  while (t.scrollTop > 0) {
    if(t.rows < maxRow) {
      t.rows++;
      if (t.scrollTop == 0) t.scrollTop = 1;
    }else {
      t.style.overflowY = "auto";
      break;
    }
  }
}
/** 生成guid */
export const createUuid = function () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  // localStorage.setItem("uuid", uuid)
  console.log(uuid)
  return uuid
}