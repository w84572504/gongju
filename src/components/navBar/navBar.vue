<template>
  <van-sticky>
  <div class="nav">
    <div class="left" @click="itemBack"><slot name="left"></slot></div>
    <div class="mid"><slot name="mid"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
  </van-sticky>
</template>

<script>
  export default {
    name: "navBar",
    methods:{
      itemBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .nav{
    display: flex;
    height: 49px;
    line-height: 49px;
    text-align: center;
    box-shadow: 0 1px 5px #0d8876;
    background-color: #0d8876;
    color: #FFFFFF;
    top: 0;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    /* 这代表IPX 的屏幕竖屏模式*/
    .nav{
      display: flex;
      height: 80px;
      line-height: 49px;
      padding-top: 30px;
      text-align: center;
      box-shadow: 0 1px 5px #0d8876;
      background-color: #0d8876;
      color: #FFFFFF;
      top: 0;
    }
  }
  .mid{
    flex: 1;
  }
  .left,.right{
    width: 90px;
  }

</style>