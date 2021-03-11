
/* eslint-disable */
/**
 *  获取url上的参数
 * @param {string} name 
 */
export const getUrlParam = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 添加对应名称的cookie
 * @param name cookie的名称
 * @param value cookie的值 
 * @returns {null} 不存在时，返回null
 */
export const setCookie = function (name, value) {
  clearCookie(name);
  if (name && value) {
    var cookie = name + '=' + value;
    document.cookie = cookie;
    return cookie;
  } else {
    return null;
  }
}

/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
export const getCookie = function (name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

/**
 * 清除特定name的cookie
 */
export const clearCookie = function (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}
/**
 * 生成随机字符串
*/
export const randomStr = function (len) {
  var result = '',
    charts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  len = len || 20
  while (len--) {
    result += charts[Math.ceil(Math.random() * charts.length - 1)]
  }
  return result
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
/**
 * 清除 所有cookie
 */
export const clearAllCookie = function (name) {
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
  if (keys) { 
  for (var i = keys.length; i--;) 
  document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
  } 
}
/**
 * ios软键盘顶起页面后隐藏不回弹
 */
export const temporaryRepair = function () {
  let u = navigator.userAgent
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let isWebcgat = /MicroMessenger/i.test(navigator.userAgent)
  if(isIOS&&isWebcgat){
    let currentPosition,timer;
    let speed=1;//页面滚动距离
    timer=setInterval(function(){
        currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition-=speed; 
        window.scrollTo(0,currentPosition);//页面向上滚动
        currentPosition+=speed; //speed变量
        window.scrollTo(0,currentPosition);//页面向下滚动
        clearInterval(timer);
    },1);
  }
}
/**
 * 计算字符串长度(英文占1个字符，中文汉字占2个字符)
 */
export const strlen = function (str) {
  let len = 0;
  for (let i=0; i<str.length; i++) { 
    let c = str.charCodeAt(i); 
  //单字节加1 
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
      len++; 
    } 
    else { 
    len+=2; 
    } 
  } 
  return len;
}


/**
 * 事件防抖
 */
export const debounce = function(fn, time) {
  let timeout = null;
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  }
}
/**
 * 替换指定传入参数的值,paramName为参数
 */
export const  replaceParamVal = function (paramName,replaceWith) {
  let oUrl = window.location.href.toString();
  let re=eval('/('+ paramName+'=)([^&]*)/gi');
  let nUrl = oUrl.replace(re,paramName+'='+replaceWith);
  return nUrl
}
/**
 * 替换指定路由
 * @param {newRoute-指定路由}
 */
export const  replaceRouteVal = function (newRoute) {
  let oUrl = window.location.href.toString();
  let arr = oUrl.split('#')
  let nUrl = arr[0]+'#' + newRoute
  return nUrl
}

/**
 * 添加 script 文件
 */
export function addScriptJs (url, id) {
  var hasBuildScript = document.getElementById(id)
  if(!hasBuildScript){
    let script = document.createElement("script")
    script.type = "text/javacript"
    script.src = url
    script.id = id
    document.getElementsByTagName('head')[0].appendChild(script)
  }
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