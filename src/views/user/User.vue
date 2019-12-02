<template>
  <div >
    <nav-bar>
      <p slot="mid">工器具管理</p>
      <p slot="right" @click="editPass()">修改密码</p>
    </nav-bar>
    <div class="con">
      <van-row gutter="20" type="flex" justify="center" class="middle">
        <van-col span="12">用户姓名：{{getUser}}</van-col>
      </van-row>
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
      >
        <span v-if="sytotal">【实验提醒已入库】</span>
        <span v-if="bftotal">【报废提醒】</span>
      </van-notice-bar>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { getLogout } from "network/login"
  import { getInfo } from "network/user"
  export default {
    name: "Users",
    components: {
      navBar
    },
    data(){
      return{
        name:"",
        sytotal:false,
        bftotal:false
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
        this.$router.push('/user/tool')
      },
      _getInfo(){
        getInfo().then(res=>{
          if (res.status == 1){
            this.sytotal = res.data.sytotal > 0 ? true : false
            this.bftotal = res.data.bftotal > 0 ? true : false
          }
        })
      },
      editPass(){
        this.$router.push('/user/editpass')
      }
    },
    computed:{
      getUser(){
        let user = JSON.parse(this.getUserInfo())
        return user.username
      }
    }
  }
</script>

<style scoped>
  .con{
    width: 100%;
    overflow: hidden;
  }
.middle{
  text-align: center;
  padding-top: 30px;
}
  .max{
    width: 100%;
  }
.fot{
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
}
</style>