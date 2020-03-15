<template>
  <div class="home">
    <div class="top-img">
      <img :src="homeList.coverImageUrl" alt srcset />
      <div class="tips">
        <p style="font-size:0.3rem">{{homeList.trainingCampName}}</p>
        <p style="font-size:0.2rem">{{homeList.trainingCampContent}}</p>
      </div>
    </div>
    <div class="banner">
      <div class="title">
        <p>
          已更新
          <span>{{ this.courseList.length }}</span> 课程
        </p>
        <p>
          <span>{{ num }}</span> 人已报名
        </p>
      </div>
      <div class="line"></div>
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
        <Comment :common="commentsList"/>
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

    <van-tabbar v-else-if="payStatus == 1" class="bottomTag" style="background-color: #d30127;">
      <van-tabbar-item @click="toaddWx" is-link>已购买，去添加班主任微信</van-tabbar-item>
    </van-tabbar>

    <van-tabbar v-else-if="payStatus == 3" class="bottomTag" style="background-color: #d30127;">
      <van-tabbar-item @click="payInfo" is-link>拼团成功</van-tabbar-item>
    </van-tabbar>

    <van-tabbar v-else-if="payStatus == 2">
      <van-tabbar-item id="toListen" @click="toListen">
        <img src="@/assets/images/st.png" alt srcset />试听
      </van-tabbar-item>
      <van-tabbar-item @click="paySingle" is-link>
        单独购买
        <span>{{priceSingle}}</span> 元
      </van-tabbar-item>
      <van-tabbar-item @click="payInfo" is-link>拼团中</van-tabbar-item>
    </van-tabbar>

    <van-tabbar v-else-if="payStatus == 4">
      <van-tabbar-item id="toListen" @click="toListen">
        <img src="@/assets/images/st.png" alt srcset />试听
      </van-tabbar-item>
      <van-tabbar-item @click="paySingle" is-link>
        单独购买
        <span>{{priceSingle}}</span> 元
      </van-tabbar-item>
      <van-tabbar-item @click="payInfo" is-link>拼团失败</van-tabbar-item>
    </van-tabbar>

    <div class="showMoel">
      <van-popup v-model="show" round position="bottom">
        <paySingle :infoSingle="infoSingle" />
      </van-popup>
      <van-popup v-model="showG" round position="bottom">
        <payGroup :infoGroup="infoGroup" />
      </van-popup>
      <van-popup v-model="showI" round position="bottom">
        <payInfo :infoPay="infoPay" />
      </van-popup>
      <van-popup v-model="showC">
        <addWx :infowx="infowx" />
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
import payInfo from "../../components/payInfo.vue";
import addWx from "../../components/addWx.vue";
import { getUrlKey } from "../../assets/getUrlParam.js";

export default {
  name: "home",
  components: {
    Brief,
    Course,
    Comment,
    paySingle,
    payGroup,
    payInfo,
    addWx
  },
  data() {
    return {
      active: 0,
      show: false,
      showG: false,
      showI: false,
      showC: false,
      userId: "",
      infoSingle: {},
      infoGroup: {},
      infoPay: {},
      infowx: {},
      payUserNum: "",
      

      subUrl:
        "http://fileaj.modernedu.club/bookImage/20191114/e095a3d371cf49a09b81e33ae41225c2.png",
      // subTitle: "7天亲子教育线上训练营",
      // subSpread: "7天学会和孩子更好相处",
      priceSingle: "0.01",
      priceGroup: "0.01",
      payStatus: "", //0：未购买 1：已购买 2：拼团中 3：拼团成功 4:失败
      trainingCampGroup:  '', //拼团人
      groupStatus:'',//拼团状态
      info: { },
      
      /*******************************************************************************************************/
      homeList: {},
      num: "",
      courseList: [],
      commentsList:[]
    };
  },
  mounted() {
    this.getUserInfo();
    // console.log(this.userId)
    
  },
  methods: {
    getUserInfo() {
      // debugger
      this.userId = getUrlKey("userId"); //有值返回值 否则undefined
      this.saleType = getUrlKey("saleType"); //有值返回值 否则undefined
      //已购课程 直接吊起拼团弹框
      if (this.saleType == 1) {
        this.showI = true;
      }

      this.http
        .post("/trainingCampService/getTrainingCampInfo", {
          trainingCampId: 1,
          userId:this.userId
        })
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            this.homeList = res.result.trainingCampInfo;
            this.commentsList = res.result.commentsList;
            this.num = res.result.userPayCount;
            this.courseList = res.result.programList
            this.homeList.coverImageUrl="http://fileaj.modernedu.club/carouselImage/20190928/70840e3dd70945fb8d568061a15f3dcc.png"
          }else{
            this.$toast({message:res.msg})
          }

          this.info={
            textAreaContent:this.homeList.trainingCampTextareaContent
          };
          this.infoSingle = {
            subTitle: this.homeList.trainingCampName,
            groupId:this.homeList.trainingCampId,
            subUrl: this.subUrl,
            WechatID: this.info.WechatID,
            WechatImgUrl: this.info.WechatImgUrl,
            priceSingle: this.priceSingle
          };
          this.infoGroup = {
            subTitle: this.homeList.trainingCampName,
            groupId:this.homeList.trainingCampId,
            subUrl: this.subUrl,
            priceSingle: this.priceGroup,
            payStatus: this.homeList.userTrainingCampStatus,
            WechatID: this.info.WechatID,
            WechatImgUrl: this.info.WechatImgUrl,
            payUserNum: this.trainingCampGroup.length
          };
          this.infoPay = {
            subTitle: this.homeList.trainingCampName,
            groupId:this.homeList.trainingCampId,
            subUrl: this.subUrl,
            trainingCampGroup: this.trainingCampGroup,
            payStatus: this.payStatus,
            WechatID: this.info.WechatID,
            WechatImgUrl: this.info.WechatImgUrl,
            payUserNum: this.trainingCampGroup.length
          };
        });

      this.infowx = {
        WechatID: this.info.WechatID,
        WechatImgUrl: this.info.WechatImgUrl
      };
    },
    toListen() {
      this.active = 1;
      //this.$router.push("listen");
    },
    paySingle() {
      this.show = true;
    },
    payGroup() {
      this.showG = true;
    },
    payInfo() {
      this.showI = true;
    },
    toaddWx() {
      this.showC = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  // position: relative;
  .top-img {
    position: relative;
    .tips {
      position: absolute;
      bottom: 0.08rem;
      left: 0.3rem;
      p {
        color: #ffffff;
        line-height: 0.38rem;
        text-align: left;
      }
    }
  }
  .banner {
    font-size: 0.21rem;
    position: relative;
    .title {
      display: flex;
      p {
        flex: 1;
        line-height: 0.78rem;
        color: #999999;
        background: #f7f7f7;
        span {
          font-size: 0.3rem;
          color: #333333;
        }
      }
    }
    .line {
      height: 0.375rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      background-color: #e6e6e6;
    }
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