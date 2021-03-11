import store from './../store'
/** 获取按钮权限 */
export function hasPermission (params) {
  let buttonperms = store.state.userRole.roleList ? store.state.userRole.roleList : []
  let isExist = false
  for (let i = 0; i < buttonperms.length; i++) {
    if (buttonperms[i].indexOf(params) > -1) {
      isExist = true
      break
    }
  }
  return isExist
}
