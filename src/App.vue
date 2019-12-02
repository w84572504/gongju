<template>
  <div id="app">
<!--    <keep-alive>-->
      <router-view/>
      <loading />
<!--    </keep-alive>-->
  </div>
</template>

<script>
  import User from "./views/user/User";
  import Loading from "components/Loding/Loding";
  export default {
    name: 'home',
    components: {
      User,
      Loading
    },
  }
</script>
<style>
  @import url('assets/css/base.css');

</style>
