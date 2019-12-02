<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back" @click="closeScan"> </span>
      <p slot="mid" @click="startScan()">扫描二维码</p>
    </nav-bar>
    <div class="scan">
      <div id="bcid">
        <p class="tip">...载入中...</p>
      </div>
    </div>
  </div>
</template>

<script >
  import navBar from 'components/navBar/navBar';
  import { getEqu } from "network/user";
  let scan = null;
  export default {
    name: "Login",
    components:{
      navBar
    },
    data() {
      return {
        codeUrl: '',
      }
    },
    created(){

    },
    mounted(){
      this.startRecognize()
    },
    methods: {
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');

        scan.onmarked = onmarked;
        that.startScan()
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          that.codeUrl = result;
          that.closeScan();
          getEqu({bh:that.codeUrl}).then(res=>{
            if (res.status == 1){
              that.$router.replace({path:'/user/dopage',query:{code:that.codeUrl,name:res.data.name}})
            }else{
              that.$router.push('/user/home')
              that.$toast.show(res.msg)
            }
          })
        }
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.close();
      },
    }
  }
</script>
<style scoped>
  .scan {
    height: 100%;
  }
  #bcid {
    width: 100%;
    height: calc(100vh - 100px);
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
</style>