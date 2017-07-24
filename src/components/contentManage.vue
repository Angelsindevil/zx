<template>
  <div class="contentManage contentManage_new">
    <div class="rightBar">
      <p>内容管理-内容筛选
      </p>
      <el-input
        placeholder="搜索内容"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>

    <div class="rightContent_" v-for="(item,index) in articlesAarry">
      <span class="includeBtn" @click="releaseBtn(item.id,index,$event,item.type)"><span>发布</span></span>
      <router-link target="_blank" :to="{ path: '/homePage/articleDetail', query: { id:item.id,edit:'1'}}">
        <div class="rightContent">
          <!-- <p class="title_bar">
            <span>{{item.title}}<span>
          </p>  -->     
          <p class="title_bar" style="padding-right: 160px;">
            <span class="ellipsis" style="display:block">{{item.title}}</span>
          </p>   
          <p class="title_bottom">
            <span>
              <span class="bottom_item">来源：<span>{{item.source}}</span></span>
             <!--  <span class="bottomLink ellipsis">（<span @click="goSomewhere">{{item.link}}</span>）</span>
              </span></span> -->
              <span class="bottom_item" @click="goSomewhere($event,item.link)">来源链接</span>
              <span class="bottom_item">类别：<span>{{item.type}}</span></span>
              <!-- <span class="bottom_item">时间：<span>{{item.isAdded==1?(item.time.toISOString().slice(0,10)):item.time}}</span></span> -->
              <span class="bottom_item">时间：<span>{{item.time}}</span></span>
              <span class="bottom_item grey" @click="clickDel($event,item.id)" @mouseover="overDel" @mouseout="outDel"><img src="../../static/img/alert-delete.png" alt=""><span class="dele-tips">删除</span></span>
            </span>
          </p>
        </div>
      </router-link>
    </div>
    <div class="rightBottom" ref="rightBottom" @click="loadMore">
      <p>
      点击加载更多内容
      </p>
    </div>
  </div>
</template>

