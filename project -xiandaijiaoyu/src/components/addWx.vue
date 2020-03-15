<template>
  <div>
    <div class="van-dialog__header">班主任微信号，长按可复制</div>
    <div class="van-dialog__header" style="padding-top: 8px;padding-bottom: 15px;">{{infowx.WechatID}}</div>
    <van-image width="2.321rem" height="2.321rem" :src="infowx.WechatImgUrl" />
    <div class="van-dialog__message">扫码添加班主任微信二维码</div>
  </div>
</template>

<script>
export default {
  name: "showMoel",
  props: ["infowx"],

  mounted() {
    this.getwx();
  },
  methods: {
		getwx(){
			/* 	this.infowx = {
				WechatID: this.infoPay.WechatID,
				WechatImgUrl: this.infoPay.WechatImgUrl,
      }; */
       window.console.log("infowx2a", this.infowx);
		},
   
  
  }
};
</script>

<style scoped lang="scss">
.van-dialog__message{ padding-top: 0;}
.van-dialog__header{font-weight: 400;}
</style>
