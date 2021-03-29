// 防抖
export const debounce = (fn, wait, immediate) => {
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, wait);
    }
  };
};

//节流
export const throttle = (fn, interval) => {
  let enterTime = 0; //触发的时间
  let gapTime = interval || 500; //间隔时间，如果interval不传，则默认300ms
  return function() {
    let context = this;
    let backTime = Date.now(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, ...arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
};
