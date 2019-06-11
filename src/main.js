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
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios= axios
//Vue.prototype.$url = 'https://easy-mock.com/mock/5cfa1bee9a819c502224e497/PorfessionalPractice/'
Vue.prototype.$url = 'http://localhost:3000/'
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;

const store = new Vuex.Store({
  state: {
    LoadPage: '',
    userId: '',
    appId: '',
    userInfo:{
       HeadPortrait: 'https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true',
       userId:"",
       userName:"",
       mail:"",
       account:"",
    }
  },
  getters: {},
  actions: {},
  mutations: {
    changeLoadpage(state, lg) {
      console.log(lg);
      state.LoadPage = lg
    },
    changeUserId(state, lg) {
      console.log(lg);
      state.userId = lg
    
    },
    changeAppId(state, lg) {
      console.log(lg);
      state.appId = lg
    },
    changeUserInfo(state, lg) {
      console.log(lg);
      state.userInfo.userId = lg.userId;
      state.userInfo.userName = lg.userName;
      state.userInfo.mail = lg.mail;
      state.userInfo.account = lg.account;
    },
    changeAccount(state,lg) {
      state.userInfo.account = lg;
    }
  }
})

Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
