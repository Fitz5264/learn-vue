import axios from 'axios'
import {Loading, Message} from 'element-ui';

let loadingObject;
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  let regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
  config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1];
  loadingObject = Loading.service({fullscreen: true});
  return config
});

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  loadingObject.close();
  const data = response.data;

// 根据返回的code值来做不同的处理（和后端约定）
  switch (data.status) {
    case 400:
      Message.error('表单提交异常');
      // console.log(data.status);
      return;
    case 401:
      // console.log(data.status);
      return;
    case 402:
      switch (data.detail) {
        case 4021:
          Message.error('您的账号或密码错误');
          break;
        case 4022:
          Message.error('您输入的验证码错误');
          break;
        case 4023:
          Message.error('您输入的旧密码不正确');
          break;
        default:
      }
      return;
    case 403:
      // console.log(data.status);
      return;
    case 404:
      // console.log(data.status);
      return;
    case 405:
      // console.log(data.status);
      return;
    case 406:
      Message.error('密码强度不够');
      return;
    case 408:
      // console.log(data.status);
      return;
    case 409:
      Message.error('这个手机号已经注册过了');
      return;
    case 410:
      Message.error('请先点击 "发送短信" 按钮获取验证码');
      return;
    case 411:
      Message.error('您输入的手机号码不存在');
      return;
    case 423:
      Message.error('退款失败，请联系管理员');
      return;
    case 428:
      Message.error('预约已由机构确认，无法退款');
      return;
    case 429:
      Message.error('您发送的短信过于频繁，请过一个小时后再试这个手机号码');
      return;
    case 500:
      // console.log(data.status);
      return;
    case 204:
    case 200:
      return data;
    default:
    // alert(data.status);
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.detail);

  err.data = data;
  err.response = response;

  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  loadingObject.close();
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误';
        break;

      case 401:
        err.message = '未授权，请登录';
        break;

      case 403:
        err.message = '拒绝访问';
        Message.error('服务器拒绝了您的请求，请联系管理员');
        break;

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`;
        Message.error('您未联网或网络出现了问题');
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
        err.message = '服务器内部错误';
        Message.error('服务器发生了错误，请联系管理员');
        break;

      case 501:
        err.message = '服务未实现';
        break;

      case 502:
        err.message = '网关错误';
        break;

      case 503:
        err.message = '服务不可用';
        break;

      case 504:
        err.message = '网关超时';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
    }
  }

  return Promise.reject(err)
});

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
};

export default axios
