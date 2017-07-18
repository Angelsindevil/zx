<template>
	<div class="orgBox alertStyle">
      <div class="alertTop">组织编辑<span @click="hideUserBox"><img src="../../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-form-item label="组织名称：">
            <el-input v-model="form.org"></el-input>
          </el-form-item>
          <el-form-item label="上级单位：">
          <el-input
              placeholder="请选择"
              icon="menu"
              v-model="form.unit"
              @click="solvePeople();showCommonBox()"
              @focus="solvePeople();showCommonBox()"
              >
            </el-input>
          </el-form-item>
        </el-row>
          <!-- 这应该是编辑的时候才有的字段 -->
        </el-form>
      </div>
      <div class="alertBottom">
      	  <span class="leftBot">
	        <span class="user-dele" @click="deleteUser"><img src="../../static/img/alert-delete.png">删除</span> 
	      </span>
	      <span class="rightBot">
	        <span class="bg_green" @click="hideUserBox(),operateUser()">确定</span> 
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
		    form: {
		      org:'',
		      unit: '',
		    },
		    pid:'',
		    orgid:'',
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
	            this.form.org=val.org;　//这里编辑的时候 渲染组织名称
	            this.form.unit=val.name;//渲染上级单位名称
	            this.pid=val.pid;//上级单位的id
	            this.orgid=val.id;//当前编辑的组织id
	            console.log(this.orgid);
	          }
	          else{//表示新增
	            this.form={
	              org:'',
		      	  unit: '',
	            };
	            this.pid="";
	            this.orgid="";
	          }
	        },
	        deep:true,
	        immediate: true,
	      },
	      unitVal:{
	        handler: function (val, oldVal) {//获得组织id
	          if(Object.keys(val).length!=0){
	            this.pid=val[0].id;//获得修改之后的上级单位id
	            this.form.unit=val[0].name;
	          }
	          else{
	          	this.form.unit='';
	          	this.pid='';//获得修改之后的上级单位id
	          }
	        },
	        deep:true,
	        immediate: true,
	      }
	    },
		methods:{
		  operateUser(){
		  	if(this.form.org==""){
	          alert("组织名称不能为空！");
	        }
	        else{
		        if(this.orgid==""){//新增组织
		          $.when(addOrg(this.form.org,this.pid)).done(function(data){
		            if(data.state=="0"){
		              var res=data.data;
		              alert("新增组织成功！");
		              window.location.reload();
		            }
		            else{
		            	alert(data.data);
		            }
		          })
		        }
		        else{//编辑组织
		          $.when(editOrg(this.orgid,this.form.org,this.pid)).done(function(data){
		            if(data.state=="0"){
		              var res=data.data;
		              alert("编辑组织成功！");
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
	      	if(confirm("确认删除该组织？")){
	      	  $.when(deleteOrg(this.orgid)).done(function(data){
		        if(data.state=="0"){
		        	alert("删除成功！");
		        	window.location.reload();
		        }
		        else{
	            	alert(data.data);
	            }
		      })
	      	}
	      },
		  hideUserBox:function(){
		    $(".mask1,.orgBox").removeClass("showBtn");
		  },
		  showCommonBox:function(){
		    this.state2='';
		    $(".mask2").addClass("showBtn");
		    $(".mask1").removeClass("showBtn");
		    // $(".articleBox").addClass("showBtn");
		  },
		  solvePeople:function(){
		    $(".unitBox").addClass("showBtn");
		  },
		  optionChangeHandler(val){

		  },
		},
		mounted() {
		},


	}
</script>
<style lang="less">
	.orgBox{
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