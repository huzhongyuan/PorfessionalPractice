// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import md5 from 'js-md5';
import qs from 'qs';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios= axios
Vue.prototype.$url = 'https://easy-mock.com/mock/5cfa1bee9a819c502224e497/PorfessionalPractice/'
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
