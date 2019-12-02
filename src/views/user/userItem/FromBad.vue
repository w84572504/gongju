<template>
  <div class="con">
    <van-row type="flex" justify="center">
      <van-col span="22">
        <h4 class="tit">{{name}} 报废</h4>
        <van-field
                readonly
                clickable
                label="报废原因"
                :value="data.bfyy"
                placeholder="选择原因"
                @click="showPicker = true"
                required
        />
        <van-cell-group>
          <van-field v-model="data.bfsm" rows="1"  autosize label="报废说明" type="textarea" placeholder="请输入说明" required/>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="data.bz" rows="1"  autosize label="备注" type="textarea" placeholder="请输入备注" />
        </van-cell-group>
        <div>
          <van-button type="primary" class="sure" @click="submit">确认保存</van-button>
        </div>
      </van-col>
    </van-row>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
      />
    </van-popup>

  </div>
</template>

<script>
  import { getBadInfo,baoFei } from "network/user";

  export default {
    name: "FromTBad",
    props:{
      name:String,
      uid:String,
      ids:String
    },
    data() {
      return {
        data:{bh:"",bfyy:"",bfsm:"",bz:""},
        showPicker: false,
        columns: []
      };
    },
    created(){
      this._getBadInfo()
    },
    methods: {
      onConfirm(value) {
        this.data.bfyy = value;
        this.showPicker = false;
      },
      _getBadInfo(){
        getBadInfo().then(res=>{
          if (res.status == 1){
            let arr = [];
            for(let key  in res.data){
              arr.push(res.data[key]['mc'])
            }
            this.columns = arr
          }
        })
      },
      submit(){
        this.data.bh = this.ids
        baoFei(this.data).then(res=>{
          console.log(res);
          if (res.status == 1){
            this.$toast.show("报废操作成功！")
            this.$router.replace('/user/tool')
          }else{
            this.$toast.show(res.msg)
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