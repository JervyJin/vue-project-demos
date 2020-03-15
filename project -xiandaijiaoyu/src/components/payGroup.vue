<template>
  <div class="paySingle">
    <div class="weui-media-box_appmsg">
      <div class="weui-media-box__hd">
        <img class="weui-media-box__thumb" :src="infoGroup.subUrl" />
      </div>
      <div class="weui-media-box__bd">
        <h4 class="weui-media-box__title">{{infoGroup.subTitle}}</h4>
        <p class="weui-media-box__desc">
          <span style="font-size:.357rem">{{infoGroup.priceSingle}}</span>元
        </p>
      </div>
    </div>
    <div class="prosp">
      <span style="display: inline-block;width:75vw">
        我已同意拼团费用不退协议
        <img
          src="@/assets/images/rule.png"
          width="10px"
          height="10px"
          style="margin-bottom: 4px;"
          @click="toPayRule"
          alt
          srcset
        />
      </span>
      <van-switch v-model="checked" active-color="#d30127" inactive-color="#d9d9d9" size="15px" />
    </div>
    <van-popup v-model="show">
      <div class="van-dialog__header">拼团费用不退协议</div>
      <div class="van-dialog__message van-dialog__message--left">
        1、拼团费用是指用户在拼团购买爱家平台课程时，支付的一定数额的金钱，主要用作确定爱家读书课程的购买名额。
        <br />2、用户支付拼团费用之后，因用户拼团失败导致不能参加课程，用户可重复拼团，拼团费用概不退还。
        <br />3、用户支付拼团费用之后，因用户原因不能参加课程，拼团费用概不退还。
      </div>
      <van-button
        color="#d30127"
        @click="closePayRule"
        style="width: 66vw;border-radius: 3px;margin-bottom: 26px;"
      >我知道了，去开启</van-button>
    </van-popup>
    <h3 class="tagTitle">拼团规则</h3>
    <div class="weui-flex cardsteg">
      <div class="weui-flex__item">
        <span class="steg">1</span>
        <p>邀新人拼团付款{{infoGroup.priceSingle}}元</p>
      </div>
      <div class="next">
        <img src="@/assets/images/next.png" />
      </div>
      <div class="weui-flex__item">
        <span class="steg">2</span>
        <p>分享给好友</p>
      </div>
      <div class="next">
        <img src="@/assets/images/next.png" />
      </div>
      <div class="weui-flex__item">
        <span class="steg">3</span>
        <p>3人成团均{{infoGroup.priceSingle}}元购买</p>
      </div>
      <div class="next">
        <img src="@/assets/images/next.png" />
      </div>
      <div class="weui-flex__item">
        <span class="steg">4</span>
        <p>拼团成功</p>
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
    <van-button color="#ffaa45" style="width: 67vw;">
      <span v-if="infoGroup.payStatus == 0">
        支付
        <strong>{{infoGroup.priceSingle}}</strong>元即开团成功
      </span>
      <span v-else-if="infoGroup.payStatus == 2 && infoGroup.payUserNum == 1">
        支付
        <strong>{{infoGroup.priceSingle}}</strong>元即参团
      </span>
      <span v-else-if="infoGroup.payStatus == 2 && infoGroup.payUserNum == 2">
        支付
        <strong>{{infoGroup.priceSingle}}</strong>元即拼团成功
      </span>
    </van-button>
    <van-button color="#d30127" @click="toPay" style="width: 33vw;">确定购买</van-button>
  </div>
</template>

<script>
export default {
  name: "showMoel",
  props: ["infoGroup"],
  data() {
    return {
      show: false,
      checked: false,
      infowx: "",
      radio: "2",
      price: "",
      payType: 2 //0.1拼团支付
    };
  },
  mounted() {
   // this.getwx();
  },
  methods: {
   /*  getwx() {
      this.infowx = {
        WechatID: this.infoPay.WechatID,
        WechatImgUrl: this.infoPay.WechatImgUrl
      };
      window.console.log("infowxG", this.infowx);
    }, */
    isWeixinBrowser() {
      let ua = navigator.userAgent.toLowerCase();
	    return (/micromessenger/.test(ua)) ? true : false;
    },
    toPayRule() {
      this.show = true;
    },
    closePayRule() {
      this.show = false;
    },
    toPay() {
      if (this.checked == false) {
        this.show = true;
      } else {
        this.price = this.infoGroup.priceSingle;
        window.console.log("infoGroup1", this.radio);
        if (this.isWeixinBrowser()) {
		     this.$router.push("successWx");//微信--拼团成功
		   //	this.$toast('我是微信');
	    	}else{
           this.$router.push("successGroup");//其他--开团成功
        }
         
        if (this.radio == 1) {
          //调支付宝支付
        } else if (this.radio == 2) {
          //调微信支付
          this.http.post("/payH5Service/payH5Order",{
            userId :this.infoGroup.WechatID,
            totalMoney :this.infoGroup.priceSingle,
            methord :'wechat',
            payType :1,
            trainingCampId:this.infoGroup.groupId,
            mobile:''
          })
          .then(res=>{
            console.log(res)
            let url = res.result.payUrl
            window.location.href=url
            
          })
          console.log('微信支付成功。。。')
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weui-media-box_appmsg {
  margin: 0.536rem 0.536rem 0.089rem;
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
.prosp {
  font-size: 0.214rem;
  margin-left: 0.536rem;
  text-align: left;
  margin-bottom: 0.5rem;
  .van-switch {
    margin-bottom: -3px;
  }
}
.cardsteg {
  margin: 0 0.536rem 0.536rem;

  font-size: 0.214rem;
  padding-top: 6px;

  .steg {
    width: 0.536rem;
    height: 0.536rem;
    border-radius: 50%;
    background-color: #d30127;
    margin-bottom: 10px;
    display: inline-block;
    line-height: 0.53rem;
    color: #fff;
  }
  .next {
    padding-top: 0.15rem;
  }
  .next img {
    width: 0.268rem;
  }
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-cell {
  padding: 5px 0.536rem;
  line-height: 0.536rem;
  color: #000000;
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
.van-button {
  height: 50px;
}
.van-button strong {
  font-size: 0.446rem;
  font-weight: 600;
  line-height: 30px;
}
.van-dialog__message {
  padding: 18px 24px 0;
}
</style>
