<template>
  <div>
    <nav-bar>
      <p slot="mid">工器具管理</p>
    </nav-bar>
    <div class="login-type">
<!--      <div class="login-btn" v-for="(v,i) in loginType" :key="i" @click="LoginType(i)" :class="changeA(i)">-->
<!--        <span>-->
<!--          {{v}}-->
<!--        </span>-->
<!--      </div>-->
    </div>
    <div class="pass">
      <input type="text" placeholder="请输入账号" key="phone1" v-model="username">
    </div>
      <login-pass ref="loginpass"></login-pass>
<!--      <login-code v-else ref="logincode" :phone="phone" :type="login_type"></login-code>-->
    <button class="loginBtn" @click="sendPass">立即登录</button>
<!--    <login-bar>-->
<!--      <span slot="loginLeft"><router-link to="/login/register">立即注册</router-link></span>-->
<!--      <span slot="loginRight"><router-link to="/login/editpass">忘记密码</router-link></span>-->
<!--    </login-bar>-->
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import loginPass from "./LoginItem/loginPass";

  import {getLogin} from "network/login"
  import { mapActions } from 'vuex'
  export default {
    name: "Login",
    components:{
      navBar,
      loginPass,
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
        if ( this.password.length >= 6){
          getLogin(this.username,this.password).then(res=>{
            if (res.status == 1){
              this.alogin(res.data.sign)
              this.uinfo(res.data)
              this.$router.replace('/user/home')
            }else{
              this.$toast.show(res.msg)
            }
          })
        }else{
          this.$toast.show('密码有误!')
        }

      }
    },
  }
</script>

<style scoped>
  .login-type{
    display: flex;
    text-align: center;
    padding-top: 30px;
    color: var(--color-text);
    padding-bottom: 50px;
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
    padding: 20px;
  }
  .pass input{
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    padding: 10px 0px;
  }
  .loginBtn{
    background-color: #2360ec;
    border:none;
    width: 80%;
    border-radius: 20px;
    height: 40px;
    color: #fff;
    margin-top: 50px;
    box-shadow: 0px 0px 5px #2360ec;
    transform: translate(10%,10%);
  }
</style>