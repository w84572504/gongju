<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="list"  @pullingDown="pullingDown" @pullingUp="pullingUp" :pullUpLoad="finished">
      <div class="content">
        <van-row type="flex" justify="center">
          <van-loading type="spinner" class="refurbish top-refurbish">下拉刷新</van-loading>
        </van-row>
        <table class="tableDiv" cellspacing=0 cellpadding=0  ref="tableDiv">
          <tr>
            <td>编号</td>
            <td>单位名称</td>
            <td>部门名称</td>
            <td>工器具名称</td>
            <td>规格型号</td>
            <td>生产厂家</td>
            <td>供应商</td>
            <td>使用地点</td>
            <td>状态名称</td>
          </tr>
          <tr v-for="(v,i) in list" :key="i" @click="getId(v.ewm)">
            <td >{{v.bh}}</td>
            <td >{{v.dwmc}}</td>
            <td >{{v.bmmc}}</td>
            <td >{{v.gqjmc}}</td>
            <td >{{v.ggxh}}</td>
            <td >{{v.sccj}}</td>
            <td >{{v.gys}}</td>
            <td >{{v.sydd}}</td>
            <td >{{v.ztmc}}</td>
          </tr>
        </table>
        <up-loding :show="refurbish" ></up-loding>
      </div>
    </scroll>
    <van-popup v-model="showPopup" closeable position="bottom" :style="{ height: '20%' }" round >
      <van-panel :title="desc"  >
          <div class="gobtn" v-if="btnStatus == 1">
            <van-button  type="primary" @click="nextPage(1)">立即入库</van-button>
            <van-button  type="primary" @click="nextPage(4)">查看信息</van-button>
          </div>
          <div class="gobtn" v-else-if="btnStatus == 2">
            <van-button   type="primary" @click="nextPage(2)">实验操作</van-button>
            <van-button  type="primary" @click="nextPage(3)">报废操作</van-button>
            <van-button  type="primary" @click="nextPage(4)">查看信息</van-button>
          </div>
        <div class="gobtn" v-else="btnStatus">
          <van-button  type="primary" @click="nextPage(4)">查看信息</van-button>
        </div>
      </van-panel>
    </van-popup>
  </div>
</template>

<script>
  import Scroll from "components/scroll/Scroll";
  import upLoding from "components/Loding/upLoding";
  import { getList,getEqu } from "network/user";
  export default {
    name: "ToolList",
    components:{
      Scroll,
      upLoding
    },
    data() {
      return {
        list:[],
        refurbish:0, //0隐藏 1显示 2 完成
        page:1,
        finished:true,
        showPopup:false,
        desc:"暂未入库，是否入库？",
        btnStatus:0,
        data:{},
        code:"",
        ids:0,
        sum:0
      }
    },
    created(){
      this._getList()
    },
    methods: {
      _getList(){
        if (this.refurbish != 3){
          this.refurbish = 1
          getList({page:this.page}).then(res =>{
            console.log(res);
            this.sum = res.total
            this.doData(res)
          })
        }

      },
      doData(res){
        this.page++
        if (res.status == 1){
          this.$refs.wrapper.finishPullDown();
          this.$refs.wrapper.finishPullUp();
          res.data.forEach(e => this.list.push(e) )
          console.log(this.list.length);
          console.log(this.sum);
          if (this.list.length >= this.sum ){
            this.finished=false
            this.refurbish = 3
          }
        }else{
          this.$toast.show('加载失败!')
        }
      },
      //下拉刷新
      pullingDown(){
        this.list.splice(0,this.list.length)
        this._getList()

      },
      //加载更多返回
      pullingUp(){
        this._getList()
      },
      getId(id){
        getEqu({bh:id}).then(res=>{
          console.log(res);
          this.code = id;
          this.ids = res.data.bh;
          this.data = res.data
          if (res.status == 1){
            this.showPopup = true
            // （status 1：等待入库 2：已入库 3：已报废）
            if (res.data.status == 1){
              this.btnStatus =1;
              this.desc = "暂未入库，是否入库？";
            }else if(res.data.status == 2){
              this.btnStatus =2;
              this.desc = "已入库，是否操作？";
            }else{
              this.btnStatus =3;
              this.desc = "已报废";
            }
          }else{
            this.$toast.show("暂无数据")
          }
        })
      },
      nextPage(id){
        if (id == 4){
          this.$router.push({path:'info',query:{code:this.code,ids:this.ids}})
        }else{
          this.$router.push({path:'fromsub/'+id,query:{code:this.code,ids:this.ids}})
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height: calc(100vh - 60px);
    overflow-y: hidden;
  }
  .refurbish{
    height: 40px;
    line-height: 49px;
    text-align: center;
    color: #737373;
    position: fixed;
  }
  .top-refurbish{
    top:-40px;
  }
  .tableDiv{
    height: 30px;
    text-align:center;
    font-size: 14px;
    width: 100%;
  }
  .tableDiv td{
    height: 80px;
    text-align: center;
    border-bottom:#eaeaea solid 1px;
  }
  .gobtn{
    float: right;
    padding-top: 20px;
    padding-right: 20px;
  }
  .gobtn button{
    margin: 0 10px;
  }
</style>