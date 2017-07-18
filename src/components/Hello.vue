<template>
  <div class="hello">
    <div class="content">
      <div class="leftMenu" id="leftMenu">
        <!-- <ul>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/consultation">
                <img src="../../static/img/home.png" alt="">平台主页
              </router-link>
          </li>
        </ul> -->
        <ul class="contentManage ulStyle">
          <li class="noClickStyle">
              <router-link to="">
                <img src="../../static/img/platform.png" alt="">内容管理
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/contentManage">
              内容筛选
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/contentAdd">
              新增内容
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/contentPublish">
              已发布内容
              </router-link>
          </li>
        </ul>
        <ul class="articleManage ulStyle">
          <li class="noClickStyle">
              <router-link to="">
                <img src="../../static/img/platform.png" alt="">资讯数据
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle" v-for="(item,index) in options">
              <!-- <router-link to="/homePage/consultation"> -->
              <router-link :to="{ path: '/homePage/articleList', query: {type:item.value,index:index}}">
              {{item.value}}
              </router-link>
          </li>
        </ul>
        <ul class="messageManage ulStyle">
          <li class="noClickStyle">
              <router-link to="">
                <img src="../../static/img/mes_white.png" alt="" style="height:15px;">消息中心
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <!-- <router-link to="/homePage/instructions"> -->
              <router-link to="/homePage/instructions">
              <!-- <el-badge :value="3" :max="10" class="item">我的批示</el-badge> -->
                <span class="redDot" ref="redDot"><!-- <span>{{psNum}}</span> -->批示内容</span>
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link :to="{path:'/homePage/mesManage',query: {type:'0'}}">
              消息管理
              <!-- <span>3</span>  -->
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link :to="{path:'/homePage/messageBox',query: {type:'1'}}">
              <!-- 系统消息 -->
              <span class="redMes" ref='redMes'><span></span>系统消息</span>
              </router-link>
          </li>
        </ul>
        <ul class="platManage ulStyle">
          <li class="noClickStyle">
              <router-link to="">
                <img src="../../static/img/settings_1.png" alt="">平台管理
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/orgManage">
              组织信息
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/userManage">
              用户管理
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/managementCenter">
              <span class="redDot" ref="redDot"><span></span>批示管理</span>
              </router-link>
          </li>
        </ul>
        <ul class="reporterManage ulStyle">
          <li class="noClickStyle">
              <router-link to="">
                <img src="../../static/img/multiReporter.png" alt="">报告中心
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/IncludeList">
              收录管理
              </router-link>
          </li>
          <li @click="changeColor" class="clickStyle">
              <router-link to="/homePage/ReportList">
              报告列表
              </router-link>
          </li>
          <!-- <li @click="changeColor" class="clickStyle">
              <router-link to="">
              消息中心
              </router-link>
          </li> -->
        </ul>
        <ul class="dataManage ulStyle">
          <li class="clickStyle" @click="changeColor">
              <router-link to="/homePage/DataStatistics">
                <img src="../../static/img/reporter.png" alt="">数据统计
              </router-link>
          </li>
        </ul>
      </div>
      <div class="rightBox" :style="styleObject">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      height_:"",
      styleObject: {
        minHeight: "800px",
      },
      userSource:{},
      options: [],
      psNum:'',
      xtNum:'',
      userid:'',
      // url:'http://192.168.2.129:9000',
      url:'', 
      // options: [
      // {
      //   value: '全部内容',
      //   label: '全部内容'
      // }, 
      // {
      //   value: '动态资讯',
      //   label: '动态资讯'
      // }, 
      // {
      //   value: '校内信息',
      //   label: '校内信息'
      // }],
    }
  },
  computed: {
    ...mapGetters({
      mesCount: 'mesCount',
    })
  },
  watch:{
    mesCount:{
      handler: function (val, oldVal) {
        if(val!=0){
          this.xtNum=val;
          $(this.$refs.redMes).children('span').show();
        }
        else{
          $(this.$refs.redMes).children('span').hide();
        }
      },
      deep:true,
      immediate: true,
    },
  },
  methods:{
    changeColor:function(e){
      // var liItem=$(e.target).closest('li');
      // $(".clickStyle").removeClass("blue");
      // liItem.addClass("blue");
      // $(document).scrollTop(0);
      // $(document).animate(0);
      $('html, body').animate({scrollTop: '0px'},500,'swing');
    },
    getpsRed(){
      var that=this;
      // console.
      // getpsFlag(this.userid)
      // $.when(getpsFlag(this.userid)).done(function(data){
      //   if(data.state=="0"){
      //     that.psNum=data.data.num;
      //   }
      //   else{
      //     alert(data.data);
      //   }
      // })
      // $.post(that.url+"/api/article/instructionChangeMark",
      //     JSON.stringify({
      //       "userId":that.userid,
      //     })
      //   ,function(data){
      //     if(data.state=="0"){
      //       that.psNum=data.data.num;
      //     }
      //     else{
      //       alert(data.data);
      //     }
      //   });
       // $.post({
       //  url: url+"/api/article/instructionChangeMark",
       //  type: "post",
       //  contentType: "application/json;",
       //  data:JSON.stringify({
       //      "userId":id,
       //  })
      // }
      $.ajax({
        url: that.url+"/api/article/instructionChangeMark",
        type: "post",
        contentType: "application/json;",
        data:JSON.stringify({
            "userId":that.userid,
        }),
        success:function(data){
          if(data.state=="0"){
            if(data.data==0){
              $(that.$refs.redDot).children('span').hide();
            }
            else{
              if(data.data>30){
                that.psNum='...';
              }
              else{
                that.psNum=data.data;
              }
              $(that.$refs.redDot).children('span').show();
            }
          }
          else{
            alert(data.data);
          }
        }
    });
    },
    getMesRed(){
      var that=this;
      $.ajax({
        url: that.url+"/api/message/messageCount",
        type: "get",
        // contentType: "application/json;",
        // data:JSON.stringify({
        //     "userId":that.userid,
        // }),
        data:{
          "userId":that.userid,
        },
        success:function(data){
          if(data.state=="0"){
            if(data.data==0){
              $(that.$refs.redMes).children('span').hide();
            }
            else{
              console.log("11");
              if(data.data>30){
                that.xtNum='...';
              }
              else{
                that.xtNum=data.data;
              }
              console.log(data.data);
              // that.xtNum=data.data;
              that.$store.dispatch('changeMesCount',{"mesCount":data.data}).then(function(resp){});
              $(that.$refs.redMes).children('span').show();
            }
          }
          else{
            alert(data.data);
          }
        }
      });
    }
  },
  created(){
    var that=this;
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.userid=this.userSource?this.userSource.id:'';
    $.when(getArticleType()).done(function(data){
      if(data.state=="0"){
        var res=data.data;
        that.options=res.map(function(value,index){
          return {
            // "value":index+1,
            "value":value,
            "label":value,
          }
        })
        that.options.splice(0,0,{value:"全部内容",label:"全部资讯"});
      }
      else{
        alert(data.data);
      }
    })

    this.getpsRed();
    this.getMesRed();
    setInterval(this.getpsRed,300000);
    setInterval(this.getMesRed,300000);
    // 可见菜单设置

    this.$nextTick(function(){
      if(this.userSource){
        if(this.userSource.level==0||this.userSource.level==4){//系统管理员
          $(".articleManage").addClass("showBtn");
          $(".articleManage").css("margin-top",'20px');
          $(".platManage").addClass("showBtn");
          $(".messageManage").addClass("showBtn");
          $(".messageManage").children("li").eq(1).hide();
          $(".dataManage").removeClass("showBtn");
          if(this.userSource.level==0){
            $(".reporterManage").addClass("showBtn newUl");
            $(".reporterManage").children("li").eq(1).hide();
            $(".reporterManage").children("li").eq(2).show();
          }
          else{
            $(".reporterManage").removeClass("newUl");
            $(".dataManage").addClass("showBtn");
          }
        }
        else{}
        if(this.userSource.level==1||this.userSource.level==4){//内容管理员
          $(".contentManage").addClass("showBtn");
          $(".articleManage").addClass("showBtn");
          $(".reporterManage").addClass("showBtn newUl");
          $(".reporterManage").children("li").eq(1).show();
          $(".reporterManage").children("li").eq(2).show();
          $(".messageManage").addClass("showBtn");
          if(this.userSource.level==1){
            $(".messageManage").children("li").eq(2).hide();
            $(".dataManage").removeClass("showBtn");
          }
          else{
            $(".reporterManage").removeClass("newUl");
          }
        }
        else{}
        if(this.userSource.level==2||this.userSource.level==3){//批示用户
          $(".articleManage").css("margin-top",'20px');
          $(".articleManage").addClass("showBtn");
          $(".messageManage").addClass("showBtn");
          $(".messageManage").children("li").eq(2).hide();
          $(".reporterManage").addClass("showBtn newUl");
          $(".reporterManage").children("li").eq(1).hide();
          $(".reporterManage").children("li").eq(2).show();
          $(".dataManage").removeClass("showBtn");
        }
        else{//普通用户
        }
      }
    })//userful

  }
  // beforeMount(){
  //   var self=this;
  //   self.styleObject.minHeight=window.screen.height-74;
  //   console.log(self.styleObject.minHeight);
  // },
  // created:function(){
  //   var self=this;
  //   self.styleObject.minHeight=window.screen.height-74;
  //   console.log(self.styleObject.minHeight);
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/less/init.less';
  .hello{
    width:100%;
    background-color: #F7F7F7;
  }
  .content{
    width:1100px;
    margin:auto;
    padding-top: 20px;
    padding-bottom: 80px;
    .leftMenu{
      margin-bottom:80px;
      background-color: #001726;
      width: 19%;
      color: #fff;
      border-radius:5px;
      float: left;
      .ulStyle{
        display:none;
      }
      ul{
        margin:0;
        li{
          text-align: center;
          // padding:15px 0;
          a{
            display:inline-block;
            padding:15px 0;
            width:100%;
            position: relative;
            .redDot,.redMes{
              // display:none;
              position: relative;
              >span{
                // position: absolute;
                // // display: inline-block;
                // width: 19px;
                // height: 19px;
                // border-radius: 50%;
                // top: -10px;
                // right: -10px;
                // line-height: 19px;
                // font-size: 12px;
                // background-color: #ff6666;
                // color: #fff;
                // display:none;
                position: absolute;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                top: -3px;
                right: -5px;
                line-height: 19px;
                font-size: 12px;
                background-color: #ff6666;
                color: #fff;
                display:none;
              }
            }
          }
          img{
            margin-bottom: -4px;
            display:inline-block;
            padding-right:10px;
            width:21px;
            height:18px;
          }
        }
        .noClickStyle>a{
          cursor:default;
        }
      }
      ul:nth-child(1){
        li:nth-child(1){
          padding-top:30px;
        }
      }
      ul{
        position: relative;
        margin-bottom:20px;
        li:nth-child(1){
          padding-right:31px;
        }
      }
      ul:after{
        content:'';
        background-color: #aaa;
        height:1px;
        position: absolute;
        width:100%;
        // left:20px;
        // right:20px;
        left:0;
        bottom:-10px;
      }
      .newUl:after{
        content:'';
        background-color: #aaa;
        height:0px;
        position: absolute;
        width:100%;
        // left:20px;
        // right:20px;
        left:0;
        bottom:-10px;
      }
      ul:last-child:after{
        height:0;
      }
    }
    .rightBox{
      float:left;
      width:79%;
      margin-left:20px;
    }
   .after;
  }
  .blue{
    color:#0099cc;
    a{
      color:#0099cc;
    }
  }
  .item{
    sup{
      right:5px;
      border:none!important;
    }
  }
</style>
