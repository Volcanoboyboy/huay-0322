/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 10:04:21
 * @LastEditTime: 2019-08-16 10:29:35
 * @LastEditors: Please set LastEditors
 */
import wx from 'weixin-js-sdk'
import { getJsticket, shareStatistics } from './../server/common/common'
import storage from 'storejs'
import Vue from 'vue'

/** 默认参数 */
const defaultParams = {
  link: window.location.href,
  title: window.document.title,
  desc: '',
  imgUrl: ''
}
/**
 * 微信 引入jssdk
 *
 */
export const wxShareCinfig = function () {
  console.log('wxShareCinfig', 'wxShareCinfig')
  const apiParams = {
    appid: window.appId,
    url: location.href.split('#')[0]
  }
  getJsticket(apiParams)
    .then(res => {
      const conf = {
        debug: false,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'hideOptionMenu',
          'hideToolbar',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ]
      }
      wx.config(conf)
    })
    .catch(() => {})
}

/**
 * 微信分享设置
 * @param {String} params.link 分享的链接
 * @param {String} params.title 分享的标题
 * @param {String} params.desc 分享的内容
 * @param {String} params.imgUrl 分享的小图标
 *
 */
export const wxShare = function (params, cb) {
  console.log('wxShare', 'wxShare')
  const options = Object.assign({}, defaultParams, params || {})
  // 分享好友
  const shareConfig = {
    title: options.title,
    desc: options.desc,
    link: options.link,
    imgUrl: options.imgUrl,
    success () {
      console.log(Vue.prototype, 'Vue------------')
      Vue.prototype.toast('分享成功', 'success')
      shareStatistics({
        channel: 3, // 是int分享平台【1-分享到QQ，2-分享到QQ空间，3-分享到微信,4-分享到微信朋友圈】
        type: 3, //  是int类型【1-文章,2-视频,3-url,4-话题,5-话题海报，6-文章专题分享,7-视频专题分享,819-医师节,917-三周年活动,8-字体大小的回调， 9-系列课，10-系列课海报,11-医学会议, 20-新版用药百科】
        url: options.link, // 否String分享url
        openid: '' // 否String用户openid
      })
      cb(3, 'success')
    },
    cancel () {
      console.log(Vue.prototype, 'Vue------------')
      Vue.prototype.toast('分享成功', 'success')
      shareStatistics({
        channel: 3, // 是int分享平台【1-分享到QQ，2-分享到QQ空间，3-分享到微信,4-分享到微信朋友圈】
        type: 3, //  是int类型【1-文章,2-视频,3-url,4-话题,5-话题海报，6-文章专题分享,7-视频专题分享,819-医师节,917-三周年活动,8-字体大小的回调， 9-系列课，10-系列课海报,11-医学会议, 20-新版用药百科】
        url: options.link, // 否String分享url
        openid: '' // 否String用户openid
      })
      cb(3, 'cancel')
    }
  }
  // 分享朋友圈
  const shareConfigT = {
    title: options.title,
    desc: options.desc,
    link: options.link,
    imgUrl: options.imgUrl,
    success () {
      console.log(Vue.prototype, 'Vue------------')
      Vue.prototype.toast('分享成功', 'success')
      shareStatistics({
        channel: 4, // 是int分享平台【1-分享到QQ，2-分享到QQ空间，3-分享到微信,4-分享到微信朋友圈】
        type: 3, //  是int类型【1-文章,2-视频,3-url,4-话题,5-话题海报，6-文章专题分享,7-视频专题分享,819-医师节,917-三周年活动,8-字体大小的回调， 9-系列课，10-系列课海报,11-医学会议, 20-新版用药百科】
        url: options.link, // 否String分享url
        openid: '' // 否String用户openid
      })
      cb(4, 'success')
    },
    cancel () {
      console.log(Vue.prototype, 'Vue------------')
      Vue.prototype.toast('分享成功', 'success')
      shareStatistics({
        channel: 4, // 是int分享平台【1-分享到QQ，2-分享到QQ空间，3-分享到微信,4-分享到微信朋友圈】
        type: 3, //  是int类型【1-文章,2-视频,3-url,4-话题,5-话题海报，6-文章专题分享,7-视频专题分享,819-医师节,917-三周年活动,8-字体大小的回调， 9-系列课，10-系列课海报,11-医学会议, 20-新版用药百科】
        url: options.link, // 否String分享url
        openid: '' // 否String用户openid
      })
      cb(4, 'cancel')
    }
  }
  wx.ready(() => {
    wx.onMenuShareAppMessage(shareConfig)
    wx.onMenuShareTimeline(shareConfigT)
  })
  wx.error(res => {
    console.error('WxAPI Config Error', JSON.stringify(res))
  })
}
