import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// import axios from 'axios'
// import Api from './config/api'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// Vue.use(ECharts);
Vue.component('chart', ECharts)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import "babel-polyfill";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
