<template>
  <!-- 新增和编辑用户的弹窗 -->
	<div class="userBox alertStyle">
      <div class="alertTop">用户编辑<span @click="hideUserBox"><img src="../../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="85px">
          <el-row :gutter="20">
            <el-col :span="6">
               <el-form-item label="所属组织：">
                <el-input
                  placeholder="请选择"
                  icon="menu"
                  v-model="form.org"
                  @click="solvePeople();showCommonBox()"
                  @focus="solvePeople();showCommonBox()"
                  :disabled="alreadyCancel"
                  >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户账号：">
                <el-input v-model="form.account" :disabled="accountState"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="用户名称：">
                <el-input v-model="form.name" :disabled="alreadyCancel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色权限：">
                <!-- <el-input
                  placeholder="请选择"
                  icon="menu"
                  v-model="form.accept"
                  @click="solvePeople();showCommonBox()"
                  @focus="solvePeople();showCommonBox()"
                  >
                </el-input> -->
                <el-select v-model="form.level" placeholder="" @change="optionChangeHandler" :disabled="alreadyCancel">
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="stateRow">
            <el-col :span="6">
              <el-form-item label="状态：">
                <span>{{form.state}}</span> 
              </el-form-item>
            </el-col>
            <el-col :span="6" style="text-align:right">
              <el-button type="text" class="editBtn" @click="changepw">重置密码</el-button>
            </el-col>
          </el-row>
          <!-- 这应该是编辑的时候才有的字段 -->
        </el-form>
      </div>
      <div class="alertBottom">
        <span class="leftBot">
          <span class="user-wf" @click="cancelUser"><img src="../../static/img/zhuxiao.png">{{cancelTxt}}</span>   
          <span class="user-dele" @click="deleteUser"><img src="../../static/img/alert-delete.png">删除</span> 
        </span>
        <span class="rightBot">
          <span class="bg_green" @click="operateUser" >确定</span> 
          <span @click="hideUserBox" class="bg_cancle">取消</span> 
        </span>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
	export default {
		name: 'app',
		data () {
		  return {
		    options: [{
		      value: '0',
		      label: '系统管理员'
		    }, {
		      value: '1',
		      label: '内容管理员'
		    }, {
		      value: '2',
		      label: '批示用户'
		    }, 
        {
		      value: '3',
		      label: '普通用户'
		    },
        {
          value: '4',
          label: '超级管理员'
        }
        ],
		    form: {
		      org:'',
		      account: '',
		      name: '',
		      level: '1',
		      state:'正常'
		    },
        userid:'',
        orgid:'',
        accountState:false,
        password:'',
        pwDefault:'',
        cancelTxt:'注销',
        alreadyCancel:false,
        // flag:'0',
		  }
		},
    computed: {
      ...mapGetters({
        userState: 'userState',
        unitVal: 'unitVal',
      })
    },
    watch:{
      userState:{
        handler: function (val, oldVal) {//
          if(Object.keys(val).length!=0){
            var level=this.levelJudge(val.level); 
            // this.$set()
            this.form.org=val.org;　//这里编辑的时候 渲染组织名称
            this.form.account=val.account;
            this.form.name=val.name;
            this.form.level=level;
            this.form.state=val.state;
            this.userid=val.id;
            this.orgid=val.orgid;
            this.accountState=true;
            if(val.state=="已注销"){
              this.cancelTxt='反注销';
              this.alreadyCancel=true;
            }
            else{
              this.cancelTxt='注销'
              this.alreadyCancel=false;
            }
          }
          else{//表示新增
            this.form={
              org:'',
              account: '',
              name: '',
              level: '1',
              state:'正常',
            };
            this.userid="";
            this.orgid="";
            this.accountState=false;
          }
        },
        deep:true,
        immediate: true,
      },
      unitVal:{
        handler: function (val, oldVal) {//获得组织id
          if(Object.keys(val).length!=0){
            this.orgid=val[0].id;
            this.form.org=val[0].name;
          }
        },
        deep:true,
        immediate: true,
      }
    },
		methods:{
      changepw(){
        if(confirm('确认重置密码吗？')){
          // this.flag='1';
          this.password=this.pwDefault;
        }
      },
      levelJudge(value){
        if(value=='系统管理员'){
          return "0";
        }
        else if(value=='内容管理员'){
          return "1";
        }
        else if(value=='批示用户'){
          return "2";
        }
        else if(value=='普通用户'){
          return "3";
        }
        else{}
      },
		  hideUserBox:function(){
		    $(".mask1,.userBox").removeClass("showBtn userBoxAdd");
		  },
		  showCommonBox:function(){
		    this.state2='';
		    $(".mask2").addClass("showBtn");
		    $(".mask1").removeClass("showBtn");
		  },
		  solvePeople:function(){
		    $(".unitBox").addClass("showBtn");
		  },
		  optionChangeHandler(val){
		  },
      operateUser(){
        //此时列表中没有组织！！！！
        if(this.password==undefined){
          this.password="";
        }
        else{}
        if(this.orgid==""){
          alert("所属组织不能为空！");
        }
        else if(this.form.account==""){
          alert("用户账号不能为空！");
        }
        else if(this.form.name==""){
          alert("用户姓名不能为空！");
        }
        else 
        {
          if(this.userid==""){//编辑用户的时候就有啦
            var pw=md5(this.pwDefault);
            // $.when(addUsers('1',this.form.account,this.form.name,this.form.level,pw)).done(function(data){
            $.when(addUsers(this.orgid,this.form.account,this.form.name,this.form.level,pw)).done(function(data){
              if(data.state=="0"){
                var res=data.data;
                alert("新增用户成功！");
                // $(".mask1,.userBox").removeClass("showBtn userBoxAdd");
                window.location.reload();
              }
              else{
                alert(data.data);
              }
            })
          }
          else{
            var pw_1=md5(this.password);
            $.when(editUsers(this.userid,this.orgid,this.form.account,this.form.name,this.form.level,pw_1)).done(function(data){
              if(data.state=="0"){
                var res=data.data;
                alert("修改用户成功！");
                window.location.reload();
              }
              else{
                alert(data.data);
              }
            })
          }
        }
      },
      cancelUser(){
        if(this.cancelTxt=="注销"){
          if(confirm("确认注销该用户？")){
            $.when(cancelUsers(this.userid)).done(function(data){
              if(data.state=="0"){
                var res=data.data;
                alert("用户注销成功！");
                window.location.reload();
              }
              else{
                alert(data.data);
              }
            })
          }
        }
        else{
          if(confirm("确认反注销该用户？")){
            $.when(excancelUsers(this.userid)).done(function(data){
              if(data.state=="0"){
                var res=data.data;
                alert("用户反注销成功！");
                // this.alreadyCancel=false;//是否有这个需求，反注销后 不退出编辑
                window.location.reload();
              }
              else{
                alert(data.data);
              }
            })
          }
        }
      },
      deleteUser(){
        if(confirm("确认删除该用户？")){
          $.when(deleteUsers(this.userid)).done(function(data){
            if(data.state=="0"){
              var res=data.data;
              alert("用户删除成功！");
              window.location.reload();
            }
            else{
              alert(data.data);
            }
          })
        }
      }
		},
		mounted() {
		},
    created(){
      var val=localStorage.getItem("initPassword");
      if(val){
        this.pwDefault=val?val:'';
      }
    }
	}
</script>