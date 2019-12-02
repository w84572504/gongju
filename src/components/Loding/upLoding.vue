<template>
  <van-row type="flex" justify="center" v-show="isShow">
      <p class="refurbish" v-show="noMore">暂无更多数据</p>
      <van-loading class="refurbish" v-show="getMore" >上拉加载更多</van-loading>
  </van-row>
</template>

<script>
  export default {
    name: "upLoding",
    props:{
      show:{
        type:Number,
        default:0
      },
    },
    computed:{
      isShow(){
        if (this.show !==0){
          return true
        }else{
          return false
        }
      },
      noMore(){
        if (this.show == 3){
          return true
        }else{
          return false
        }
      },
      getMore(){
        if (this.show == 3){
          return false
        }else{
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .refurbish{
    height: 40px;
    line-height: 49px;
    text-align: center;
    color: #737373;
    position: fixed;
  }
</style>