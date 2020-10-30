import axios from "axios";
import { Toast } from "vant";
import { getUrl } from "@/config/url";
import { getRequestHeader, login } from "@/utils/account";
import store from "@/store/index";

// 请求前拦截
axios.interceptors.request.use(
  config => {
    let header = getRequestHeader();
    for (let key in header) {
      config.headers[key] = header[key];
    }
    config.url = getUrl(config.url);

    config.cancelToken = new axios.CancelToken(cancel => {
      store.state["axiosPromiseCancel"].push({
        u: config.url + "&" + config.method,
        f: cancel
      });
    });

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    let { data: { code } = {} } = data;
    if (code === 500001 || code === 500002 || code === 500003) {
      //跳转到登录页面前，取消其他所有网络请求
      cancelAllRequest();
      login();
    }
    return data;
  },
  err => {
    if (axios.isCancel(err)) {
      // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
      return new Promise(() => {});
    } else {
      if (err.response.status === 504 || err.response.status === 404) {
        console.error("服务器被吃了⊙﹏⊙∥");
      } else if (err.response.status === 401) {
        console.error("登录信息失效⊙﹏⊙∥");
      } else if (err.response.status === 500) {
        console.error("服务器开小差了⊙﹏⊙∥");
      }
      return Promise.reject(err);
    }
  }
);

// @RequsetParam请求
export const postRequestParam = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      data: params,
      transformRequest: [
        function(data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      callback({ res, resolve, reject });
    });
  });
};

//单请求
export const fetchGet = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        callback({ res, resolve, reject });
      });
  });
};

export const fetchPost = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(res => {
      callback({ res, resolve, reject });
    });
  });
};

const callback = ({ res: { status, data }, resolve, reject }) => {
  if (status === 200 && data.code === 200) {
    resolve(data);
  } else {
    Toast({ position: "bottom", message: data.message || "请求失败～" });
    reject(data);
  }
};

//多请求
export const multiple = function(requsetArray, callback) {
  return axios.all(requsetArray).then(axios.spread(callback));
};

export default Vue => {
  Vue.prototype.$fetchGet = fetchGet;
  Vue.prototype.$fetchPost = fetchPost;
  Vue.prototype.$fetchPostRequestParam = postRequestParam;
  Vue.prototype.$multiple = multiple;
  Vue.prototype.$axios = axios;
};

export const cancelAllRequest = () => {
  if (store.state["axiosPromiseCancel"].length > 0) {
    store.state["axiosPromiseCancel"].forEach(e => {
      e && e.f();
    });
  }
  store.state["axiosPromiseCancel"] = [];
};
