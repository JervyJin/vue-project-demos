<template>
  <div class="payInfo">
    <div v-if="infoPay.payStatus == 2">
      <div class="van-dialog__header">拼团中</div>
      <div class="van-dialog__message">
        剩余
        <span v-if="infoPay.payUserNum == 1">2</span>
        <span v-else-if="infoPay.payUserNum == 2">1</span> 个名额，
        <van-count-down :time="time" />后结束
      </div>
    </div>
    <div v-else-if="infoPay.payStatus == 3" class="van-dialog__header">拼团成功</div>

    <div v-else-if="infoPay.payStatus == 4" class="van-dialog__header">拼团已结束</div>

    <div class="weui-flex usersteg">
      <div class="weui-flex__item" v-for="(user,index) in infoPay.paylist" :key="user.userId">
        <div class="topImg">
          <van-image round width="0.714rem" height="0.714rem" :src="user.avatarUrl" />
          <span v-if="index == 0">团长</span>
        </div>
        <p>{{user.nickName}}</p>
      </div>
      <div
        class="weui-flex__item"
        v-if="infoPay.paylist.length == 1 || infoPay.paylist.length == 2"
      >
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
      <div class="weui-flex__item" v-if="infoPay.paylist.length == 1">
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
    </div>
    <van-button color="#d30127" size="large" @click="toInvite" v-if="infoPay.payStatus == 2">去邀请</van-button>
    <van-button color="#d30127" size="large" @click="toaddWx" v-if="infoPay.payStatus == 3">添加班主任微信</van-button>
    <van-button
      color="#d30127"
      size="large"
      @click="toInvite"
      v-if="infoPay.payStatus == 4"
    >重新拼团，去邀请</van-button>
     <van-popup v-model="showC">
        <addWx :infowx="infowx" />
      </van-popup>
  </div>
</template>

<script>
import addWx from "../components/addWx.vue";
export default {
  components: {
    addWx
  },
  name: "showMoel",
  props: ["infoPay"],
  data() {
    return {
      showC: false,
			users: "",
			infowx: "",
      time: 30 * 60 * 60 * 1000
    };
  },
  mounted() {
    this.getwx();
  },
  methods: {
		getwx(){
				this.infowx = {
				WechatID: this.infoPay.WechatID,
				WechatImgUrl: this.infoPay.WechatImgUrl,
			}; window.console.log("infowx", this.infowx);
		},
    toInvite() {
      window.console.log("infoPay1", this.infoPay.paylist.length);
      
    },
    toaddWx() {
      this.showC = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.van-dialog__header {
  margin-bottom: 0.357rem;
}
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
