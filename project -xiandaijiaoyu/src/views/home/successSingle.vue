<template>
  <div id="susSingle">
    <p style="font-weight: 600; margin-bottom: 0.21rem;">
      您已经成功报名7天亲子训练营课程
      <br />添加班主任微信，可立即入班
    </p>
    <addWx :infowx="infowx" />
    <p style="color:#999;font-size: .214rem">可在【我的】-【我的已购】-【已购课程】里查看</p>
  </div>
</template>

<script>
import addWx from "../../components/addWx.vue";
export default {
  components: {
    addWx
  },

  data() {
    return {
      infowx: JSON.parse(this.$route.query.infowx)
    };
  },
  mounted() {
    this.getwx();
  },
  methods: {
    getwx() {
      /* 	this.infowx = {
				WechatID: this.$route.query.WechatID,
				WechatImgUrl: this.$route.query.WechatImgUrl,
      };  */
      window.console.log("infowx2s", this.infowx);
    }
  }
};
</script>

<style>
#susSingle {
  color: #333;
  font-size: 0.268rem;
  font-weight: 600;
  margin-top: 0.804rem;
line-height: 28px;
}
</style>
