<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      <span >{{message}}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        message:"提示信息哦！",
        isShow : false
      }
    },
    methods:{
      show(message,loadTime=2000){
        this.isShow = true
        this.message = message
        setTimeout(()=>{
          this.isShow = false
        },loadTime)
      }
    }
  }
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 5px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.8);
  border-radius: 3px;
  z-index: 99;
  width: 70%;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>