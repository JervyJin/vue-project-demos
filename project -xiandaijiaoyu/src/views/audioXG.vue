<template>
  <div>
    <div id="mse"></div>
  </div>
</template>
<script>
import Player from "xgplayer";
// let player = new Player({
//   id: "mse",
//   url: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
//   poster: "//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg"
// });
export default {
  data() {
    return {
      playerConfig: {
        //3、动态设置相关值
        id: "mse",
        autoplay: true,
        normalUrl: "", //普清
        midUrl: "", //高清
        hightUrl:
          "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4", //超清
        poster:
          "//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg" //封面
      }
    };
  },
  mounted() {
      this.playerInit()
  },
  methods: {
      playerInit(){   //4、设置视频配置(注意：playerInit应放在异步函数里或mounted之后，不可在created里直接加载，否则不生效)
                let player = new Player({   //初始化player实例对象
                    id:'mse',
                    url: this.playerConfig.highUrl,   //视频链接
                    poster:this.playerConfig.poster,    //封面图片
                    fluid: true,   //流式布局
                    volume: 0.6,   //初始音量
                    whitelist: ['iPhone','Android'],   //白名单
                    playsinline: true,   //内联模式
                    videoInit: true,
                    'x5-video-player-type': 'h5',
                });
  }
}
}
</script>
<style>

</style>