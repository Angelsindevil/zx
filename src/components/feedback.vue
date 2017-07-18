<template>
  <!-- 弃用 -->
  <div class="test">
    <div class="rightBar">
      <p>消息反馈-我的反馈：
        <span>共计反馈了<span>136</span>份批示，今日收到反馈<span>12</span>份</span>
      </p>
      <div class="admin_ui_input">
        <input type="" name="" placeholder="搜索批示的内容">
      </div>
    </div>
    <div class="rightContent">
      <div class="title_bar">
        <p><img src="../../static/img/edit_reporter.png" alt="">我的反馈</p>
      </div>
      <div class="title_content">
        <ul>
          <li class="blue">
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
      
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/less/init.less';
  @import '../../static/less/instructions.less';
</style>
