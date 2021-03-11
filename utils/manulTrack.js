// manulTrack.js

/**
 * @author Ellis
 *
 * @description 由于神策的全埋点中，webclick事件仅支持(a、input、button)三个元素，不能满足其他比如div、img、span、等元素的点击埋点。因此，在项目中如果某一个元素（除a、input、button以外）需要添加全埋点的webclick事件，则在该元素中添加 data-track 属性即可。
 *
 * 通过自定义指令， 当页面中 带有 'v-track' 的元素被插入到dom中的时候， 执行addManulTrack
 *
 */

import Vue from 'vue'
import sa from 'sa-sdk-javascript'

// 添加事件监听
function addManulTrack (el) {
  if (document.addEventListener) {
    el.addEventListener('click', () => {
      sa.quick('trackHeatMap', el)
    })
  } else {
    el.attachEvent('onclick', () => {
      sa.quick('trackHeatMap', el)
    })
  }
}

Vue.directive('track', {
  inserted: (el) => {
    addManulTrack(el)
  }
})
