<template>
  <!-- 修改密码弹窗 -->
	<div class="initpwBox alertStyle">
      <div class="alertTop">重置初始密码<span @click="hideUserBox"><img src="../../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-form-item label="初始密码：">
            <el-input v-model="form.password" type="text"></el-input>
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
          password:'',
        },
        userSource:'',
        userId:'',
      }
    },
    methods:{
      operateUser(){
        var that=this; 
        $.when(changeDefaultpw(this.userId,this.form.password)).done(function(data){
          if(data.state==0){
            alert('初始密码设置成功！');
            that.hideUserBox();
            localStorage.setItem("initPassword",that.form.password);
          }
        })
      },
      hideUserBox:function(){
        $(".mask1,.initpwBox").removeClass("showBtn");
      },
    },
    mounted(){
    },
    created(){
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
      this.form.password=this.userSource?this.userSource.password:'';
    }
  }
</script>
<style lang="less">
  .initpwBox{
    width:400px;
    height:200px;
    margin-top:-100px;
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