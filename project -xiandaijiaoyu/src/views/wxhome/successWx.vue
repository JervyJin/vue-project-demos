<template>
  <div id="susSingle">
    
      <div class="van-dialog__header"><img src="@/assets/images/yqcg.png" alt srcset style="width: .625rem;height:.625rem;margin-right: 10px;margin-bottom: 3px;" />恭喜你，开团成功</div>
    <h3 class="tagTitle">拼团流程</h3>
    <div class="weui-flex cardsteg">
      <div class="weui-flex__item">
        <span class="steg">1</span>
        <p>发起拼团</p>
        <b></b>
      </div>

      <div class="weui-flex__item">
        <span class="steg">2</span>
        <p>分享给好友</p><b></b>
      </div>

      <div class="weui-flex__item">
        <span class="steg">3</span>
        <p>等待用户参团支付</p><strong></strong><b></b>
      </div>

      <div class="weui-flex__item">
        <span class="steg">4</span>
        <p>拼团成功</p>
      </div>
    </div>
          <div class="van-dialog__message">
        剩余
        <span v-if="paylist.length == 1">2</span>
        <span v-else-if="paylist.length == 2">1</span> 个名额，
        <van-count-down :time="time" /> 后结束
      </div>
    <div class="weui-flex usersteg">
      <div class="weui-flex__item" v-for="(user,index) in paylist" :key="user.userId">
        <div class="topImg">
          <van-image round width="0.714rem" height="0.714rem" :src="user.avatarUrl" />
          <span v-if="index == 0">团长</span>
        </div>
        <p>{{user.nickName}}</p>
      </div>
      <div
        class="weui-flex__item"
        v-if="paylist.length == 1 || paylist.length == 2"
      >
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
      <div class="weui-flex__item" v-if="paylist.length == 1">
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
    </div>
    <div style="margin:0 50px;">
      <van-button color="#d30127" size="large"  @click="toInvite" >立即邀请</van-button>
    </div>
     
  </div>
</template>

<script>

export default {
  //props: ["infoPay"],

  data() {
    return {
      paylist:'',
      time: 30 * 60 * 60 * 1000
    };
  },
  mounted() {
    this.getwx();
  },
  methods: {
    getwx() {
      this.paylist= [
        {
          userId: 1,
          nickName: "爱家书友0371帅哥帅哥帅哥是嘎嘎嘎",
          avatarUrl:
            "http://fileaj.modernedu.club/20190612/ajds201906121005127.jpg",
          createTime: "10月5日 22:00"
        }]
      window.console.log("infowx2s", this.infoPay);
    },
     toInvite() {
      window.console.log("infoPay1", this.paylist.length);
      
    },
  }
};
</script>

<style scoped lang="scss">
.van-dialog__header{margin-top: .536rem; margin-bottom: .446rem}
.van-dialog__message {
  font-size: 0.268rem;
  padding-top: 0;
  span,
  .van-count-down {
    color: #d30127;
    font-size: 0.304rem;
    font-weight: 600;
    display: inline-block;
  }
}
.van-button {
    border-radius: 6px;
}
.cardsteg {
  margin: 0 0.536rem 0.536rem;

  font-size: 0.214rem;
  padding-top: 6px;
.weui-flex__item{position: relative;}
.weui-flex__item b,.weui-flex__item strong{position: absolute;    border: 2px solid #d30127;
    top: 18%;
    right: -35%;
    width: 13vw;}
   .weui-flex__item strong {    z-index: 100;
    width: 6vw;
    right: 0;
    border-radius: 3px}
    .weui-flex__item:nth-of-type(3) b{border: 2px solid #ededed;}
  .steg {
    width: 0.536rem;
    height: 0.536rem;
    border-radius: 50%;
    background-color: #d30127;
    margin-bottom: 10px;
    display: inline-block;
    line-height: 0.53rem;
    color: #fff;font-weight: 600
  }
  .weui-flex__item:last-of-type .steg{color: #999;background-color: #ededed;}
  .next {
    padding-top: 0.15rem;
  }
  .next img {
    width: 0.268rem;
  }
}
.usersteg {
  color: #333333;
  font-size: 0.25rem;
  font-weight: 600;
  margin: 0 0.357rem;
  .weui-flex__item + .weui-flex__item {
    margin-left: 15px;
  }
  .topImg {
    position: relative;
  }

  span {
    position: absolute;
    left: 37%;
    top: 84%;
    border-radius: 10px;
    font-size: 0.179rem;
    color: #fff;
    line-height: 1;
    padding: 2px 4px;
    background-color: #d30127;
  }
  p {
    line-height: 1.2;
    margin-top: 0.304rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .steg {
    width: 0.714rem;
    height: 0.714rem;
    border-radius: 50%;
  }
}
</style>
