import storage from 'storejs'
import store from './../store'

/** 通过APP或者H5登陆 */
export const toLoginByAppOrH5 = function () {
  if (store.state.isApp) {
    toLogin()
    loginCallBack(closeView)
    appAppWillAppearOrDisappear_ios(closeView)
  } else {
    storage('from', window.location.href)
    window.location.href=window.web_Url + '/testLogin/build/index.html?loginEntrance=medicalTools'    
  }
}



