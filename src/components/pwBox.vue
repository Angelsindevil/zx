<template>
  <!-- 修改密码弹窗 -->
	<div class="pwBox alertStyle">
      <div class="alertTop">修改密码<span @click="hideUserBox"><img src="../../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-form-item label="原密码：">
            <el-input v-model="form.pwOld" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="form.pwNew1" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="form.pwNew2" type="password"></el-input>
          </el-form-item>
        </el-row>
        </el-form>
      </div>
      <div class="alertBottom">
      	<span class="leftBot">
	      </span>
	      <span class="rightBot">
	        <span class="bg_green" @click="operateUser">确定</span> 
        	<span @click="hideUserBox" class="bg_cancle">取消</span> 
	      </span>
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
        $(".mask1,.pwBox").removeClass("showBtn");
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
    height:340px;
    margin-top:-170px;
    margin-left:-200px;
    label{
      width:100px;
    }
    .el-form-item__content{
      margin-left:100px;
    }
    .el-input{
      width:95%;
    }
  }
</style>