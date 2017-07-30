// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-light.css' ;// 使用 carbon 主题
import App from './App';
import router from './router';
import store from './stores';
import axios from'axios';
import VueAxios from'vue-axios';

Vue.use(MuseUI);

//第一个参数插件，第二个参数配置
Vue.use(VueAxios,axios);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
