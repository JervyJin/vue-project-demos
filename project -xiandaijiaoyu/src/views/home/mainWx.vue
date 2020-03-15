<template>
  <div class="home">
    <div id="susGroup">
      <div id="noUser" v-if="userRegStatus == 0">
        <div
          class="van-dialog__message"
          v-if="groupStatus == 2"
          style=" font-size: .304rem;font-weight: 600;"
        >拼团已满</div>
         <div
          class="van-dialog__message"
          v-if="groupStatus == 3"
          style=" font-size: .304rem;font-weight: 600;"
        >拼团已结束</div>
        <div class="van-dialog__message" v-else>
          剩余
          <span v-if="trainingCampGroup.length == 1">2</span>
          <span v-else-if="trainingCampGroup.length == 2">1</span> 个名额，
          <van-count-down :grouptime="grouptime" />后结束
        </div>
        <div class="weui-flex usersteg">
          <div class="weui-flex__item" v-for="user in trainingCampGroup" :key="user.userId">
            <div class="topImg">
              <van-image round width="0.714rem" height="0.714rem" :src="user.avatarUrl" />
              <span v-if="user.groupRole== 1">团长</span>
            </div>
            <p>{{user.nickName}}</p>
          </div>
          <div class="weui-flex__item" v-if="trainingCampGroup.length == 1 || trainingCampGroup.length == 2">
            <img src="@/assets/images/qyq.png" class="steg" />
          </div>
          <div class="weui-flex__item" v-if="trainingCampGroup.length == 1">
            <img src="@/assets/images/qyq.png" class="steg" />
          </div>
        </div>
        <div style="margin:0px 30px 25px;">
          <van-button
            color="#d30127"
            size="large"
            @click="goBottom"
            v-if="groupStatus == 2"
          >拼团已满，去开团</van-button>
           <van-button
            color="#d30127"
            size="large"
            @click="goBottom"
            v-if="groupStatus == 3"
          >拼团结束，重新开团</van-button>
          <van-button color="#d30127" size="large" @click="goBottom" v-else>去参团</van-button>
        </div>
      </div>
      <div id="oldUser" v-else-if="userRegStatus == 1">
        <div
          class="van-dialog__message"
          v-if="trainingCampGroup.length == 3"
          style=" font-size: .304rem;font-weight: 600;"
        >
          您已是爱家读书APP的会员
          <br />
          可直接{{infoGroup.priceSingle}}元开团课程
        </div>
        <div style="margin:0px 30px 25px;">
          <van-button color="#d30127" size="large" @click="goBottom">去开团</van-button>
        </div>
      </div>
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
    </div>
    <div class="tips">
       <p style="font-size:0.3rem">{{homeList.trainingCampName}}</p>
        <p style="font-size:0.2rem">{{homeList.trainingCampContent}}</p>
    </div>

    <van-tabs swipeable sticky v-model="active">
      <van-tab title="简介">
        <Brief :info="info" />
      </van-tab>
      <van-tab title="课程">
        <!-- TODO:动态绑定数据courseList数据，子组件通过props接收数据 -->
        <Course :course-list="courseList" />
      </van-tab>
      <van-tab title="往期评论">
        <Comment />
      </van-tab>
      <!--  <van-tab v-for="(item, index) in tabs" :title="item.title" :key="index" @click="toListen">内容 {{ index }}</van-tab> -->
    </van-tabs>

    <van-tabbar v-if="payStatus == 0">
      <van-tabbar-item id="toListen" @click="toListen">
        <img src="@/assets/images/st.png" alt srcset />试听
      </van-tabbar-item>
      <van-tabbar-item @click="paySingle" is-link>
        单独购买
        <span>{{priceSingle}}</span> 元
      </van-tabbar-item>
      <van-tabbar-item @click="payGroup" is-link>
        邀新人拼团
        <span>{{priceGroup}}</span> 元
      </van-tabbar-item>
    </van-tabbar>

    <div class="showMoel">
      <van-popup v-model="show" round position="bottom">
        <paySingle :infoSingle="infoSingle" />
      </van-popup>
      <van-popup v-model="showG" round position="bottom">
        <payGroup :infoGroup="infoGroup" />
      </van-popup>

      <van-popup v-model="showP">
        <div class="telInfo">
          <label>
            手机号
            <input v-model="moblie" name="moblie" class="inputNum" type="number" value placeholder="请输入手机号" maxlength="11" />
            <span class="codetxt" type="button" :disabled="disabled" @click="sendcode">{{btntxt}}</span>
          </label>
        </div>
        <div class="telInfo">
          <label>
            验证码
            <input v-model="code" name="code" class="code" type="number" value placeholder="验证码"  maxlength="6" />
          </label>
        </div>
        <div style="margin:0px 20px 25px;">
          <van-button color="#d30127" size="large"  @click="goLogin" style="border-radius: 4px;margin-bottom:10px;">确定</van-button>
          <p style="color:#999;font-size:0.2rem;">
            确定即表示您已同意
            <a style="color:#999;"  href="http://www.modernedu.club/ajdswebmanager/statics/html/rule/fuwu-rule.html">《爱家读书用户服务协议》</a>
          </p>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Brief from "./components/Brief.vue";
