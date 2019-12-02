<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">{{name}}</p>
      <p slot="right"></p>
    </nav-bar>
    <van-row type="flex" justify="center" style="margin-top: 10px;">
      <van-col span="22">
        <van-panel v-for="(v,i) in data" :title="i" :status="v" :key="i">
        </van-panel>
      </van-col>
    </van-row>

  </div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  import { mapGetters } from 'vuex'
  import { getEqu } from "network/user";
  export default {
    name: "Info",
    data(){
      return{
        name:"",
        code:0,
        data:{}
      }
    },
    created(){
      this.code = this.$route.query.code
      this._getEqu()
    },
    components:{
      navBar
    },
    methods:{
      ...mapGetters([ 'getUserInfo', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      _getEqu(){
        getEqu({bh:this.code,text:1}).then(res=>{
          if (res.status == 1){
            this.data = res.data
            this.name = res.data['工器具名称']
          }else{
            this.$toast.show("暂无数据")
          }
          console.log(res);
        })
      }
    },
    computed:{
      getUser(){
        let user = JSON.parse(this.getUserInfo())
        return user.username
      },
    }
  }
</script>

<style scoped>
  .tit{
    text-align: center;
    line-height: 40px;
  }
</style>