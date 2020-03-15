<template>
  <div class="paySingle">
    <div class="weui-media-box_appmsg">
      <div class="weui-media-box__hd">
        <img class="weui-media-box__thumb" :src="infoSingle.subUrl" />
      </div>
      <div class="weui-media-box__bd">
        <h4 class="weui-media-box__title">{{infoSingle.subTitle}}</h4>
        <p class="weui-media-box__desc">
          <span style="font-size:.357rem">{{infoSingle.priceSingle}}</span>元
        </p>
      </div>
    </div>
    <van-radio-group v-model="radio">
      <h3 class="tagTitle">支付方式</h3>
      <van-cell-group>
        <!-- <van-cell title="支付宝支付" clickable @click="radio = '1'">
          <img src="@/assets/images/Alipay.png" alt srcset />
          <van-radio slot="right-icon" name="1" checked-color="#d30127" />
        </van-cell> -->
        <van-cell title="微信支付" clickable @click="radio = '2'">
          <img src="@/assets/images/wechat.png" alt srcset />
          <van-radio slot="right-icon" name="2" checked-color="#d30127" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button color="#d30127" size="large" @click="toPay">确定购买</van-button>
  </div>
</template>

<script>
export default {
  name: "showMoel",
  props: ["infoSingle"],
  data() {
    return {
      radio: "2",
      price: "",
      infowx: "",
      payType: 1 //9.9支付
    };
  },
  mounted() {
    this.getwx();
  },
  methods: {
    getwx() {
      this.infowx = {
        WechatID: this.infoSingle.WechatID,
        WechatImgUrl: this.infoSingle.WechatImgUrl
      };
      window.console.log("infowx", this.infowx);
    },
    toPay() {
      this.price = this.infoSingle.priceSingle;
      window.console.log("infoSingle1", this.radio);
     // this.$router.push("successSingle");
      this.$router.push({
        path: "successSingle",
        query: { infowx: JSON.stringify( this.infowx) } //TODO: 通过路由的query进行传参);
      });
      if (this.radio == 1) {
        //调支付宝支付
      } else if (this.radio == 2) {
        //调微信支付
        this.http.post("/payH5Service/payH5Order",{
            userId :this.infoSingle.WechatID,
            totalMoney :this.infoSingle.priceSingle,
            methord :'wechat',
            payType :2
          })
          .then(res=>{
            console.log(res)
            let url = res.result.payUrl
            window.location.href=url
            
          })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weui-media-box_appmsg {
  margin: 0.536rem;
  padding: 0.179rem 0.268rem;
  background-color: #f7f7f7;
  border-radius: 6px;
  .weui-media-box__hd {
    width: 0.804rem;
    height: 1.071rem;
  }
  .weui-media-box__title {
    margin-bottom: 0.313rem;
  }
  .weui-media-box__desc {
    color: #d30127;
    font-size: 0.214rem;
  }
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-cell {
  padding:5px 0.536rem;
  line-height: 0.536rem;color: #000000;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0px solid #ebedf0;
}
.van-cell__title {
  order: 1;
}
.van-cell__value {
  order: 0;
  flex: 0.15;
}
.van-radio {
  order: 2;
}
.van-cell__title,
.van-cell__value {
  text-align: left;
}
.van-cell__value img {
  width: 0.536rem;
  height: 0.536rem;
}
</style>
