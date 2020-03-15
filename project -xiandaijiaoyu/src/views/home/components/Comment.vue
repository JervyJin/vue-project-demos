<template>
  <div class="comment" :style="{height: contentHeight}">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item,index) in common" :key="item.commentId" @click="handle('1',index)">
        <div class="main">
          <van-image
            round
            fit="cover"
            width=".536rem"
            height=".536rem"
            :src="item.avatarUrl"
          />
        </div>
        <div class="main">
          <div class="van-ellipsis name">{{item.nickName}}</div>
          <div class="detailInfo">
            <strong>{{item.createTime}}</strong>
            <p>{{item.commentContent}}</p>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["common"],
  data() {
    return {
      list: [
        {
          commentId: 1,
          nickName: "爱家书友0371",
          avatarUrl:
            "http://fileaj.modernedu.club/20190718/ajds201907181637032.jpg",
          createTime: "10月5日 22:00",
          commentContent:
            "太及时了，家里有个熊孩子，不知道怎么沟通，希望能学到很多实际解决问题的方法。"
        }
      ],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      contentHeight: 0
    };
  },
  mounted() {
    console.log(this.common);
    this.getcomment();
    this.contentHeight = document.documentElement.clientHeight - 66 - 40 + "px";
  },
  methods: {
    getcomment() {
      // 异步更新数据
      setTimeout(() => {
        /*     if (res.data && res.data.success) {
        this.list = res.data.data;
       
      } */

        for (let i = 0; i < this.list.length; i++) {
          var nums = this.list[i].clickRate;
          if (nums > 9999) {
            nums = Math.floor(nums / 1000) / 10 + "万";
          }
          this.list[i].clickRate = nums;
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length) {
          this.finished = true;
        }
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      /*       setTimeout(async () => {
        let res = await this.$ajax.get(
          {
            limit: this.pageSize,
            page: this.page,
            keyword: this.value1
          },
          "/order/businesslist/" + this.type,
          res => {
            if (res.code == 0) {
              this.list = this.list.concat(res.data.list);
              this.loading = false;
              if (this.list.length == res.data.list) {
                this.finished = true;
              }
              this.page++;
            } else {
              this.$dialog.toast({
                mes: res.msg,
                timeout: 1500
              });
            }
          },
          Error => {
            this.error = true;
            this.loading = false;
          }
        );
      }, 500); */
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  padding-top: 5px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .van-cell:not(:last-child)::after {
    width: calc(100% - 1.696rem);
    left: 1.429rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .van-cell {
    padding: 15px 15px;
    .van-cell__value {
      display: flex;
      align-items: flex-start;
    }
    .main + .main {
      margin-left: 0.179rem;
    }
    .name {
      font-size: 0.268rem;
      color: #333;
    }

    .detailInfo strong {
      display: inline-block;
      font-size: 0.214rem;
      color: #999;
      font-style: normal;
      line-height: 1;
      margin-bottom: 14px;
    }
    .detailInfo p {
      font-size: 0.25rem;
      color: #666;
    }
  }
}
</style>
