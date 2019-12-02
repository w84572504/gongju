<template>
  <div class="pass">
      <div class="inputPass">
        <input :type="typePass" placeholder="请输入大小写6-16位字母或数字组合"  key="pass1" v-model="password">
        <span class="iconfont " :class="getEye" @click="eyeClick"></span>
      </div>

  </div>
</template>

<script>
  export default {
    name: "passLogin",
    data(){
      return{
        eyes:true,
        password:''
      }
    },
    methods:{

      eyeClick(){
        this.eyes = !this.eyes
      },
    },
    computed:{
      getEye(){
        return this.eyes ? ['bc-eye'] :['bc-ceye']
      },
      typePass(){
        return this.eyes ? 'text' :'password'
      }
    }
  }
</script>

<style scoped>

input{
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
  padding: 10px 0px;
}
  .inputPass{
    position: relative;
  }
.inputPass span{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}
  .loginBtn{
    background-color: #2360ec;
    border:none;
    width: 100%;
    border-radius: 20px;
    height: 40px;
    color: #fff;
    margin-top: 50px;
    box-shadow: 0px 0px 5px #2360ec;
  }
</style>