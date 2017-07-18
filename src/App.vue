<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods:{
  },
  mounted() {
  }
}
</script>

<style lang="less">
@import '../static/less/init.less';
@import '../static/less/tinymce.less'; 
body{
  margin:0;
  position: relative;
  // margin-bottom:50px;
}
.el-dropdown-menu a,.el-dropdown-menu .el-dropdown-menu__item{ 
  color:#333;
  font-size: 14px;
}
</style>
