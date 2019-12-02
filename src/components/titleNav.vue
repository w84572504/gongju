<template>
  <div class="title">
    <van-cell-group :border="false" >
      <van-cell  :to="link" title-class="titleClass" value-class="valueClass" label-class="labelClass" :label="lable">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">{{title}}</span>
        </template>
        <template slot="default" v-if="isright">
          <span class="custom-title">更多<span class="iconfont bc-arrow_right"></span></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: "titleNav",
    data(){
      return{
      }
    },
    props:{
      title:String,
      link:String,
      lable:String,
      isright:{
        type:Boolean,
        default(){
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .title{
    padding-top: 10px;
  }
  .titleClass{
    font-size: 18px;
    font-weight: 700;
  }
  .valueClass{
    padding-right: 10px;
  }
  .labelClass{
    font-weight: normal;
  }
</style>