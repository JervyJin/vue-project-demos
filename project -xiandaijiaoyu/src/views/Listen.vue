<template>
  <div id="page-body">
    <div class="audio-div">
      <div class="audio-block">
        <div class="header">
          <div class="slider" @touchstart="handleTouchStart">
            <div class="slider-track"></div>
            <div class="silderNone" :style="'width:'+silderNone+'%'"></div>
            <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
            <div
              class="slider-thumb"
              :style="'left:'+sliderTime+'%'"
            >{{ audio.currentTime | formatSecond}} / {{ audio.maxTime | formatSecond}}</div>
          </div>
          <!--  -->
          <audio
            ref="audio"
            @pause="onPause"
            @play="onPlay"
            @timeupdate="onTimeupdate"
            @loadedmetadata="onLoadedmetadata"
            preload="auto"
            :src="current.mp3Url"
            controls="controls"
            style="display:none;"
          ></audio>

          <!--  <label class="endtime">{{ audio.maxTime | formatSecond}}</label> -->
        </div>
        <!-- <label class="playname">{{current.title}}</label> -->
        <div class="model-div">
          <img
            src="@/assets/images/syg_yes.png"
            v-if="current.index!=1"
            class="lasticon"
            @click="switchAudio('top')"
          />
          <img src="@/assets/images/syg.png" @click="switchAudio" v-else class="lasticon" />
          <img
            v-if="played"
            src="@/assets/images/play_bf.png"
            class="playicon"
            @click="startPlayOrPause"
          />
          <img v-else src="@/assets/images/play_zt.png" class="playicon" @click="startPlayOrPause" />

          <img
            v-if="current.nextIndex!=2"
            src="@/assets/images/xyg.png"
            class="nexticon"
            @click="switchAudio('bottom')"
          />
          <img v-else src="@/assets/images/xyg_yes.png" @click="switchAudio" class="nexticon" />
        </div>
      </div>
    </div>
    <!-- ********************************************************************************* -->
    
  </div>
</template>
 
<script>
/* import { clearInterval } from "timers"; */
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    // hours + ':' +
    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "0:00:00";
  }
}
var times = null;
export default {
  data() {
    return {
      sliderTime: 0,
      silderNone: 0,
      // courseId: JSON.parse(this.$route.query.courseId),

      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        minTime: 0,
        step: 0.1
      },
      lefticon: "",
      played: false, // 播放暂停按钮
      current: {
        startTime: "00:00",
        endtime: "00:00",
        status: 0, //0 试听 1 非试听
        lengthOfTime: "05:36",
        courseId: 1,
        index: 1,
        nextIndex: 1,
        imgUrl:
          "http://fileaj.modernedu.club/bookImage/20191114/e095a3d371cf49a09b81e33ae41225c2.png",
        courseName: "为什么要加入亲子训练营",
        mp3Url:
          "http://videoaj.modernedu.club/20191120/5fab39655c594fa9a1433c848c507184.mp3",
        clickRate: "183264",
        coursedec: "亲子训练营",
        content: "课程内容",
        WechatID: "aijiadushu2019",
        times: ""
      }
    };
  },
  created() {
    var that = this;
    //that.$refs.audio.play();
    that.played = false;
    // that.$refs.audio.pause();
    //  that.silderNone=0;
  },
  mounted() {
    this.getCourse();
    // this.$refs.audio.play();
    var that = this;
    that.played = true;
    // this.$refs.audio.pause();
    times = setInterval(() => {
      that.silderNone = that.silderNone + 10;
      if (that.silderNone == 100) {
        window.clearInterval(times);
      }

      console.log("开始播放", that.silderNone);
    }, 1000);
  },
  methods: {
    
    getCourse() {
      var nums = this.current.clickRate;
      if (nums > 9999) {
        nums = Math.floor(nums / 1000) / 10 + "万";
      }
      this.current.clickRate = nums;
    },
    toIndex() {
      this.$router.push("/");
    },
    /**
     * 控制音频的播放与暂停 {三元运算方式简单/后期优化}
     */
    startPlayOrPause() {
      console.log(this.audio.playing);
      if (!this.audio.playing) {
        this.played = true;
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
        this.played = false;
      }
    },
    /**
     * 切换歌曲事件
     */
    switchAudio(value) {
      this.$toast("到头了");
    },
    // 播放音频
    play() {
      console.log("你的播放开启了");
      this.$refs.audio.play();
      this.played = true;
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      console.log("音频正在播放中");
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      var startTime = parseInt(this.audio.currentTime);
      console.log(
        "this.audio.playing",
        this.audio.playing,
        "maxTime",
        this.audio.maxTime
      );
      //
      this.played = false;
      if (startTime == this.audio.maxTime) {
        this.sliderTime = 0;
        this.audio.currentTime = "00:00";
      }
    },
    handleFocus() {
      console.log("focues");
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    // 结束时间
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      console.log("timeupdate");
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },

    handleTouchStart(e) {
      this.setValue(e.touches[0]);
      this.$refs.audio.play();
      document.addEventListener("touchmove", this.handleTouchMove);
      document.addEventListener("touchup", this.handleTouchEnd);
      document.addEventListener("touchend", this.handleTouchEnd);
      document.addEventListener("touchcancel", this.handleTouchEnd);

      // e.preventDefault();
      // this.onDragStart(e);
    },
    handleTouchMove(e) {
      console.log(e.changedTouches[0]);
      this.setValue(e.changedTouches[0]);
    },
    handleTouchEnd(e) {
      this.setValue(e.changedTouches[0]);
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchup", this.handleTouchEnd);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchcancel", this.handleTouchEnd);
      // this.onDragStop(e);
    },
    // 从点击位置更新 value
    setValue(e) {
      const $el = this.$el;
      const { maxTime, minTime, step } = this.audio;
      let value =
        ((e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth) *
        (maxTime - minTime);
      value = Math.round(value / step) * step + minTime;
      value = parseFloat(value.toFixed(5));

      if (value > maxTime) {
        value = maxTime;
      } else if (value < minTime) {
        value = minTime;
      }
      this.$refs.audio.currentTime = value;
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      console.log("拖动进度条");
      // this.audio.playing && this.pause();
      // console.log('拖动了',index,this.sliderTime,this.audio.maxTime,parseInt(index / 100 * this.audio.maxTime))
      // !this.audio.playing && this.play();
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  }
};
</script>
 
