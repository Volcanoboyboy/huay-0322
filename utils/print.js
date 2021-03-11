/* eslint-disable */

/**
 * @author Ellis Sun
 * 2019-7-12
 *
 * 控制线上的打印。并且还可以打印出打印的位置。
 */


((win) => {
  const print = {};

  const consoleArr = [
    'assert',
    'clear',
    'count',
    'countReset',
    'debug',
    'dir',
    'dirxml',
    'error',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ];

  function setPrint() {
    for (let i = 0; i < consoleArr.length; i++) {
      const key = consoleArr[i];
      if (process.env.NODE_ENV === 'development' || (win.$print && win.$print._canUse)) {
        print[key] = console[key];
      } else {
        print[key] = () => {};
      }
    }
    return print;
  }
  try {
    
  } catch (error) {
    
  }

  win.$print = setPrint();

  // 监听 window.$print._canUse 值的变化。 每次变化都重新赋值window.$print，以防之后可以支持在正式环境的控制台中看到打印信息
  Object.defineProperty($print, '_canUse', {
    get: function () {
      try {
        return _canUse;
      } catch (e) {
        return undefined;
      }
    },
    set: function (value) {
      _canUse = value;
      win.$print = setPrint()
    }
  });


})(window);
