<template>
  <div>
    <nav-bar>
      <span slot="left" class="iconfont bc-back"> </span>
      <p slot="mid">修改密码</p>
    </nav-bar>
    <van-row type="flex" justify="center">
      <van-col span="22" style="margin-top: 15px;">
        <van-cell-group>
          <van-field
                  v-model="data.oldpass"
                  type="password"
                  label="旧密码"
                  placeholder="请输入旧密码"
                  required
          />
        </van-cell-group>
        <van-field
                v-model="data.newpass"
                type="password"
                label="新密码"
                placeholder="请输入新密码"
                required
        />
        </van-cell-group>
        <van-field
                v-model="data.suepass"
                type="password"
                label="确认密码"
                placeholder="请再次输入新密码"
                required
        />
        </van-cell-group>
        <van-button type="primary" class="sure" @click="submit">确认修改</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import navBar from 'components/navBar/navBar';
  import { editpass } from 'network/user';
  import { Toast } from 'vant';
  export default {
    name: "EditPass",
    components: {
      navBar
    },
    data(){
      return{
        data:{oldpass:"", newpass:"", suepass:""}
      }
    },
    methods:{
      submit(){
        if(this.data.oldpass==''){
          Toast('请输入旧密码')
          return false
        }
        if(this.data.newpass==''){
          Toast('请输入新密码')
          return  false
        }
        if(this.data.suepass==''){
          Toast('请输入确认密码')
          return  false
        }
        editpass(this.data).then(res=>{
          if (res.status == 1){
            this.$toast.show("密码修改成功！")
            this.$router.replace('/user/home')
          }else{
            Toast(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .sure{
    width: 100%;
  }
</style>