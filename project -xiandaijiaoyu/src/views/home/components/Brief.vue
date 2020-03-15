<template>
  <div class="brief">
    <p>{{info.textAreaContent}}</p>
    <!-- <p>购买后请添加班主任微信号</p>
    <span id="WechatID">{{info.WechatID}}</span>
    <p>根据学习时间选择班次，排班入学哦</p>

    <ul class="over">
      <li v-for="user in info.users" :key="user.id">
        <span v-if="user.status == 0">【第{{user.openID}}期】{{ user.num }}人已招满</span>
        <p v-else-if="user.status == 1">【第{{user.openID}}期】{{ user.num }}人正在招募</p>
        </li>
    </ul>
 
    <p>仅剩 {{info.remainNum}}+席！</p>
    <p>
      开营时间：
      <span>{{info.openTime}}</span>
    </p>
    <img :src="info.imgUrl" alt srcset />
    <p style="font-size:0.21rem;color:#999;">上拉查看所有课程</p> -->
  </div>
</template>

<script>
export default {
  props:['info'],
  data() {
    return {
    
    };
  },
  methods: {
  
  }
};
</script>

<style lang="scss" scoped>
.brief {
  padding-top: 0.446rem;
  padding-bottom: 1.161rem;
  font-size: 0.268rem;
  color: #333333;
  line-height: 1.2;
  p + p {
    margin-top: 0.357rem;
  }
  #WechatID {
    display: inline-block;
    font-weight: 600;
    margin: 0.268rem auto;
  }
  .over {
    margin-bottom: 0.357rem;
  }
  .over,
  .over li {
    margin-top: 0.357rem;
  }

  .over li span{text-decoration: line-through;
    font-size: 0.214rem;
    color: #999;}
  img {
    margin: 0.268rem auto;
  }
}
</style>
