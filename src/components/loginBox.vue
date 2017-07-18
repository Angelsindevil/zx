<template>
	<!-- 弃用 -->
	<div class="loginBox">
		<div class="alertHeader">
			<p>账号密码登录<img src="../../static/img/cancel_blue.png" alt="" @click="hideLogin"></p>
		</div>
		<div class="loginContent">
			<div class="loginEnter">
				<input type="text" placeholder="账号信息">
				<input type="text" placeholder="密码">
			</div>
			<span><label for="rememberMe"><input type="checkbox" id="rememberMe">记住我</label></span>
			<p>登录</p>
		</div>
		<div class="bottomBox">
			<span></span>	
			<span>
				<el-tooltip class="item" effect="dark" content="请联系学校管理员" placement="right">
			      <el-button type='text'>忘记密码？
			      </el-button>
				</el-tooltip>
			</span>	
		</div>
	</div>
</template>
<script>
/* eslint-disable*/
export default {
  name: 'pageHeader',
  data () {
    return {
    }
  }, 
  methods:{
  	hideLogin(){
  		$(".loginBox,.mask1").removeClass("showBtn");
  	}
  },
  mounted:function(){
  }
}
</script>
<style lang="less" scoped>
 @import '../../static/less/login.less';
</style>