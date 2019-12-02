<template>
  <div class="login-bg">

    <div class="logo"><img src="~assets/img/title.png"></div>
    <div class="pass">
      <label for="username">
        <img src="~assets/img/user.png">
      </label>
      <input type="text" placeholder="请输入登录账号" key="phone1" v-model="username">
    </div>
      <login-pass ref="loginpass"></login-pass>
    <button class="loginBtn" @click="sendPass">立即登录</button>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import loginPass from "./LoginItem/loginPass";
  import {getLogin} from "network/login"
  import { mapActions } from 'vuex'
  import { Toast } from 'vant';
  export default {
    name: "Login",
    components:{
      navBar,
      loginPass
    },
    data(){
      return{
        curIndex:0,
        loginType:['立即登录'],
        username: '',
        login_type:1
      }
    },
    created(){
      if (this.$store.state.sign){
        this.$router.replace('/user/home')
      }
    },
    methods:{
      ...mapActions([ 'alogin','uinfo', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      sendPass(){
        this.password = this.$refs.loginpass.password
        if(this.username==''){
          Toast('请输入登录用户名')
          return false
        }
        if(this.password==''){
          Toast('请输入登录密码')
          return  false
        }

        getLogin(this.username,this.password).then(res=>{
          if (res.status == 1){
            this.$toast.show('登录成功')
            this.alogin(res.data.sign)
            this.uinfo(res.data)
            this.$router.replace('/user/home')
          }else{
            Toast(res.msg)
          }
        })
      }
    },
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
  .logo{
    top:50%;
    text-align: center;
    padding: 150px 0 50px 0;
    color: #FFF;
      text-align: center;
      font-size: 28px;
      font-weight: 800px;
  }
.logo img{width: 90%;}
  .login-bg {
    background: url('~@/assets/img/login-bg.jpg') no-repeat fixed;
    color: #ffffff;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .login-btn{
    flex: 1;
    height: 24px; line-height: 24px;
  }
  .active span{
    border-bottom: 3px solid #215eec;
    padding-bottom: 10px;
  }
  .pass{
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    margin-top: 5%;
    padding: 0 10px;
    border-radius: 20px;
    color: #ffffff;
    background-color: #0bb79e;
  }
  .pass label img {
    width: 25px;
    position: absolute;
    margin-top: 5px;
  }
  .pass input{
    outline: none;
    border: 0;
    background-color: transparent;
    color: #FFF;
    height: 40px;
    font-size: 16px;
    width: 90%;
    margin-left: 12%;
  }
  .loginBtn{
    background-color: #ff7937;
    color: #FFF;
    font-size: 18px;
    border:none;
    width: 80%;
    border-radius: 20px;
    height: 40px;
    margin-top: 50px;
    box-shadow: 0px 0px 5px #ff7937;
    transform: translate(10%,10%);
  }
</style>