import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import http from './http/http'
// import config from '../config'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 将http.js放入全局
Vue.prototype.http = http
Vue.config.productionTip = false
// Vue.http.options.emulateJSON = true;
import {
  Tab,
  Tabs, Tabbar, TabbarItem, Button, List, Cell, CellGroup, Toast, Image, Popup, RadioGroup, Radio, Switch, CountDown, Dialog
} from 'vant'

import '@/style/index.scss'
import '@/style/common.scss'

// Vue.use(Vant);
Vue.use(Tab).use(Tabs)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(List)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Image)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(CountDown)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Switch)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
