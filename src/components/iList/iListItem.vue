<template>
  <div class="item" @click="goDetail">
    <div class="title">
      {{content.title}}
    </div>
    <div class="midItem">
      <van-row gutter="20">
        <van-col span="10">
          <div class="left">
            <p>{{content.rate}}<span>{{sysRate}}</span></p>
            <i>年化利率</i>
          </div>
        </van-col>
        <van-col span="8">
          <div class="mid"><p><span>期限</span>{{periodName}}</p></div>
          <div class="mid"><p><span>总额</span>{{this.content.borrow_money}}万</p></div>
        </van-col>
        <van-col span="6">
          <div class="right">
            <van-circle
                    :value="rateCrile"
                    :rate="100"
                    :stroke-width="50"
                    layer-color="#e6eaf2"
                    size="60px"
                    :color="borderColor"
            ><i :class="CrileStyle" slot="default">{{buttonStatus}}</i></van-circle>
<!--            <van-button :round="true" :color="statusColor" >{{buttonStatus}}</van-button>-->
          </div>
        </van-col>
      </van-row>
    </div>
<!--    <div class="foot">-->
<!--      <van-button disabled color="#d1d3d8" class="footbtn">-->
<!--        <span class="btncl">项目总额：{{this.content.borrow_money}}万</span>-->
<!--      </van-button>-->
<!--      <van-button disabled color="#d1d3d8" class="footbtn">-->
<!--        <span class="btncl">剩余可投：{{this.content.lavemoney}}万</span>-->
<!--      </van-button>-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "iListItem",
    data(){
      return{
        statusColor:" linear-gradient(to right, #d1d3d8, #d1d3d8)",
        currentRate: 100,
        CrileStyle:{'glaxytext':true},
        borderColor:"#ebedf0",
      }
    },
    props:{
      content:Object
    },
    methods:{
      goDetail(){
        this.$router.push("/loan/detail/"+this.content.id)
      }
    },
    computed:{
      rateCrile(){
        return (1-this.content.lavemoney/this.content.borrow_money)*100
      },
      sysRate(){
        return this.content.sys_up_rate === "" ? "" : "+"+this.content.sys_up_rate
      },
      periodName(){
        return this.content.period+this.content.period_unit
      },
      buttonStatus(){
        // "status": #标的状态(状态0-初发布 1-初审中 2-初审未通过 3-复审中 4-复审未通过 5-筹款中 6-满标待放款 7-还款中 8-已还完 9-提前结清 10-已流标),
        switch (this.content.status) {
          case 1:
          case 3:
            return "初审中";
            break;
          case 5:
            this.CrileStyle.glaxytext=false
            this.CrileStyle.bluetext=true
            this.borderColor = "#2362ec"
            return "出借中";
            break;
          case 6:
            return "已满标";
            break;
          case 7:
            return "还款中";
            break;
          case 8:
            return "已还完";
            break;
        }
      },
    }
  }
</script>

<style scoped>
  .title{
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item{
    padding:10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .midItem{
    height: 60px;
  }
  .midItem .left{
    height: 32px;
  }
  .midItem .left p{
    font-weight: bold;
    color: #ed532e;
    font-size: 22px;
    font-family: '微软雅黑';
    padding-bottom: 5px;
  }
  .midItem .left p span{
    font-size: 12px;
  }
  .midItem .left i{
    font-style: normal;
    color: #737373;
    font-size: 12px;
    padding-top: 5px;
  }
  .mid{
    text-align: left;
  }
  .mid p{
    font-weight: 700;
    font-size: 13px;
    height: 32px;
    line-height: 32px;
  }
  .mid span{
    color: #737373;
    font-size: 12px;

    font-weight: normal;
    padding-right: 5px;
  }
  .foot{
    padding: 10px 0;
  }
  .footbtn{
    height: 20px;
    line-height: 14px;
    margin-right:10px;
    padding:3px 5px;
  }
  .btncl{
    color: #737373;
  }
  .bluetext{
    color: #2362ec;
    line-height: 60px;
    font-style: normal;
    font-size: 12px;
  }
  .glaxytext{
    color: #939393;
    line-height: 60px;
    font-style: normal;
    font-size: 12px;
  }
</style>