<style scoped lang="scss">
#page-body {
  .audio-div {
    background: #fff;
    margin-bottom: 0.2rem;
    .weui-media-box_appmsg {
      padding: 0;
      margin-top: 0;
      margin-bottom: 0.536rem;
      .weui-media-box__hd {
        width: 1.786rem;
        height: 2.5rem;
      }
      .weui-media-box__title {
        margin-bottom: 0.2rem;
        font-size: 0.339rem;
      }
      .weui-media-box__desc {
        color: #999;
        font-size: 0.214rem;
      }
    }
    .audio-block {
      width: 100%;

      display: inline-block;
      position: relative;
      .header {
        position: relative;
        width: 68%;
        margin: 0 auto;
        display: inline-block;
        top: 0;
        text-align: center;
        height: 0.7rem;
        line-height: 0.7rem;

        .slider {
          width: 100%;
          position: relative;
          height: 0.1rem;
          left: 0.2rem;
          display: flex;
          align-items: center;
          bottom: 0.15rem;
          cursor: default;
          border-radius: 0.3rem;
          user-select: none;
          outline: none;
        }
        .silderNone {
          position: absolute;
          height: 0.1rem;
          width: 100%;
          background-color: #ccc;
          left: 0;
          border-radius: 0.3rem;
          top: 50%;
          margin-top: -1px;
        }

        .slider-track {
          position: absolute;
          height: 0.1rem;
          left: 0;
          right: 0;
          border-radius: 0.3rem;
          top: 50%;
          background-color: #e4e4e4;
        }

        .slider-fill {
          position: absolute;
          height: 0.1rem;
          width: 100%;
          background-color: #d30127;
          left: 0;
          border-radius: 0.3rem;
          top: 50%;
          margin-top: -1px;
        }

        .slider-thumb {
          position: absolute;
          padding: 0px 5px;
          font-size: 0.214rem;
          top: 0.08rem;
          height: 0.27rem;
          line-height: 0.32rem;
          background-color: #fff;
          box-shadow: 1px 0 6px #b9babc;
          color: #333;
          border-radius: 10px;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }

        .startTime {
          font-size: 0.25rem;
          position: absolute;
          z-index: 2;
          left: 0.35rem;
          font-size: 0.26rem;
          bottom: 0.65rem;
        }
        .endtime {
          font-size: 0.25rem;
          position: absolute;
          z-index: 2;
          left: 6.5rem;
          bottom: 0.45rem;
        }
      }
    }

    .model-div {
      position: relative;
      width: 100%;
      bottom: 0.5rem;
      height: 1rem;
      text-align: center;
    }
    .playicon {
      width: 1.071rem;
      height: 1.071rem;
      position: relative;
      display: inline-block;
      top: 0;
    }
    .lasticon {
      position: absolute;
      width: 0.321rem;
      height: 0.321rem;
      left: 0.8rem;
      top: 0.5rem;
    }

    .nexticon {
      position: absolute;
      width: 0.321rem;
      height: 0.321rem;
      right: 0.8rem;
      top: 0.5rem;
    }
  }
  .tagTitle {
    text-align: center;
    margin: 0;
  }
  .cardsteg {
    margin: 0.625rem 0;
    font-size: 0.214rem;

    .steg {
      width: 0.536rem;
      height: 0.536rem;
      border-radius: 50%;
      background-color: #fff9fa;
      border: 1px solid #d30127;
      margin-bottom: 10px;
      display: inline-block;
      line-height: 0.55rem;
      color: #d30127;
    }
    .next {
      padding-top: 0.15rem;
    }
    .next img {
      width: 0.268rem;
    }
  }
  .contents {
    font-size: 0.268rem;
    padding: 0 0.268rem;
    margin-bottom: 0.2rem;
  }
}
</style>