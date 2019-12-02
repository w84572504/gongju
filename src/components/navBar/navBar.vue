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
    box-shadow: 0 1px 5px #f7f7f7;
    background-color: #fff;
    top: 0;
  }
  .mid{
    flex: 1;
  }
  .left,.right{
    width: 90px;
  }

</style>