import Course from "./components/Course.vue";
import Comment from "./components/Comment.vue";
import paySingle from "../../components/paySingle.vue";
import payGroup from "../../components/payGroup.vue";
import { getUrlKey } from "../../assets/getUrlParam.js";

export default {
  name: "home",
  components: {
    Brief,
    Course,
    Comment,
    paySingle,
    payGroup
  },
  data() {
    return {
      active: 0,
      show: false,// 单独购买弹框
      showG: false,//拼团    
      showP: false, //录手机号
      payType:'',
      grouptime: 30 * 60 * 60 * 1000,
      userId: "",
      userRegStatus: 0, //邀新人参团 默认0，输手机号确认是老人 1   
      getCode: '',  //从后台获取的验证码
      code: '',
      moblie: '',
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      infoSingle: "",
      infoGroup: "",
      infoPay: "",
      infowx: "",
      payUserNum: "",
      info:'',
      subUrl:
        "http://fileaj.modernedu.club/bookImage/20191114/e095a3d371cf49a09b81e33ae41225c2.png",

      priceSingle: "9.9", //单独购买9.9
      priceGroup: "0.1", //团购0.1
      payStatus: 0, //0：未购买 1：已购买 2：拼团中 3：拼团成功 4:失败
      trainingCampGroup:  '', //拼团人
      groupStatus:'',//拼团状态
      courseList: '',
      /*******************************************************************************************************/
      homeList:{},
      num:""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
     // this.inviteUserId = getUrlKey("inviteUserId"); //有值返回值 否则undefined
     let trainingCampGroupId = getUrlKey("trainingCampGroupId");
      this.http
        .post("/trainingCampService/getTrainingCampGroupInfo", {
          trainingCampId: 1,trainingCampGroupId:trainingCampGroupId
        })
        .then(res => {
          console.log(res);
          this.homeList = res.result.trainingCampInfo
          this.num = res.result.userPayCount
          this.trainingCampGroup = res.result.trainingCampGroup
          this.groupStatus = res.result.groupStatus
        });

      window.console.log("userId", this.userId);
      this.infoSingle = {
        subTitle: this.subTitle,
        subUrl: this.subUrl,
        WechatID: this.info.WechatID,
        WechatImgUrl: this.info.WechatImgUrl,
        priceSingle: this.priceSingle
      };
      this.infoGroup = {
        subTitle: this.subTitle,
        subUrl: this.subUrl,
        priceSingle: this.priceGroup,
        payStatus: this.payStatus,
        WechatID: this.info.WechatID,
        WechatImgUrl: this.info.WechatImgUrl,
        payUserNum: this.trainingCampGroup.length
      };
      this.infoPay = {
        subTitle: this.subTitle,
        subUrl: this.subUrl,
        trainingCampGroup: this.trainingCampGroup,
        payStatus: this.payStatus,
        WechatID: this.info.WechatID,
        WechatImgUrl: this.info.WechatImgUrl,
        payUserNum: this.trainingCampGroup.length
      };

      this.infowx = {
        WechatID: this.info.WechatID,
        WechatImgUrl: this.info.WechatImgUrl
      };
      window.console.log("infoSingle", this.infowx);
    },
    toListen() {
      this.active = 1;
      //this.$router.push("listen");
    },
    paySingle() {
      if (this.userId == "" || this.userId == undefined) {
        this.showP = true;
        this.payType=1;
      } else {
        this.show = true;
        this.payType=2;
      }
    },
    payGroup() {
      if (this.userId == "" || this.userId == undefined) {
        this.showP = true;
      } else {
        this.showG = true;
      }
    },

    goBottom() {
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      );
    },
    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.moblie == "") {
        this.$toast("手机号不能为空");
      } else if (!reg.test(this.moblie)) {
        this.$toast("手机号格式不正确");
      } else {
        this.time = 60;
        this.disabled = true;
        //验证码的时间设置 可有可无
        this.timer();
        //手机号获取后调取接口
        this.http
          .post("/trainingCampService/sendSMS", { moblie: this.moblie,mark:3})
          .then(res => {
            console.log(res)
            // if (res.status != 200) {
            //   this.$toast("网络错误");
            // } else if (res.status == 200) {
            //   if (res.data.error == null && res.data.result == true) {
            //     //this.$toast("请注意接收验证码");
            //     this.getCode=res.data;
            //   } else if (res.data.error != null && res.data.result == null) {
            //     this.$toast(res.data.error.msg);
            //   }
            // }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //验证码的倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    goLogin() {
     var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.moblie == "") {
        this.$toast("手机号不能为空");
      } else if (!reg.test(this.moblie)) {
        this.$toast("手机号格式不正确");
      }  else if (this.code == "") {
        this.$toast("验证码不能为空");
        return false;
      }else {     
        // this.$toast('token='+token);
        //var that=this // 放置指针，便于then操作的获取
        this.http
        .post("/trainingCampService/userLogin", { moblie: this.moblie,smsCode:this.code })
          .then(
            function(res) {
              if (res.data.code == 200) {
                console.log(res.data.data);
                this.userRegStatus = res.data.userRegStatus; //给用户状态
                if(this.payType == 1){
                   this.showP = false;
                  this.show = true;
                } else if(this.payType == 2){
                  this.showP = false;
                  this.showG = true;
                }
              } else {
                this.$toast(res.data.message);
              }
            }.bind(this))
         .catch(function(error) {
            console.log("请求失败" + error);
          });
         // e.preventDefault();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  // position: relative;
  #susGroup {
    .van-dialog__header {
      margin-top: 0.536rem;
      margin-bottom: 0.446rem;
    }
    .van-dialog__message {
      font-size: 0.268rem;
      padding-top: 0.804rem;
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
      margin: 0.357rem 0.536rem 0.446rem;
      font-size: 0.214rem;
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
  }
  .tips {
    padding: 0.357rem 0.536rem 0.1rem;
    border-top: 0.179rem solid #f7f7f7;
    p {
      color: #333;
      line-height: 0.38rem;
      text-align: left;
    }
  }
  .telInfo {
    font-size: 0.214rem;
    padding: 0.268rem 0.268rem 0;
    position: relative;
    text-align: left;
    input {
      width: 100%;
      line-height: 1;
      border-bottom: 1px solid #f7f7f7;
      border-width: 0 0 1px;
      display: block;
      font-size: 0.268rem;
      padding: 15px 0;
    }
    .codetxt {
      position: absolute;
      z-index: 100;
      right: 15px;
      bottom: -70px;
      border-radius: 4px;
      padding: 5px 10px;
      background-color: #f7f7f7;
      color: #999999;
      border: 1px solid #d9d9d9;
    }
  }
  .telInfo:first-of-type {
    padding-top: 0.536rem;
  }
  .van-tabbar {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    #toListen {
      color: #333;
      font-size: 0.25rem;
    }
    #toListen img {
      width: 0.393rem;
      margin-right: 0.089rem;
      margin-bottom: 5px;
    }
    .van-tabbar-item {
      font-size: 12px;
      color: #fff;
      line-height: 0.893rem;
    }
    .van-tabbar-item span {
      font-size: 0.357rem;
      font-weight: 600;
    }

    .van-tabbar-item:nth-of-type(2) {
      background-color: #ffaa45;
    }
    .van-tabbar-item:nth-of-type(3) {
      background-color: #d30127;
    }
  }
}
</style>