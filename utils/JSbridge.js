/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 11:03:15
 * @LastEditTime: 2019-09-23 10:38:54
 * @LastEditors: Please set LastEditors
 */
/* eslint-disable */
var u = navigator.userAgent
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
var isWeChat = /MicroMessenger/i.test(navigator.userAgent)
import store from "./../store";
import { versionDiff } from "./versionDiff";

/**
 * 设置分享相关信息
 * @param {Object} obj
 * @param {String} obj.title - 分享标题
 * @param {String} obj.desc - 分享描述
 * @param {String} obj.link - 分享链接
 * @param {String} obj.imgUrl - 分享的图片链接
 */
export const setShareInfo = (obj, callback) => {
  console.log(obj)
  // 0是隐藏，1是显示
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'setShareInfo', {
          title: obj.title,
          brief: obj.desc,
          shareUrl: obj.link,
          shareImg: obj.imgUrl,
        },
        (responseData) => {
          console.log(responseData);
          callback(true);
        },
      );
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => {
          window.WebViewJavascriptBridge.callHandler(
            'setShareInfo', {
              title: obj.title,
              brief: obj.desc,
              shareUrl: obj.link,
              shareImg: obj.imgUrl,
            },
            (responseData) => {
              console.log(responseData);
              callback(true);
            },
          );
        },
        false,
      );
    }
  } else if (isIOS) {
    console.log('ios',obj)
    if (!/MicroMessenger/i.test(navigator.userAgent)) { // 
      console.log('进入到ios APP')
      var hasBuildScript = document.getElementById('IOS_getShareInfoOC')
      if (hasBuildScript) {
        document.body.removeChild(hasBuildScript)
        var scriptTitle = document.createElement('script')
        scriptTitle.id = 'IOS_getShareInfoOC'
        scriptTitle.innerHTML =  'try{window.webkit.messageHandlers.getShareInfoOC.postMessage({title:"' + obj.title + '",brief:"' + obj.desc + '",shareUrl:"' + obj.link + '",shareImage:"' + obj.imgUrl + '"});}catch(e){}'          
        document.body.appendChild(scriptTitle)
      } else {
        var scriptTitle = document.createElement('script')
        scriptTitle.id = 'IOS_getShareInfoOC'
        scriptTitle.innerHTML =  'try{window.webkit.messageHandlers.getShareInfoOC.postMessage({title:"' + obj.title + '",brief:"' + obj.desc + '",shareUrl:"' + obj.link + '",shareImage:"' + obj.imgUrl + '"});}catch(e){}'
        document.body.appendChild(scriptTitle)
      }
      window.location.href = `share://a.com?url=${obj.link}&=&title=${obj.title}&=&brief=${obj.desc}&=&image=${obj.imgUrl}`;
    }
  } else {
    console.log('pc');
  }
};


/**
 * 调起APP登录，IOS有游客模式，因此只对iOS做登录
 */
export const appLogin = () => {
  // true 隐藏 false 显示
  if (isAndroid) {
    console.log('android');
  } else if (isIOS) {
    // 检测是已创建script
    const hasToLoginScript = document.getElementById('IOS_toLogin');

    if (hasToLoginScript) {
      document.body.removeChild(hasToLoginScript);
      const scriptTologin = document.createElement('script');
      scriptTologin.id = 'IOS_toLogin';
      scriptTologin.innerHTML = 'try {window.webkit.messageHandlers.goToLogin.postMessage({});}catch(e){}';

      document.body.appendChild(scriptTologin);
    } else {
      const scriptTologin = document.createElement('script');
      scriptTologin.id = 'IOS_toLogin';
      scriptTologin.innerHTML = 'try{window.webkit.messageHandlers.goToLogin.postMessage({});}catch(e){}';

      document.body.appendChild(scriptTologin);
    }
  } else {
    console.log('pc');
  }
};


/**
 * 设置顶部标题文字
 */
