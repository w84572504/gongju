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
  import Toast from "components/Toast/Toast";
  export default {
    name: 'home',
    components: {
      User,
      Loading,
        Toast,
    },
  }
</script>
<style>
  @import url('assets/css/base.css');

</style>
