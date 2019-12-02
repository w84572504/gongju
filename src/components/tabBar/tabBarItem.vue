<template>
  <div class="item" :class="isActive" @click="ItemClick">
      <span class="iconfont" :class="icon" ></span>
      <p><slot></slot></p>
  </div>
</template>

<script>
  export default {
    name: "tabBarItem",
    props:{
      path: String,
      icon:String
    },
    data(){
      return {
        curIndex: 0,
      }
    },
    computed:{
      isActive(){
        return this.$route.fullPath.indexOf(this.path) != -1 ? {'active':true} : ""
      }
    },
    methods:{
      ItemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
.item{
  flex: 1;
  text-align: center;
  padding-top: 6px;
  font-size: 14px;
  color: #808080;
}
  .item .iconfont{
    font-weight: bold;
    font-size: 20px;
  }
  .active{
    color: #2570f4;
  }
</style>