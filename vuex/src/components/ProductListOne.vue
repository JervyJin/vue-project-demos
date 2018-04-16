<template>
  <div id="product-list-one">
    <h2>product-list-one</h2>
    <!-- 遍历负组件窜过来的数组 -->
    <ul>
      <li v-for="product in saleProducts">
        <span class="name">{{product.name}}</span>
        <span class="price">{{product.price}}</span>
      </li>
    </ul>
    <button @click="reducePrice(4)">商品降价</button>
  </div>
</template>

<script>

export default {
  // 通过store实现组件间的属性传值及通信
  computed: {
    //给他个渲染价格的方法
    products() {
      return this.$store.state.products;
    },
    //给他个打折的方法
    saleProducts() {
      
       return this.$store.getters.saleProducts;
    }
    
  },
  methods: {
    reducePrice: function(amount) {
       /*return this.$store.state.products.forEach(product=>{
          product.price -= 1;
       });*/

       // this.$store.commit('reducePrice');

       this.$store.dispatch('reducePrice', amount);

    }

    
  }

}
</script>

<style scoped>

#product-list-one{
    background: #FFF8B1;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
}
#product-list-one ul{
    padding: 0;
}
#product-list-one li{
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
}
.price{
    font-weight: bold;
    color: #E8800C;
}
</style>
