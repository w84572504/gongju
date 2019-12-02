<template>
  <div class="ilist">
  <i-list-item v-for="(item,index) in data" :key="index" :content="item"></i-list-item>
  </div>
</template>

<script>
  import iListItem from "./iListItem";
  export default {
    name: "iList",
    props:{
      data:Array
    },
    components:{
      iListItem
    }
  }
</script>

<style scoped>
.ilist{
  padding:0px 20px 0px 20px ;
  background-color: #fff;
}
</style>