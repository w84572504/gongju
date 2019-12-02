<template>
  <div class="tabbar">
     <tab-bar-item path="/home" icon="bc-home">
       <span>首页</span>
     </tab-bar-item>
    <tab-bar-item path="/loan/list" icon="bc-invest">
      <span>出借</span>
    </tab-bar-item>
    <tab-bar-item path="/news" icon="bc-news">
      <span>发现</span>
    </tab-bar-item>
    <tab-bar-item path="/user" icon="bc-user">
      <span>我的</span>
    </tab-bar-item>
  </div>
</template>

<script>
  import tabBarItem from "./tabBarItem";

  export default {
    name: "tabBar",
    components:{
      tabBarItem,
    },
    data(){
      return{
        curIndex:0
      }
    }
  }
</script>

<style scoped>
  .tabbar{
    height: 49px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 1px lightgray;
    display: flex;
    position: fixed;
  }
</style>