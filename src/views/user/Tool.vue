<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">工器具列表</p>
    </nav-bar>
    <tool-list :type = "getType"></tool-list>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import ToolList from "./userItem/ToolList";
  export default {
    name: "Tool",
    components: {
      navBar,
      ToolList
    },
    data(){
      return{
        name:"",
      }
    },
    created(){
    },
    methods:{
    },
    computed:{
      getType(){
        return  this.$route.query.type
      }
    }
  }
</script>

<style scoped>



</style>