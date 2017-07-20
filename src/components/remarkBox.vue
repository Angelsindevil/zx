<template>
  <!-- 修改备注弹窗 -->
  <div class="pwBox alertStyle">
      <div class="alertHeader">
        <p class="insideHeader">备注编辑<img src="../../static/img/delete.png" alt="" @click="hideUserBox"></p>
      </div>
      <div class="needs_content">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-form-item label="备注内容：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-row>
        </el-form>
      </div>
      <div class="bottomBtn">
        <p>
          <el-button type="primary" @click="hideUserBox">取消</el-button>
          <el-button type="primary" @click="operateUser">确定</el-button>
        </p>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        form: {
          pwOld:'',
          pwNew1: '',
          pwNew2:'',
          userSource:'',
          userId:'',
        },
      }
    },
    methods:{
      operateUser(){
        var pw1=md5(this.form.pwOld);
        var that=this;
        var pw2;
        if(this.form.pwNew1!=this.form.pwNew2){
          alert("两次密码输入不一致！");
        }
        else{
          pw2=md5(this.form.pwNew2);
          console.log(this.userId);
          $.when(changePassword(this.userId,pw1,pw2)).done(function(data){
            if(data.state==0){
              alert('密码修改成功！');
              that.hideUserBox();
            }
            else{
              alert(data.data);
            }
          })
        }
      },
      hideUserBox:function(){
        $(".mask,.pwBox").removeClass("showBtn");
      },
    },
    mounted() {
    },
    created(){
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
    }
  }
</script>
<style lang="less">
  .pwBox{
    width:400px;
    height:310px;
    label{
      width:100px;
    }
    .el-form-item__content{
      margin-left:100px;
    }
    .el-input{
      width:95%;
    }
    .needs_content{
      height:200px;
    }
  }
</style>