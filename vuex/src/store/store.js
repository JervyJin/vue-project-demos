import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//实例化store对象，并暴露出去在main.js中使用
//这样就可以把根组件中的数据迁移到这里了，用state来管理他们
export const store = new Vuex.Store({
	//用于储存原始数据
	state: {
		products: [
		    {name:'马云', price: 200},
		    {name:'马云', price: 200},
		    {name:'马云', price: 200},
		    {name:'马云', price: 200},
		]
	},
	//用于获取动态的数据
	getters: {
		saleProducts: (state)=>{
			//遍历拿到的数据分别改变他们的价格
			var saleProducts = state.products.map(product =>{
		          return {
		            //在函数返回值中修改他们的属性值
		            name: product.name + "**",
		            price: "$" + product.price/2
		          }
		});
			return saleProducts;
 
       }
	},
	//用于触发同步事件时获取数据
	mutations: {
		reducePrice: (state, payload)=>{
			state.products.forEach(product=>{
          product.price -= payload;
       });
		}
		
	},
	// 用于触发异步事件时获取数据
	//该方法还可以给事件函数传递参数
	actions: {
		reducePrice:(context, payload)=>{
			setTimeout(function(){
				context.commit("reducePrice", payload)
			},2000)
		}
	}
		 
});