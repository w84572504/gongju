<template>
  <div >
    <nav-bar>
      <p slot="left"><img src="~assets/img/us.png" style="height: 22px;vertical-align:middle;"> {{getUser}}</p>
      <p slot="right" @click="editPass()">修改密码</p>
    </nav-bar>
    <div class="headerbg"><div class="logo"><img src="~assets/img/title.png"></div></div>
    <div class="con">
      <van-row gutter="20" type="flex" justify="center" class="middle">
        <van-col span="18">
          <van-button type="primary" @click="searchMark" class="max" icon="scan">立即扫码</van-button>
        </van-col>
      </van-row>
      <van-row gutter="20" type="flex" justify="center" class="middle">
        <van-col span="18"><van-button type="primary" @click="goTool" class="max" icon="setting-o">工器具</van-button></van-col>
      </van-row>
      <van-row gutter="20" type="flex" justify="center" class="middle">
        <van-col span="18"><van-button @click="logout" type="warning" class="max" >立即退出</van-button></van-col>
      </van-row>
    </div>
      <van-notice-bar
              color="#1989fa"
              background="#ecf9ff"
              left-icon="info-o"
              clsass="notice"
              class="fot"
              v-if="getShowTip"
      >
        <span v-if="sytotal >0" @click="goTools(2)" class="shut">实验提醒 <i class="shu">{{sytotal}}</i></span>
        <span v-if="bftotal >0" @click="goTools(1)">报废提醒 <i class="shu">{{bftotal}}</i></span>
      </van-notice-bar>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { getLogout } from "network/login"
  import { getInfo } from "network/user"
  import { Toast } from "vant";
  export default {
    name: "Users",
    components: {
      navBar
    },
    data(){
      return{
        name:"",
        sytotal:0,
        bftotal:0
      }
    },
    created(){
      this._getInfo()
    },
    methods:{
      ...mapGetters([ 'getUserInfo', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      ...mapActions([ 'alogout',
      ]),
      searchMark(){
        this.$router.push('/user/search')
      },
      logout(){
        getLogout().then(res=>{
          if (res.status == 1){
            this.alogout();
            this.$router.replace('/login/login')
          }else{
            this.$toast.show('操作失败!')
          }
       })
      },
      goTool(){
        this.$router.push({path:'/user/tool',query:{type:0}})
      },
      _getInfo(){
        getInfo().then(res=>{
          if (res.status == 1){
            this.sytotal = res.data.sytotal > 0 ? res.data.sytotal : 0
            this.bftotal = res.data.bftotal > 0 ? res.data.bftotal : 0
          }else{
            this.$toast.show('网络连接失败!')
          }
        })
      },
      editPass(){
        this.$router.push('/user/editpass')
      },
      goTools(id){
        this.$router.push({path:'/user/tool',query:{type:id}})
      }
    },
    computed:{
      getUser(){
        let user = JSON.parse(this.getUserInfo())
        return user.username
      },
      getShowTip(){
        if(this.sytotal == 0 && this.bftotal == 0){
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .headerbg{
    background: url('~@/assets/img/header-bg.png') no-repeat fixed;
    color: #ffffff;
    background-size: 100%;
    width: 100%;
    height: 300px;
    position: fixed;
  }
  .logo{width: 90%;margin:0 auto; margin-top: 80px;}
  .logo img{width: 100%;}
  .con{
    margin-top: 260px;
    width: 100%;
    overflow: hidden;
  }
.middle{
  text-align: center;
  padding-top: 20px;
}
.shut{margin-right: 20px;}
.shu{color: #ed532e;font-weight: bold;}
  .max{
    width: 100%;
  }
.fot{
  bottom: 0;
  left: 0;
  text-align: center;
  right: 0;
  position: fixed;
}
</style>