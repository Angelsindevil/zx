<template>
  <!-- 登录页面 -->
  <div class="loginPage" style="background-image: url('./static/img/bgImage.png');">
    <p class="topTips">
      <img src="../../static/img/logo.png" alt="">
      <span>西安交通大学高教信息平台</span> 
    </p>
  	<div class="mask"></div>
  	<div class="loginContainer">
  		<!-- <div class="leftPart partStyle">
  			<div class="leftContent contentStyle">
  				<p class="p1">中国科学技术大学</p>
  			</div>
  		</div> -->
  		<div class="rightPart partStyle">
			<!-- <img src="../../static/img/rocket.png" alt="">	 -->
			<!-- <p>账号密码登录</p>	 -->
      <p>用户登录</p>
			<div class="rightContent_p contentStyle">
        <div class="input_style">
          <el-input v-model="input1" placeholder="账号信息" class="input_m"></el-input>
          <img src="../../static/img/user_full.png" alt="">
        </div> 
        <div class="input_style">
          <el-input v-model="input2" placeholder="密码" type="password" @keyup.native.enter='doLogin'></el-input>
          <img src="../../static/img/pw_full.png" alt="">
        </div> 
				<div class="remember_me">
          <el-checkbox v-model="checked" @change="rememberMe">记住我</el-checkbox>
        </div>
        <div class="forgetPw" @mouseover="btnOver" @mouseout="btnOut">
          <!-- <el-tooltip class="item" effect="dark" content="请联系学校管理员" placement="right"> -->
          <el-button type='text' @click="btnOver">忘记密码？
          </el-button>
          <span class="showElse" v-show="showFLagIndex">请联系数据与信息中心管理员</span>
        <!-- </el-tooltip> -->
        </div>

				<el-button type="primary" @click="doLogin" class="loginBtn">登录</el-button>
			</div>
			<p class="bottom_p">建议使用Chrome或IE9以上浏览器登录</p>
		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
     	input1:'',
     	input2:'',
     	checked:true,
      showFLagIndex:false,
    }
  },
  methods:{
    btnOver(){
      this.showFLagIndex=true;
    },
    btnOut(){
      this.showFLagIndex=false;
    },
    doLogin(){
      var pw=md5(this.input2);
      var that=this;
      this.rememberMe();
      $.when(loginPage(this.input1,pw)).done(function(data){
        if(data.state==0){
          // that.$store.dispatch('changeUserSource',{userSource:data.data}).then(function(resp){});
          that.$router.push({path:'/homePage/articleList',query: { type:'全部内容',index: 0 }});
          localStorage.setItem("userSource",JSON.stringify(data.data));
          localStorage.setItem("initPassword",data.data.password);
        }
        else if(data.state=='9000'){
          // alert("用户未登录！")
          that.$router.push({path:'/login',query: {}});
        }
        else{
          alert(data.data);
        }
      })
    },
    rememberMe(){
      // if($('#rememberMe:checked').length>0){//设置cookie  
      if(this.checked){
        // $.cookie('absms_crm2_userName', this.input1,{ expires: 7 });  
        // $.cookie('absms_crm2_password', this.input2,{ expires: 7 }); 
        this.$cookie.set('absms_crm2_userName',this.input1,{ expires: 7 }); 
        this.$cookie.set('absms_crm2_password',this.input2,{ expires: 7 }); 
      }else{//清除cookie  
        this.$cookie.delete('absms_crm2_userName');
        this.$cookie.delete('absms_crm2_password');
        // $.removeCookie('absms_crm2_userName');  
        // $.removeCookie('absms_crm2_password');  
      }  
    },
  },
  mounted(){
    if(this.$cookie.get('absms_crm2_userName')!=undefined){  
      this.checked=true;
    }else{ 
      this.checked=false;
    }
    //读取cookie  
    if(this.checked){ 
      this.input1=this.$cookie.get('absms_crm2_userName'); 
      this.input2=this.$cookie.get('absms_crm2_password'); 
      // this.input1=$.cookie('absms_crm2_userName');
      // this.input2=$.cookie('absms_crm2_password');
    }   
    //监听【记住我】事件  
  }
}
</script>

<style lang="less">
  @import '../../static/less/init.less'; 
  @import '../../static/less/loginPage.less';
  // background-image: url('./static/img/background_new.png');
  .loginPage{
    // background-image: url('../../static/img/background_new.png');
  }
</style>
