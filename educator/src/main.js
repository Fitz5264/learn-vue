// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/commen.css'
import {
  Checkbox,
  Cascader,
  Input,
  Radio,
  Button,
  Form,
  FormItem,
  Col,
  Upload,
  Steps,
  Step,
  MessageBox,
  Message
} from 'element-ui'

Vue.config.productionTip = false;
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Cascader);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
});
