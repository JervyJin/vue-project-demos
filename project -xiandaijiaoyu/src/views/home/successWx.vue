<template>
  <div id="susWx">
    
      <div class="van-dialog__header"><img src="@/assets/images/yqcg.png" alt srcset style="width: .625rem;height:.625rem;margin-right: 10px;margin-bottom: 3px;" />
        <span v-if="paylist.length == 1">再邀请2人，即可团购成功</span>
        <span v-else-if="paylist.length == 2">再邀请1人，即可团购成功</span>
        <span v-else-if="paylist.length == 3">恭喜你，拼团成功</span>
      </div>
      <p class="showTip">可在爱家读书APP【我的】-【我的已购】-【拼团课程】里查看</p>
       <div class="van-dialog__message" v-if="paylist.length != 3">
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
      <div  class="weui-flex__item"  v-if="paylist.length == 1 || paylist.length == 2" >
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
      <div class="weui-flex__item" v-if="paylist.length == 1">
        <img src="@/assets/images/qyq.png" class="steg" />
      </div>
    </div>
    <div style="margin:0 50px;" v-if="paylist.length != 3">
      <van-button color="#d30127" size="large"  @click="toInvite" >立即邀请</van-button>
      <a style="color:#333;font-weight:600;font-size: .3rem;text-decoration: underline;" href="https://a.app.qq.com/o/simple.jsp?pkgname=club.modernedu.lovebook">打开爱家读书APP</a>
    </div>
     <div style="margin:0 50px;" v-else>       
      <addWx :infowx="infowx" />
      <a class="showAPP" href="https://a.app.qq.com/o/simple.jsp?pkgname=club.modernedu.lovebook">打开爱家读书APP</a>
    </div>
    <div class="showTip" style="margin-top:0.4rem;" v-if="paylist.length == 3">您已成功注册爱家读书APP，账号为您填写的手机号，初始密码是手机号后六位</div>
  </div>
</template>

<script>
import addWx from "../../components/addWx.vue";
export default {
  //props: ["infoPay"],
   components: {
    addWx
  },
  data() {
    return {
      paylist:'',
      time: 30 * 60 * 60 * 1000,
      infowx :{
         WechatID: "aijiadushu2019",
        WechatImgUrl: "https://www.liantu.com/images/2013/case/5.jpg",
      }
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
        }, {
          userId: 2,
          nickName: "爱家书友0371帅哥帅哥帅哥是嘎嘎嘎",
          avatarUrl:
            "http://fileaj.modernedu.club/20190612/ajds201906121005127.jpg",
          createTime: "10月5日 22:00"
        }, {
          userId: 3,
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
.van-dialog__header{padding-top: .625rem; margin-bottom: .446rem}
.van-dialog__message {
  font-size: 0.268rem;
  padding-top: .893rem;
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
.showTip{color:#333;font-size: .214rem;text-align:left;margin:0 auto;width:88vw;line-height: 1.4;}
.showAPP{line-height: .714rem;
    border-radius: 4px;
    display: block;
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 0.3rem;
    background-color: #d30127;}
.usersteg {
  color: #333333;
  font-size: 0.25rem;
  font-weight: 600;
  margin: .446rem 0.357rem 0;
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
