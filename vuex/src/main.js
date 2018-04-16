import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'

new Vue({
	//一定要在入口文件中使用store
	store: store,	
  el: '#app',
  render: h => h(App)
})
