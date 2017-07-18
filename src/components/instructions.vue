<template>
  <!-- 弃用 -->
  <div class="test">
    <div class="rightBar">
      <p>消息反馈-我的批示：
        <span>共计批示了<span>136</span>篇文章，今日批示<span>12</span>篇</span>
      </p>
     <!--  <div class="admin_ui_input">
        <input type="" name="" placeholder="搜索批示的内容">
      </div> -->
      <el-input
        placeholder="搜索批示和反馈的内容"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>
    <div class="rightContent">
      <div class="title_bar">
        <p><img src="../../static/img/edit_reporter.png" alt="">我的批示</p>
        <el-button type="success" class="button_style" @click="showPSBox">发起新流程</el-button>
      </div>
      <div class="title_content">
        <ul>
          <li>
            <span>批示内容：<span>国家“双一流”实施方案正式出台，预计2017年上半年公布名单</span>  - <span>2016/12/10</span></span>
            <span class="includeBtn_ orange"><span>有新反馈</span></span>
            <!-- <router-link to="/instructionsDetail"><span class="includeBtn"><span>查看</span><img src="../../static/img/arrow_blue.png" alt=""></span></router-link> -->
            <!-- <el-tag type="primary" class="label_style">有新反馈</el-tag> -->
            <router-link to="/instructionsDetail"><el-button type="primary" class="button_style">查看详情</el-button></router-link>
          </li>
          <li>
            <span>批示内容：<span>国家“双一流”实施方案正式出台，预计2017年上半年公布名单</span>  - <span>2016/12/10</span></span>
            <span class="includeBtn_ grey"><span>流程已结束</span></span>
            <!-- <router-link to="/instructionsDetail"><span class="includeBtn"><span>查看详情</span></span></router-link> -->
            <!-- <el-tag type="gray" class="label_style">流程已结束</el-tag> -->
            <router-link to="/instructionsDetail"><el-button type="primary" class="button_style">查看详情</el-button></router-link>
          </li>
          <li>
            <span>批示内容：<span>国家“双一流”实施方案正式出台，预计2017年上半年公布名单</span>  - <span>2016/12/10</span></span>
            <span class="includeBtn_ grey"><span>流程已结束</span></span>
            <!-- <router-link to="/instructionsDetail"><span class="includeBtn"><span>查看详情</span></span></router-link> -->
            <!-- <el-tag type="gray" class="label_style">流程已结束</el-tag> -->
            <router-link to="/instructionsDetail"><el-button type="primary" class="button_style">查看详情</el-button></router-link>
          </li>
        </ul>
      </div>
    </div>  
    <div class="rightBottom">
      <p>
      点击加载更多内容
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
       input2: '',
    }
  },
  methods:{
    handleInputClick:function(){},
    showPSBox:function(){
      $(".mask1").addClass("showBtn");
      $(".psBox").addClass("showBtn");
      $(".psBox").find(".article_btn").attr("disabled",false).removeClass("is-disabled");
      this.$store.dispatch('changeAlertBox',{"type":'0'}).then(function(resp){});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/less/init.less';
  @import '../../static/less/instructions.less';
</style>
