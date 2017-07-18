<template>
  <div class="contentPublish">
     <div class="rightBar">
      <p>发布内容-全部资讯：
        <span>总共发布<span>{{totalNum}}</span>篇,今日发布<span>{{todayNum}}</span>篇</span>
      </p>
      <el-input
        placeholder="搜索内容"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>

    <div class="rightContent_" v-for="(item,index) in articlesAarry">
      <span class="includeBtn" @click="clickBtn($event,item.id)" @mouseover="overBtn" @mouseout="outBtn"><span>已发布</span></span>
      <router-link :to="{ path: '/homePage/articleDetail', query: { id:item.id,edit:'2'}}">
        <div class="rightContent">
          <!-- <p class="title_bar">
            <span>{{item.title}}<span>
          </p>  -->
          <p class="title_bar" style="padding-right: 160px;">
            <span class="ellipsis" style="display:block">{{item.title}}</span>
          </p>        
          <p class="title_bottom">
            <span>
              <!-- <span class="bottom_item">来源：<span>{{item.source}}
              <span class="bottomLink ellipsis">（<span @click="goSomewhere">{{item.link}}</span>）</span>
              </span></span> -->
              <span class="bottom_item">来源：<span>{{item.source}}</span></span>
             <!--  <span class="bottomLink ellipsis">（<span @click="goSomewhere">{{item.link}}</span>）</span>
              </span></span> -->
              <span class="bottom_item" @click="goSomewhere($event,item.link)">来源链接</span>
              <span class="bottom_item">类别：<span>{{item.type}}</span></span>
              <!-- <span class="bottom_item">时间：<span>{{item.time}}</span></span> -->
              <span class="bottom_item">时间：<span>{{item.time}}</span></span>
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
  name: 'contentPublish',
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
          }
        ]
      },
      todayNum:'',
      totalNum:'',
      userSource:{},
      userid:'',
    }
  },
  methods:{
    outBtn:function(e){
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('includeBtn_blue');
      if(class_){
        el.removeClass("includeBtn_blue").find("span").text("已发布");
      }
      else{
      }
    },
    overBtn:function(e){
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('includeBtn_blue');
      if(!class_){
        el.addClass("includeBtn_blue").find("span").text("取消发布");
      }
    },
    clickBtn:function(e,id){
      console.log(e);
      e.stopPropagation();
      e.preventDefault();
      $.when(cancelArticle(id)).done(function(data){
        if(data.state=="0"){
          window.location.reload();
        }
        else{
          alert(data.data);
        }
      })
    },
    // goSomewhere(e){
    //   var ele=e.currentTarget;
    //   e.preventDefault();
    //   window.open($(ele).text());
    // },
    goSomewhere(e,link){
      var ele=e.currentTarget;
      e.preventDefault();
      window.open(link);
    },
    insertData(data){
      var that=this;
      var res=data;
      var len=that.articlesAarry.length;
      that.totalNum=res.totalNum;
      that.todayNum=res.todayNum; 
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
    handleInputClick:function(){
      var that=this;
      that.pageNo=1;
      $.when(releasedSearch(that.userid,that.input2,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.articlesAarry=[];
          that.insertData(data.data);
        }
        else{
          alert(data.data);
        }
      })
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
              $(document).scrollTop(height);
            })
          }
          else{
            alert(data.data);
          }
        })
      }
      else{
        $.when(releasedSearch(that.userid,that.input2,that.pageNo)).done(function(data){
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
  created:function(){
    var that=this;
    this.$nextTick(function(){
      matchMenu();
    })

    // that.insertData(that.tableData);//localTest
    
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.userid=this.userSource?this.userSource.id:'';
    $.when(getContentList(this.userid,that.pageNo,'1')).done(function(data){
      if(data.state=="0"){
        that.insertData(data.data);
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
  .contentPublish{
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
      border:1px solid #cecece;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      text-align: center;
      // line-height: 30px;
      // font-size: 16px;
      line-height:32px;
      font-size: 12px;
      color: #cecece;
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
    .includeBtn_blue{
      background-color: #0099cc;
      color:#fff;
      // border-color:#0099cc;
      // color:#0099cc;
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
            span{
              vertical-align:initial;
            }
          }
        }
        .bottom_item:first-child{
          width:25%;
        }
        .bottom_item:nth-child(2){
          width:25%;
          color: blue;
          text-decoration: underline;
        }
        .bottom_item:nth-child(3){
          width:25%;
        }
        .bottom_item:last-child{
          width:25%;
          text-align:right;
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
