import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

import toast from 'components/Toast/index'

// localStorage.clear();
Vue.config.productionTip = false

// 安装toast 插件
Vue.use(toast)

// Vant 插件
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
