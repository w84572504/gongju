<template>
  <div class="con">
    <van-row type="flex" justify="center">
      <van-col span="22">
        <h4 class="tit">【入库操作】</h4>
        <van-field v-model="data.sydd" type="text" label="使用地点"  placeholder="请输入地点" required />
        </van-cell-group>
        <van-field v-model="data.scrq" type="text" label="生产日期"  placeholder="请输入生产日期" required @focus ="makerTime('scrq')" readonly="readonly" />
        </van-cell-group>
        <van-field v-model="data.yxrq" type="text" label="有效日期"  placeholder="请输入有效日期" required @focus ="makerTime('yxrq')" readonly="readonly" />
        </van-cell-group>
        <van-field v-model="data.xcjxrq" type="text" label="下次检测日期"  placeholder="请输入检测日期" required @focus ="makerTime('xcjxrq')" readonly="readonly" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="data.bz" rows="1"  autosize label="备注" type="textarea" placeholder="请输入备注" />
        </van-cell-group>
        <van-uploader :before-read="beforeRead" v-model="data.fileList" multiple :max-count="1"  class="imgs"/>
        <div>
          <van-button type="primary" class="sure" @click="submit">确认保存</van-button>
        </div>
      </van-col>
    </van-row>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" >
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="chose()"></van-datetime-picker>
    </van-popup>

  </div>
</template>

<script>
  import { ruKu } from "network/user"
  import { Toast } from 'vant'
  export default {
    name: "FromIn",
    props:{
      name:String,
      uid:String,
      ids:String
    },
    data() {
      return {
        currentDate: new Date(),
        minDate: new Date(),
        show:false,
        data:{bh:"",sydd:"",scrq:"",yxrq:"",xcjxrq:"",bz:"",rkzp:"",rkr:"",fileList:[]},
        which:"",
        imgArr:['image/jpeg','image/jpg','image/png','image/gif']
      };
    },
    methods: {
      makerTime(name){
        this.show =true ;
        this.which = name
      },
      p(s) {
        return s < 10 ? '0' + s : s
      },
      chose(){
        const d = new Date(this.currentDate)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        this.data[this.which] =resDate
        this.show =false ;
      },
      beforeRead(file) {
        if ( this.imgArr.indexOf(file.type) == '-1') {
          Toast('上传照片格式不正确!')
          return false;
        }
        return true;
      },
      submit(){
        this.data.bh = this.ids
        this.data.rkr = this.uid
        if(this.data.sydd==''){
          Toast('请输入使用地点')
          return false
        }
        if(this.data.scrq==''){
          Toast('请选择生产日期')
          return  false
        }
        if(this.data.yxrq==''){
          Toast('请选择有效日期')
          return  false
        }
        if(this.data.xcjxrq==''){
          Toast('请选择下次有效日期')
          return  false
        }
        ruKu(this.data).then(res=>{
          if (res.status == 1){
            this.$toast.show("入库成功")
            this.$router.replace('/user/tool')
          }else{
            Toast(res.msg)
          }
        })

      }
    }
  }
</script>

<style scoped>
.tit{
  text-align: center;
  line-height: 40px;
}
  .sure{
    width: 100%;
  }
  .imgs{
    margin-top: 10px;
  }
</style>