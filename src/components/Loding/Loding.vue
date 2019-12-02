<template>
  <div>
    <van-popup :value="LOADING"><van-loading size="24px" vertical>加载中...</van-loading></van-popup>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Loding",
    data(){
      return{
      }
    },
    computed: mapState([
      'LOADING'
    ])


  }
</script>

<style scoped>

</style>