export const setTitle = (tit) => {
  // 0是隐藏，1是显示

  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'setTitle', {
          'title': tit
        },
        function (responseData) {
          console.log(responseData)
          window.alert('success')
        }
      )
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          window.WebViewJavascriptBridge.callHandler(
            'setTitle', {
              'title': tit
            },
            function (responseData) {
              console.log(responseData)
              window.alert('success')
            }
          )
        },
        false
      )
    }
  } else if (isIOS) {
    if (isWeChat) {
      
    } else {
      /* console.log('新版本的设置标题')
        var hasBuildScript = document.getElementById('IOS_setTitle')
    
        if (hasBuildScript) {
          document.body.removeChild(hasBuildScript)
          var scriptTitle = document.createElement('script')
          scriptTitle.id = 'IOS_setTitle'
          scriptTitle.innerHTML = 'try {window.webkit.messageHandlers.setTitle.postMessage({title: "' + tit + '"});}catch(e){}'
  
          document.body.appendChild(scriptTitle)
        } else {
          var scriptTitle = document.createElement('script')
          scriptTitle.id = 'IOS_setTitle'
          scriptTitle.innerHTML = 'try{window.webkit.messageHandlers.setTitle.postMessage({title: "' + tit + '"});}catch(e){}'
  
          document.body.appendChild(scriptTitle)
        }
        window.location.href = 'title://?title=' + tit */
      
    }
  } else {
    console.log('pc')
  }
}

/**
 * 设置显示android的分享按钮
 * true 是隐藏
 * false 显示
 */
export const hideShareBtn = (flag) => {
  // 0是隐藏，1是显示

  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'hideShareBtn', {
          'isHide': flag
        },
        function (responseData) {
          console.log(responseData)
          window.alert('success')
        }
      )
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          window.WebViewJavascriptBridge.callHandler(
            'hideShareBtn', {
              'isHide': flag
            },
            function (responseData) {
              console.log(responseData)
              window.alert('success')
            }
          )
        },
        false
      )
    }
  } else if (isIOS) {} else {
    console.log('pc')
  }
}

  /** 设置app顶部标题文案的颜色 */
export const setNavTitleColor_old=  (data)=> {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    // 0是隐藏，1是显示

    if (isAndroid) {
      if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(
          'setNavTitleColor', {
            'red': data.red,
            'green': data.green,
            'blue': data.blue,
            'alpha': data.alpha
          },
          function (responseData) {
            console.log(responseData)
            window.alert('success')
          }
        )
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            window.WebViewJavascriptBridge.callHandler(
              'setNavTitleColor', {
                'red': data.red,
                'green': data.green,
                'blue': data.blue,
                'alpha': data.alpha
              },
              function (responseData) {
                console.log(responseData)
                window.alert('success')
              }
            )
          },
          false
        )
      }
    } else if (isIOS) {
      // 新方法已包含
    } else {
      console.log('pc')
    }
  }
/** 设置app顶部是否显示标题左侧文字 */
export const setBarLeftVisibility=  (flag)=> {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // 0是隐藏，1是显示

  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'setBarLeftVisibility', {
          'visibility': flag
        },
        function (responseData) {
          console.log(responseData)
          window.alert('success')
        }
      )
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          window.WebViewJavascriptBridge.callHandler(
            'setBarLeftVisibility', {
              'visibility': flag
            },
            function (responseData) {
              console.log(responseData)
              window.alert('success')
            }
          )
        },
        false
      )
    }
  } else if (isIOS) {
    // 新方法已包含
  } else {
    console.log('pc')
  }
}
/** 设置app顶部标题文案的背景颜色 */
export const setTitleColor_old = (data) => {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // 0是隐藏，1是显示

  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler(
        'setTitleColor', {
          'red': data.red,
          'green': data.green,
          'blue': data.blue,
          'alpha': data.alpha
        },
        function (responseData) {
          console.log(responseData)
          window.alert('success')
        }
      )
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          window.WebViewJavascriptBridge.callHandler(
            'setTitleColor', {
              'red': data.red,
              'green': data.green,
              'blue': data.blue,
              'alpha': data.alpha
            },
            function (responseData) {
              console.log(responseData)
              window.alert('success')
            }
          )
        },
        false
      )
    }
  } else if (isIOS) {
    // 新方法已包含
  } else {
    console.log('pc')
  }
}