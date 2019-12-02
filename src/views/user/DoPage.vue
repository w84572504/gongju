<template>
  <div>
    <nav-bar>
<!--      <span slot="left" class="iconfont bc-back" > </span>-->
      <p slot="mid">{{getUser}}</p>
      <p slot="right" @click="goPage">用户中心</p>
    </nav-bar>
    <div>
      <div class="headerbg"><h2 class="tit">{{getName}}</h2></div>
    </div>
    <van-row type="flex" justify="center" class="con">
      <van-col span="22">

        <van-row gutter="20" type="flex" justify="center" class="middle">
          <van-col span="18">
        <div class="gobtn" v-if="status == 1">
          <div>
            <van-button class="max"  type="primary" @click="nextPage(1)">立即入库</van-button>
          </div>
          <div>
            <van-button class="max" type="primary" @click="nextPage(4)">查看信息</van-button>
          </div>

        </div>
        <div class="gobtn" v-else-if="status == 2">
          <div>
            <van-button  class="max" type="primary" @click="nextPage(2)">实验操作</van-button>
          </div>

          <div>
            <van-button class="max" type="primary" @click="nextPage(3)">报废操作</van-button>
          </div>
          <div>
            <van-button class="max" type="primary" @click="nextPage(4)">查看信息</van-button>
          </div>
        </div>
        <div class="gobtn" v-else="btnStatus">
          <div><van-button class="max" type="primary" @click="nextPage(4)">查看信息</van-button></div>
        </div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  import { mapGetters } from 'vuex'
  import { getEqu } from "network/user"
  export default {
    name: "DoPage",
    components:{
      navBar,
    },
    data(){
      return {
        code:"",
        name,
        status:0,
        ids:0
      }
    },
    created(){
      this.code = this.$route.query.code
      this._getEqu()
    },
    methods:{
      ...mapGetters([ 'getUserInfo', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      _getEqu(){
        getEqu({bh:this.code}).then(res=>{
          this.status = res.data.status
          this.ids = res.data.bh
        })
      },
      nextPage(id){
        if (id == 4){
          this.$router.push({path:'/user/info',query:{code:this.code,ids:this.ids}})
        }else{
          this.$router.push({path:'/user/fromsub/'+id,query:{code:this.code,ids:this.ids}})
        }
      },
      goPage(){
        this.$router.replace('/user/home')
      }
    },
    computed:{
      getUser(){
        let user = JSON.parse(this.getUserInfo())
        return user.username
      },
      getUid(){
        let user = JSON.parse(this.getUserInfo())
        return user.userid
      },
      getName(){
        return this.$route.query.name
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
  /*.logo{width: 90%;margin:0 auto; margin-top: 80px;}*/
  .logo img{width: 100%;}
  .con{
    margin-top: 280px;
    width: 100%;
    overflow: hidden;
  }
  .tit{
    text-align: center;
    line-height: 200px;
  }
  .max{
    width: 100%;
    margin-top: 10px;
  }

</style>