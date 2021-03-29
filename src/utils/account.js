const account = {};
// 用户id
Object.defineProperty(account, "userId", {
  get() {
    return localStorage.getItem("userId");
  }
});

export default account;

// 判断路由是否需要登录
export const needLogin = to => {
  return to && to.meta && to.meta.needLogin === true && !!account.userId;
};
