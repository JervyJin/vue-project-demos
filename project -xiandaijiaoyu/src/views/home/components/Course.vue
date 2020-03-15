<template>
  <div class="course" :style="{height: contentHeight}">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in courseList"
        :key="item.courseId"
        @click="listenDetail(item.programId)"
      >
        <div v-if="item.programName=='试听课程'">
          <div class="van-ellipsis name">{{item.programUrl}}</div>
          <div class="detailInfo">
            <van-button color="#d30127" plain style="border-radius:10px;">{{item.programName}}</van-button>

            <strong>{{item.duration}}</strong>
            <strong style="padding: 0 3px; display: inline-block;margin-bottom: -3px;">|</strong>
            <strong>{{item.clickRate}}次播放</strong>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["courseList"], //通过props接收父组件传送的数据
  data() {
    return {
      watch: {
        courseList: function(newValue) {
          this.$toast(newValue);
          window.console.log("1", newValue); //可以看到数据已经拿到
        }
      },
      loading: false,
      finished: false,
      error: false,
      contentHeight: 0
    };
  },
  mounted() {
    console.log(this.courseList);
    this.getCourse();
    this.contentHeight = document.documentElement.clientHeight - 66 - 40 + "px";
  },
  methods: {
    getCourse() {
      for (let i = 0; i < this.courseList.length; i++) {
        var nums = this.courseList[i].clickRate;
        if (nums > 9999) {
          nums = Math.floor(nums / 1000) / 10 + "万";
        }
        this.courseList[i].clickRate = nums;
      }
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.courseList.length) {
        this.finished = true;
      }
    },
    listenDetail(item) {
      this.$router.push({
        path: "listen",
        query: { item: JSON.stringify(item) } //TODO: 通过路由的query进行传参);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.course {
  padding-top: 5px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .van-cell:not(:last-child)::after {
    width: calc(100% - 30px);
    border-bottom: 1px solid #f7f7f7;
  }
  .van-cell {
    padding: 12px 15px;
    .name {
      font-size: 0.268rem;
      color: #333;
    }
    /*  .detailInfo button{height: .313rem;color: #d30127} */
    .detailInfo strong {
      font-size: 0.214rem;
      color: #999;
      font-style: normal;
    }
    .van-button--normal {
      padding: 0 8px;
      font-size: 0.179rem;
    }
    .van-button--plain {
      background-color: #fff9fa;
    }
    .van-button {
      height: 0.313rem;
      line-height: 0.313rem;
      margin-right: 0.179rem;
    }
  }
}
</style>
