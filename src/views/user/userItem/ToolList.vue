<template>
  <div>
    <scroll class="wrapper" ref="wrapper" :data="list"  @pullingDown="pullingDown" @pullingUp="pullingUp" :pullUpLoad="finished">
      <div class="content" style="background-color: #eaeaea">
        <van-row type="flex" justify="center">
          <van-loading type="spinner" class="refurbish top-refurbish">下拉刷新</van-loading>
        </van-row>
        <div class="guazai">
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="fl" :options="option.fl" @change="getNewList()" :get-container="getContainer"/>
            <van-dropdown-item v-model="gys" :options="option.gys" @change="getNewList()" :get-container="getContainer"/>
            <van-dropdown-item v-model="zt" :options="option.zt" @change="getNewList()" :get-container="getContainer"/>
          </van-dropdown-menu>
        </div>

        <van-panel v-for="(v,i) in list" :key="i" @click="getId(v.ewm)" style="margin-bottom: 5px;">
          <div slot="header">
            <div style="height: 50px; line-height: 50px;font-size: 14px;">
              <span style="float: left;padding-left: 10px;" >【{{v.bh}}】 {{v.gqjmc}}</span>
              <span style="float: right;padding-right: 8px;font-size: 12px;color: #ed532e;"><van-tag :type="setColor(v.zt)">{{v.ztmc}}</van-tag></span>
            </div>
            <div style="clear: both;border:0.5px solid #eaeaea;"></div>
          </div>

          <div class="div_text">
            <div class="div_name">编   号:</div>
            <div class="div_name">部门:{{v.bmmc}}</div>
            <div class="div_name">规格型号:{{v.ggxh}}</div>
            <div class="div_name">生产厂家:{{v.sccj}}</div>
            <div class="div_name">供 应 商:{{v.gys}}</div>
            <div class="div_name">使用地点:{{v.sydd}}</div>
          </div>
        </van-panel>
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
  import { getList,getEqu,getType } from "network/user";
  import { Toast } from 'vant'
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
        type:0,
        finished:true,
        showPopup:false,
        desc:"未入库！请选择操作！",
        btnStatus:0,
        data:{},
        code:"",
        ids:0,
        sum:0,
        option:{fl:[{value:'-1',text:"分类"}],gys:[{value:'-1',text:"供应商"}],zt:[{value:'-1',text:"状态"}]},
        fl:"-1",
        gys:"-1",
        zt:"-1",
      }
    },
    created(){
      if (this.$route.query.type != 0 ){
        this.zt = this.$route.query.type
      }
      this._getList();
      this._getType();
    },
    mounted(){

    },
    methods: {
      _getList(){
        if (this.refurbish != 3){
          this.refurbish = 1
          getList({page:this.page,fl:this.fl,gys:this.gys,zt:this.zt}).then(res =>{
            this.sum = res.total
            this.doData(res)
          })
        }

      },
      _getType(){
        let that = this
        getType().then(res=>{
          Object.keys(res.data.fl).forEach(function(key){
            let obj = {value:res.data.fl[key].bh,text:res.data.fl[key].mc}
            if (res.data.fl[key].bh != "-1"){
              that.option.fl.push(obj);
            }
          });
          Object.keys(res.data.gys).forEach(function(key){
            let obj = {value:res.data.gys[key].bh,text:res.data.gys[key].mc}
            if (res.data.gys[key].bh != "-1"){
              that.option.gys.push(obj);
            }

          });
          Object.keys(res.data.zt).forEach(function(key){
            let obj = {value:res.data.zt[key].bh,text:res.data.zt[key].mc}
            if (res.data.zt[key].bh != "-1"){
              that.option.zt.push(obj);
            }
          });
        })
      },
      doData(res){
        this.page++
        if (res.status == 1){
          this.$refs.wrapper.finishPullDown();
          this.$refs.wrapper.finishPullUp();
          res.data.forEach(e => this.list.push(e) )
          if (this.list.length >= this.sum ){
            this.finished=false
            this.refurbish = 3
          }
        }else{
          this.$toast.show('加载失败!')
        }
      },
      getNewList(){
        this.list.splice(0,this.list.length)
        this.finished=true
        this.refurbish = 1
        this._getList()
      },
      //下拉刷新
      pullingDown(){
        this.list.splice(0,this.list.length)
        this.finished=true
        this.refurbish = 1
        this._getList()

      },
      //加载更多返回
      pullingUp(){
        this._getList()
      },
      getId(id){
        getEqu({bh:id}).then(res=>{
          this.code = id;
          this.ids = res.data.bh;
          this.data = res.data
          if (res.status == 1){
            this.showPopup = true
            // （status 1：等待入库 2：已入库 3：已报废）
            if (res.data.status == 1){
              this.btnStatus =1;
              this.desc = "【未入库】请选择操作类型！";
            }else if(res.data.status == 2){
              this.btnStatus =2;
              this.desc = "【已入库】请选择操作类型！";
            }else{
              this.btnStatus =3;
              this.desc = "【已报废】";
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
      },
      setColor(id){
        if (id == 1){
          return "danger"
        }else if(id == 2){
          return "success"
        }else{
          return "primary"
        }
      },
      getContainer(){
        return document.querySelector('.guazai');
      }
    },
  }
</script>

<style scoped>
  .wrapper{
    height: calc(100vh - 60px);
    overflow-y: hidden;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    /* 这代表IPX 的屏幕竖屏模式*/
    .wrapper{
      height: calc(100vh - 150px);
      overflow-y: hidden;
    }
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
  .div_lise{
    width: 100%;


  }

  .div_lise ul{
    background-color: aliceblue;
    height: auto;
    width: 100%;
  }
  .div_lise li{
    height: 220px;
    display: block;
    list-style: none;
    background-color: #fff;
    padding:10px 10px;
  }
  .div_lise li:nth-child(1){
    margin-top: 0px;
  }
  .div_lise li>div{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .div_lise li .div_text{
    position: absolute;
    height: 100%;
    width: 70%;
  }
.div_name{
  color: #939393;
  padding: 0 15px;
    text-overflow:ellipsis;
    white-space:nowrap;
line-height: 30px;
    font-size: 14px;
  }
  .div_lise li .div_text .div_name1{

    position: absolute;
    top: 20%;
    left: 0px;
    width: 100%;
    transform: translateY(-50%);
    padding-left: 30px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-weight: bold;

  }
  .div_lise li .div_text .div_name2{

    position: absolute;
    top: 50%;
    left: 0px;
    width: 100%;
    transform: translateY(-50%);
    padding-left: 30px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .div_lise li .div_text .div_name3{

    position: absolute;
    top: 80%;
    left: 0px;
    width: 100%;
    transform: translateY(-50%);
    padding-left: 30px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: #c2c2c2;
  }
</style>