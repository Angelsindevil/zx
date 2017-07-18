<template>
  <!-- 可弃用？ -->
  <div class="message">
    <div class="rightBar">
      <p>
        消息中心
      </p>
      <!-- <div class="switchBtn">
        <select name="" id="">
        </select>
        <div>
          <img src="../../static/img/arrow.png" alt="">
        </div>
      </div> -->
      <!-- <div class="admin_ui_select">
        <select id="themeBox">
          <option value="">全部消息</option>
          <option value="">已读消息</option>
          <option value="">未读消息</option>
        </select>
      </div> -->
      <el-select v-model="value" placeholder="" @change="optionChangeHandler" class="selectStyle">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="rightContent">
      <table>
        <thead>
          <tr>
            <td>消息内容</td>
            <td>接收时间</td>
            <td>发送人</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>#海外动态#</span>今日更新文章30篇！可点击海外动态进行查看！</td>
            <td>2016-12-13 16:24</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td><span>#海外动态#</span>今日更新文章30篇！可点击海外动态进行查看！</td>
            <td>2016-12-13 16:24</td>
            <td>Admin</td>
          </tr>
          <tr class="readAlready">
            <td><span>#海外动态#</span>今日更新文章30篇！可点击海外动态进行查看！</td>
            <td>2016-12-13 16:24</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td><span>#海外动态#</span>今日更新文章30篇！可点击海外动态进行查看！</td>
            <td>2016-12-13 16:24</td>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="M-box"></div>
  </div>
</template>
<script>
export default {
  name: 'report',
  components: {
   app
  },
  // props:['isActive'],
  data () {
    return {
       list:[{name:"Foo"}, 
          {name:"Bar"}, 
          {name:"Baz"},
           ],
        options: [{
          value: '1',
          label: '全部消息'
        }, {
          value: '2',
          label: '已读消息'
        }, {
          value: '3',
          label: '未读消息'
        }],
        value: '1',
      }
  },
  methods: {
    showSomething:function(){
      $(".mask").addClass("showBtn");
      $(".alertBox").addClass("showBtn");
    },
    optionChangeHandler:function(){
      
    }
  },
   created: function () {
      // $('.M-box').pagination({
      //     totalData:100,
      //     showData:10,
      //     coping:true,
      //     homePage:'首页',
      //     endPage:'末页',
      //     prevContent:'上页',
      //     nextContent:'下页'
      // });
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/less/init.less';
  .rightBar{
    height:60px;
    width:100%;
    background-color: #0099FF;
    border-radius:8px;
    position: relative;
    p{
      line-height: 60px;
      padding-left: 20px;
      color:#fff;
      font-size: 16px;
      span{
        vertical-align: middle;
        color:#E4E4E4;
        font-size: 18px;
      }
    }
  }
  .rightContent{
    border: 1px solid #ccc;
    margin-top:15px;
    border-radius:5px;
    position: relative;
    background-color: #fff;
  }
  table{
    width:100%;
    border-collapse:collapse;
    thead{
      tr{
        border-bottom: 1px solid #ccc;
        font-weight: 600;
      }
      td{
        padding:20px;
        text-align: center;
      }
    }
    tbody{
      tr{
       font-size:15px;
       color:#333;
        td{
          padding: 30px 20px;
          text-align: center;
        }
        td:nth-child(1){
          text-align: left;
        }
      }
      tr:after{
        content: '';
        position: absolute;
        left: 20px;
        right: 20px;
        border-bottom: 2px dashed #e4e4e4;
      }
      tr:first-child{
        &:after{
          content: '';
          position: absolute;
          left: 20px;
          right: 20px;
          border-bottom:none;
        }
      }
      .readAlready{
        color:#ccc;
      }
    }
  }
  .admin_ui_select {
    position: absolute;
    right: 10px;
    top:15px;
    display: inline-block;
    width: 100px;
    line-height: 1;
    background-color: #B2E0FF;
    border-radius:5px;
  }
  .admin_ui_select > select {
      position: relative;
      width: 100%;
      height: 32px;
      line-height:1;
      padding: 6px 20px 6px 8px;
      border: 1px solid #dddddd!important;
      border-radius: 0;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-color: transparent;
      margin-bottom:0;
      color:#797979;
      border-radius:5px;
      font-size:14px;
  }
  .admin_ui_select:before{
      position: absolute;
      right: 8px;
      top: 4px;
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      content: "\f107";
      color:#bbb;
      font-size:25px;
  }
  .selectStyle{
    width: 120px;
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 12px;
  }
  .grey{
    color:#ccc;
  }
</style>
