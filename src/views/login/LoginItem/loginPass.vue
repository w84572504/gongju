<template>
  <div class="pass">
      <div class="inputPass">
          <label for="password">
              <img src="~assets/img/password.png" alt="">
          </label>
        <input :type="typePass" placeholder="请输入登录密码"  key="pass1" v-model="password">
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
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #FFFFFF;
        font-size: 16px;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #FFFFFF;
        font-size: 16px;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #FFFFFF;
        font-size: 16px;
    }
input{
    outline: none;
    border: 0;
    background-color: transparent;
    color: #ffffff;
    height: 40px;
    font-size: 16px;
    width: 80%;
    margin-left: 12%;
}
  .inputPass{
    position: relative;
  }
.inputPass label img {
    width: 25px;
    position: absolute;
    margin-top: 5px;
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