<script>
import {matchMenu} from '../../static/js/public.js'
export default {
  name: 'test',
  data () {
    return {
      options: [{
        value: '1',
        label: '全部内容'
      }, {
        value: '2',
        label: '国家动态'
      }, {
        value: '3',
        label: '地方动态'
      }],
      value: '1',
      pageNo:1,
      input2:'',
      articlesAarry:[
      ],
      tableData:{
        list:[
          {
              'id':'1',
              "title":'湖南：每年遴选30名院士推荐名单，重点培养45岁以下人才！',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'2',
              "title":'2016年度国家科学技术奖正式公布，128所高校获奖',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'1',
              "title":'湖南：每年遴选30名院士推荐名单，重点培养45岁以下人才！',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'2',
              "title":'2016年度国家科学技术奖正式公布，128所高校获奖',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'1',
              "title":'湖南：每年遴选30名院士推荐名单，重点培养45岁以下人才！',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'2',
              "title":'2016年度国家科学技术奖正式公布，128所高校获奖',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'1',
              "title":'湖南：每年遴选30名院士推荐名单，重点培养45岁以下人才！',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
          {
              'id':'2',
              "title":'2016年度国家科学技术奖正式公布，128所高校获奖',
              'source':'山东大学新闻网',
              'link':'http://www.news.zju.edu.cn/',
              'type':'国家动态',
              'date':'2014-06-11',
          },
        ]
      },
      userSource:{},
      userid:'',
    }
  },
  methods:{
    doThis:function(){

    },
    releaseBtn(id,index,e,type){
      // var el=$(e.target).closest(".rightContent_");
      // $.when(releaseArticle(id)).done(function(data){
      //   if(data.state=="0"){
      //     alert("发布成功！");
      //     $(el).remove();
      //     // window.location.reload();
      //   }
      //   else{
      //     alert(data.data);
      //   }
      // })
      this.$store.dispatch('changeRelease',{id:id,type:type}).then(function(resp){});
      $(".mask1,.typeBox").addClass("showBtn");
    },
    outDel:function(e){
      var el=$(e.target).closest(".bottom_item");
      var class_=el.hasClass('blue');
      if(class_){
        el.removeClass("blue").addClass("grey").find(".dele-tips").css("display","none");
        el.find("img").attr("src","./static/img/alert-delete.png");
      }
      else{
      }
    },
    overDel:function(e){
      var el=$(e.target).closest(".bottom_item");
      var class_=el.hasClass('grey');
      if(class_){
        el.removeClass("grey").addClass("blue").find("span").css("display","inline-block");
        el.find("img").attr("src","./static/img/dele-blue.png");
      }
    },
    clickDel(e,id){
      var that=this;
      console.log(e);
      e.stopPropagation();
      e.preventDefault();
      var el=$(e.target).closest(".rightContent_");
      if(confirm("确认删除该篇文章？")){
        $.when(deleteArticle(id)).done(function(data){
          if(data.state=="0"){
            $(el).remove();
            // window.location.reload();
          }
          else if(data.state=='9000'){
            // alert("用户未登录！")
            that.$router.push({path:'/login',query: {}});
          }
          else{
            alert(data.data);
          }
        })
      }
    },
    handleInputClick:function(){
      var that=this;
      that.pageNo=1;
      $.when(contentSearch(that.userid,that.input2,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.articlesAarry=[];
          that.insertData(data.data);
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
    goSomewhere(e,link){
      var ele=e.currentTarget;
      e.preventDefault();
      window.open(link);
    },
    insertData(data){
      var that=this;
      var res=data;
      var len=that.articlesAarry.length;
      if(res.list&&res.list.length!=0){
        if(res.list.length<20){
          $(that.$refs.rightBottom).children('p').text('暂无更多文章');
          if(that.pageNo==1){
            that.articlesAarry=[];
          }
          else{}
        }
        else{
          $(that.$refs.rightBottom).children('p').text('点击加载更多内容');
        }
        // $(that.$refs.rightBottom).children('p').text('点击加载更多内容');
        res.list.map(function(value,index){
          that.articlesAarry.push(value);
        })
      }
      else{
        if(that.pageNo==1){//只一页
          $(that.$refs.rightBottom).children('p').text('暂无文章');
          that.articlesAarry=[];
        }
        else{//多余一页
          $(that.$refs.rightBottom).children('p').text('暂无更多文章');
        }
      }
    },
    loadMore(){
      this.pageNo=this.pageNo+1;
      var height;
      this.$nextTick(function(){
        height=$(".rightContent_").last().offset().top;
      })
      var that=this;
      if(this.input2==""){
        $.when(getContentList(this.userid,that.pageNo,'0')).done(function(data){
          if(data.state=="0"){
            that.insertData(data.data);
            that.$nextTick(function(){
              console.log(height);
              $(document).scrollTop(height);
            })
          }
          else if(data.state=='9000'){
            // alert("用户未登录！")
            that.$router.push({path:'/login',query: {}});
          }
          else{
            alert(data.data);
          }
        })
      }
      else{
        $.when(contentSearch(that.userid,that.input2,that.pageNo)).done(function(data){
          if(data.state=="0"){
            that.insertData(data.data);
            that.$nextTick(function(){
              $(document).scrollTop(height);
            })
          }
          else if(data.state=='9000'){
            // alert("用户未登录！")
            that.$router.push({path:'/login',query: {}});
          }
          else{
            alert(data.data);
          }
        })
      }
    },
  },
  created:function(){
    var that=this;
    this.$nextTick(function(){
      matchMenu();
    })

    // that.insertData(that.tableData);//localTest
    
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    // this.level=this.userSource?this.userSource.level:'';
    this.userid=this.userSource?this.userSource.id:'';
    $.when(getContentList(this.userid,that.pageNo,'0')).done(function(data){
      if(data.state=="0"){
        that.insertData(data.data);
      }
      else if(data.state=='9000'){
        // alert("用户未登录！")
        that.$router.push({path:'/login',query: {}});
      }
      else{
        alert(data.data);
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../static/less/init.less';
  .contentManage_new{
    margin-bottom:65px;
    >a{
      display: block;
      color: #000;
    }
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
          // font-size: 18px;
          // font-size: 16px;
        }
      }
    }
    .includeBtn{
      position: absolute;
      right:30px;
      top:18px;
      width:80px;
      height:30px;
      display:inline-block;
      border:1px solid #0099cc;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      text-align: center;
      // line-height: 30px;
      // font-size: 16px;
      line-height:32px;
      font-size: 12px;
      color: #0099cc;
      // color:#4183F0;
      cursor:pointer;
      z-index:1;
      img{
        display:inline-block;
        margin-bottom: -5px;
        margin-right: 10px;
        width: 25px;
        height: 22px;
      }
    }
    .rightContent_{
      position:relative;
    }
    a{
      color: #000;
      display: block;
    }
    .rightContent{
      width:100%;
      margin-top:15px;
      border:1px solid #eee;
      background-color: #fff;
      border-radius:5px;
      .title_bar{
        padding:20px 40px;
        // font-size:20px;
        font-size: 18px;
        color:#222;
        position: relative;
        border-bottom:1px solid #eee;
      }
      .title_content{
        margin:20px 40px;
        line-height: 35px;
        .mutilEllipsis(2);
        // color:#000!important;
        color:#666;
        font-size: 14px;
      }
      .title_bottom{
        padding:0 40px;
      }
      .title_bottom>span{
        display: inline-block;
        width: 100%;
        // border-top: 2px dashed #eee;
        padding: 20px 0;
        padding-bottom:25px;
        font-size:0;
        >span{
          color:#868686;
          // font-size:14px;
          font-size: 12px;
          display:inline-block;
          img{
            display:inline-block;
            width: 25px;
            height: 25px;
            vertical-align:middle;
          }
          span{
            display:inline-block;
            vertical-align:middle;
          }
          .dele-tips{
            display:none;
          }
          // width:33.3%;
        }
        .bottom_item{
          position: relative;
          .bottomLink{
            padding-right:10px;
            color: rgb(0, 0, 255);
            display: inline-block;
            width: 80%;
            position: absolute;
            bottom: -20px;
            left: 0;
          }
        }
        .bottom_item:first-child{
          width:26%;
        }
        .bottom_item:nth-child(2){
          width:22%;
          color: blue;
          text-decoration: underline;
        }
        .bottom_item:nth-child(3),.bottom_item:nth-child(4){
          width:22%;
        }
        .bottom_item:last-child{
          width:8%;
          text-align:right;
          // position
        }
      }
    }
    // .rightContent:last-child{
    //   margin-bottom:15px;
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
    .grey{
      border-color:#C3C7D0!important;
      color:#C3C7D0!important;
    }
    .red{
      border-color:#FF6666!important;
      color:#FF6666!important;
      img{
        width:15px!important;
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
      position: absolute;
      right: 15px;
      top: 12px;
      width: 120px;
    }
    .input_position{
      width: 230px;
      position: absolute;
      right: 10px;
      top: 12px;
      font-size: 13px;
      input{
        background-color: #fafafa!important;
      }
    }
  }
</style>
