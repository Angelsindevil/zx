<template>
  <div class="message messageStyle">
    <div class="rightBar">
      <p>
        消息中心-{{titleTop}}：
        <!-- <span class="mesTop">共<span>{{totalNum}}</span>条消息，未读消息<span>{{todayNum}}</span>条</span> -->
        <span class="mesTop">未读消息<span>{{todayNum}}</span>条</span>
      </p>
      <el-button class="btn_position" @click="showMesBox">发送新消息</el-button>
      <el-input
        placeholder="搜索消息标题"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
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
            <th style="width:50%">消息内容</th>
            <th style="width:25%" class="timeStyle">{{timeState}}</th>
            <th style="width:25%">发送人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in filterArray" @click="showDetail(item.id,index,$event)" :class="((item.isRead==1)&&(type=='1'))?'grey':''">
            <td><span class="oneLine">{{item.title}}</span></td>
            <td>{{item.receiveTime}}</td>
            <td>{{item.sender}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightBottom" ref="rightBottom" @click="loadMore">
      <p>
      点击加载更多内容
      </p>
    </div>
  </div>
</template>
<script>
import {scrollFun,matchMenu} from '../../static/js/public.js'
export default {
  name: 'report',
  components: {
   app
  },
  // props:['isActive'],
  data () {
    return {
        input2:'',
        options: [{
          value: '0',
          label: '全部消息'
        }, {
          value: '1',
          label: '已读消息'
        }, {
          value: '2',
          label: '未读消息'
        }],
        value: '2',
        filterArray:[],
        type:'',
        userId:'',
        userSource:{},
        username:'',
        timeState:'接收时间',
        // testData:{
        //   list:[
        //      {
        //       'id':'001',
        //       'time':'2016-12-13 16:24',
        //       'sender':'Admin ',
        //       'title':"今日更新文章31篇！可点击海外动态进行查看！",
        //       'isRead':'0',
        //     },
        //     {
        //       'id':'002',
        //       'time':'2016-12-13 16:24',
        //       'sender':'Admin ',
        //       'title':"今日更新文章32篇！可点击海外动态进行查看！",
        //       'isRead':'1',
        //     }
        //   ],
        //   totalNum:'139',
        //   todayNum:'12',
        // },

        pageNo:1,
        totalNum:'',
        todayNum:'',
        titleTop:'消息管理',
        // category:'2',
      }
  },
  watch: { 
    '$route': 'searchThis'
  },
  methods: {
    showSomething:function(){
      $(".mask").addClass("showBtn");
      $(".alertBox").addClass("showBtn");
    },
    optionChangeHandler:function(val){
      var that=this;
      this.category=val;
      $.when(getMessageList(this.userId,this.type,this.pageNo,this.value)).done(function(data){
        if(data.state=="0"){
          that.insertData(data.data);
          // that.filterArray=data.data.list;有用
        }
        else{
          alert(data.data);
        }
      })
    },
    handleInputClick:function(){
      this.pageNo=1;
      var that=this;
      $.when(getSearchMesList(this.userId,this.type,this.pageNo,that.input2)).done(function(data){
        if(data.state=="0"){
          that.insertData(data.data);
          // that.filterArray=data.data.list;有用
        }
        else{
          alert(data.data);
        }
      })
    },
    showMesBox(){
      $(".mask1").addClass("showBtn");
      $(".mesBox").addClass("showBtn");
      console.log(this.username);
      // this.$store.dispatch('clearMesInfo').then(function(resp){});
    },
    showDetail(id,index,e){
      $(".mask1").addClass("showBtn");
      $(".mesDetailBox").addClass("showBtn");
      this.$store.dispatch('changeMesId',{mesId:id}).then(function(resp){});
      if(this.type=='1'){
        var el=$(e.target).closest("tr");
        if(this.value=='0'){
          $(el).addClass("grey");
        }
        else if(this.value=='2'){
          $(el).remove();
        }
      }
    },
    searchThis(){
      this.pageNo=1;
      this.type = this.$route.query.type;//type=0-消息管理（只有系统管理员可见），type=1-系统消息
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
      this.username=this.userSource?this.userSource.username:'';
      if(this.type=='0'){//消息管理页面可以新增消息
        this.$nextTick(function(){
          this.titleTop="消息管理";
          this.timeState="发送时间";
          $(".input_position").show();
          $(".selectStyle").hide();
          $(".btn_position").show();
          $(".mesTop").hide();
        })
      }
      else{//系统消息
        this.titleTop="系统消息";
        this.timeState="接收时间";
        $(".input_position").hide();
        $(".selectStyle").show();
        this.$nextTick(function(){
          $(".btn_position").hide();
          $(".mesTop").show();
        })
      }

      // this.filterArray=this.testData.list;//test

      var that=this;
      $.when(getMessageList(this.userId,this.type,this.pageNo,this.value)).done(function(data){
        if(data.state=="0"){
          that.insertData(data.data);
          that.filterArray=data.data.list;
        }
        else{
          alert(data.data);
        }
      })
    },
    insertData(data){
      var that=this;
      var res=data;
      var len=that.filterArray?that.filterArray.length:false;
      // that.totalNum=res.totalNum;
      that.todayNum=res.num; 
      if(res.list&&res.list.length!=0){
        if(res.list.length<10){
          $(that.$refs.rightBottom).children('p').text('暂无更多消息');
          if(that.pageNo==1){
            that.filterArray=[];
          }
          else{}
        }
        else{
          $(that.$refs.rightBottom).children('p').text('点击加载更多消息');
        }
        res.list.map(function(value,index){
          that.filterArray.push(value);
        })
      }
      else{
        if(that.pageNo==1){//只一页
          $(that.$refs.rightBottom).children('p').text('暂无消息');
          that.filterArray=[];
        }
        else{//多余一页
          $(that.$refs.rightBottom).children('p').text('暂无更多消息');
        }
      }
    },
    loadMore(){
      var height;
      this.$nextTick(function(){
        height=$(".rightContent").find('tbody tr').last().offset().top;
      })
      this.pageNo=this.pageNo+1;
      var that=this;
      if(this.input2==""){
        $.when(getMessageList(this.userId,this.type,this.pageNo,this.value)).done(function(data){
          if(data.state=="0"){
            that.insertData(data.data);
            that.$nextTick(function(){
              $(document).scrollTop(height-350);
            })
          }
          else{
            alert(data.data);
          }
        })
      }
      else{
        $.when(getSearchMesList(this.userId,this.type,this.pageNo,this.input2)).done(function(data){
          if(data.state=="0"){
            that.insertData(data.data);
            that.$nextTick(function(){
              $(document).scrollTop(height);
            })
          }
          else{
            alert(data.data);
          }
        })
      }
    },
  },
  created: function () {
    this.$nextTick(function(){
      matchMenu();
    })
    this.searchThis();

    // this.insertData(this.testData);//localTest

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
    .btn_position{
      right:265px!important;
    }
    .timeStyle{
      font-size: 13px;
    }
  }
  .rightContent{
    border: 1px solid #eee;
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
        border-bottom: 1px solid #eee;
      }
      th{
        font-size: 14px;
        padding:15px 11px;
        text-align: center;
        font-weight: 500;
        color: #565656;
      }
    }
    tbody{
      tr{
        cursor:pointer;
        color:#454545;
        td{
          // display:inline-block;
          font-size: 14px;
          padding:20px;
          text-align: center;
          .oneLine{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        td:nth-child(1){
          // text-align: left;
        }
      }
      tr:after{
        // content: '';
        // position: absolute;
        // left: 20px;
        // right: 20px;
        // height: 1px;
        // background-color: #ccc;
        content: '';
        position: absolute;
        left: 20px;
        right: 20px;
        // border-bottom: 2px dashed #eee;
        border-bottom: 1px dashed #f0f0f0;
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
    display:none;
    width: 120px;
    position: absolute;
    right: 10px;
    // top: 12px;
    font-size: 12px;
  }

  .input_position{
    display:none;
    width: 235px;
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 12px;
    input{
      background-color: #fafafa!important;
    }
  }
  .btn_position{
    position: absolute;
    right:80px;
    top:12px;
    color:#0099FF;
    font-size: 12px;
    background-color: #fafafa!important;
    padding:11px 15px;
  }

  .grey{
    color:#ccc;
  }
  // .selectStyle{
  //   width: 120px;
  //   position: absolute;
  //   right: 10px;
  //   top: 12px;
  //   font-size: 12px;
  // }
  .rightBottom{
    cursor:pointer;
    margin-top:15px;
    height:50px;
    text-align: center;
    color:#fff;
    background-color: #0099FF;
    line-height:50px;
    // font-size:18px;
    font-size: 16px;
    border-radius:5px;
    margin-bottom:15px;
    span{
      vertical-align:middle;
    }
  }
  .messageStyle{
    .selectStyle{
      display:block;
      width: 120px;
      position: absolute;
      right: 10px;
      top: 12px;
      font-size: 12px;
    }
  }
</style>
