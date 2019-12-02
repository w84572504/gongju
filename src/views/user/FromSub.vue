<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">{{name}}</p>
      <p slot="right"></p>
    </nav-bar>
    <div>
      <from-in v-if="id == 1" :name="name" :uid="getUid" :ids="getPid"></from-in>
      <from-test v-else-if="id == 2" :name="name" :uid="getUid" :ids="getPid"></from-test>
      <from-bad v-else :name="name" :uid="getUid" :ids="getPid"></from-bad>
    </div>
  </div>
</template>

<script>
  import navBar from "components/navBar/navBar";
  import FromBad from "./userItem/FromBad";
  import FromIn from "./userItem/FromIn";
  import FromTest from "./userItem/FromTest";
  import { getEqu } from "network/user"
  import { mapGetters } from 'vuex'
  export default {
    name: "FromSub",
    components:{
      navBar,
      FromBad,
      FromIn,
      FromTest
    },
    data(){
      return {
        id:0,
        code:"",
        name,
        ids:0
      }
    },
    created(){
      this.id = this.$route.params.id
      this.code = this.$route.query.code
      this._getEqu()
    },
    methods:{
      ...mapGetters([ 'getUserInfo', // 将 `this.alogin()` 映射为 `this.$store.dispatch('alogin')`
      ]),
      _getEqu(){
        getEqu({bh:this.code}).then(res=>{
          if (res.status == 1){
            this.name = res.data.name
          }else{
            this.$toast.show("获取信息失败")
          }
        })
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
      getPid(){
        return this.$route.query.ids
      }
    }
  }
</script>

<style scoped>

</style>