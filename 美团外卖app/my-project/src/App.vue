<template>
  <div id="app">
    <app-header :poiInfo="poiInfo"></app-header>

      <app-nav :commentNum="commentNum"></app-nav>
      <keep-alive>

        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import Nav from '@/components/nav/Nav.vue'

export default {
  name: 'App',
  components: {
    "app-header":Header,
    "app-nav":Nav
  },
  //把数据放到根组件中以便复用
  data() {
    return {
      poiInfo:{},
      commentNum:0
    }
  },
  created(){
    fetch("/api/goods")
      .then(res=> {
        return res.json()
      })
      .then(response=> {
        // console.log(response)
        if(response.code == 0 ){
          this.poiInfo = response.data.poi_info
          console.log(this.poiInfo)
        }
      })

      //请求ratings
      fetch("/api/ratings")
      .then(res=> {
        return res.json()
      })
      .then(response=> {
        // console.log(response)
        if(response.code == 0 ){
          this.commentNum = response.data.comment_num
          console.log(this.commentNum)
        }
      })
  }
  
}
</script>

<style>

</style>
