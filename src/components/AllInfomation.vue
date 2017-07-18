<template>
  <!-- 动态资讯列表 -->
  <div class="test allInfomations">
    <!-- <div class="showTop" @click="showTop">
      <img src="../../static/img/toTop.png" title="点击回到顶部">
    </div> -->
    <div class="rightBar">
      <p>信息平台-全部信息：
        <!-- <span>今日更新<span>136</span>篇，今日收录<span>12</span>篇</span> -->
        <span>今日更新<span>{{totalNum}}</span>篇，今日收录<span>{{todayNum}}</span>篇</span>
      </p>
      <el-select v-model="value" placeholder="" @change="optionChangeHandler" class="selectStyle">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- <div class="admin_ui_select">
          <select id="themeBox">
            <option value="">全部内容</option>
            <option value="">已收录</option>
            <option value="">未收录</option>
          </select>
      </div> -->
    </div>
    <div class="rightContent_" v-for="(item,index) in articlesAarry">
     <!--  <ul>
        <li v-for="(item,index) in articlesAarry">
          <div class="rightContent_"> -->
            <!-- <span class="includeBtn" :class="item.isInstructions=='0'?'':'grey'" :data-state="item.isInstructions" :data-pid="item.instructionId" :data-id="item.id" :data-title="item.title" :data-i="index" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_" ref="includeBtn"><img src="../../static/img/plus.png" alt="" v-show="(level==0||level==2)?((item.isInstructions=='0')?true:false):((level==1)?true:false)"> -->


              <span class="includeBtn" 
              v-show="(level!=3)?true:false"
              :class="((level==0||level==2)?(item.isInstructions=='0'?'':'grey'):((level==1||level==4)?(item.isInclude=='0'?'':'grey'):''))"
              :data-state="item.isInstructions" 
              :data-pid="item.instructionId" 
              :data-id="item.id" 
              :data-title="item.title" 
              :data-i="index" 
              @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_" 
              ref="includeBtn">
              <!-- <img src="../../static/img/plus.png" alt="" 
              v-show="(level==0||level==2)?((item.isInstructions=='0')?true:false):((level==1)?((item.isInclude=='0')?true:false):false)"> -->
              <img 
              :src="(level==1||level==4)?((item.isInclude=='0')?'./static/img/plus.png':'./static/img/plus_grey.png'):'./static/img/plus.png'" 
              alt="" 
              v-show="(level==0||level==2)?((item.isInstructions=='0')?true:false):((level==1||level==4)?true:false)">
              <span>
              {{(level==0||(level==2))?(item.isInstructions=='0'?'批示':'批示中'):((level==1||level==4)?(item.isInclude=='0'?'收录':'已收录'):false)}}
              </span>
            </span>
            <router-link :to="{ path: '/homePage/articleDetail', query: { id:item.id,index:index,edit:'0'}}">
              <div class="rightContent">
                <p class="title_bar" style="padding-right: 160px;">
                  <span class="ellipsis" style="display:block">{{item.title}}</span>
                </p>       
                <p class="title_content" v-html="item.summary">
                  <!-- {{item.summary}} -->
                </p>
                <p class="title_bottom">
                  <span>
                    <span>来源：<span>{{item.source}}</span></span>
                    <span>类别：<span>{{item.type}}</span></span>
                    <span>时间：<span>{{item.time}}</span></span>
                  </span> 
                </p>
              </div>
            </router-link>
         <!--  </div> 
        </li>    
      </ul> -->
      <!-- <div class="rightContent_">
        <span class="includeBtn" data-state="true" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt=""><span>{{btnState}}</span></span>
        <router-link :to="{ path: 'articleDetail', query: { id: '001' }}">
          <div class="rightContent">
            <p class="title_bar">
              <span>山东大学实施学科高峰计划，未来五年50亿元投入学科建设<span>
            </p>       
            <p class="title_content">
              教育部、国家外国专家局日前印发《高等学校学科创新引智计划实施与管理办法》（以下简称《办法》）。《办法》明确，“高等学校学科创新引智计划”（简称“111计划”）基地5年进行一次周期性评估，评估工作由“111专委会”教育部、国家外国专家局日前印发
            </p>
            <p class="title_bottom">
              <span>
                <span>来源：<span>山东大学新闻网</span></span>
                <span>类别：<span>国家动态</span></span>
                <span>时间：<span>2014-06-11</span></span>
              </span> 
            </p>
          </div>
        </router-link>
      </div> -->
      <!-- <div class="rightContent_">
        <span class="includeBtn" data-state="false" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt=""><span>{{btnState}}</span></span>
        <router-link to="/articleDetail">
          <div class="rightContent">
            <p class="title_bar">
              <span>山东大学实施学科高峰计划，未来五年50亿元投入学科建设<span>
            </p>       
            <p class="title_content">
              教育部、国家外国专家局日前印发《高等学校学科创新引智计划实施与管理办法》（以下简称《办法》）。《办法》明确，“高等学校学科创新引智计划”（简称“111计划”）基地5年进行一次周期性评估，评估工作由“111专委会”教育部、国家外国专家局日前印发
            </p>
            <p class="title_bottom">
              <span>
                <span>来源：<span>山东大学新闻网</span></span>
                <span>类别：<span>国家动态</span></span>
                <span>时间：<span>2014-06-11</span>&nbsp;&nbsp;<span>09:00</span></span>
              </span> 
            </p>
          </div>
        </router-link>
      </div> -->
     <!--  <div class="rightContent_">
        <span class="includeBtn" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt=""><span>{{btnState}}</span></span>
        <router-link to="/articleDetail">
          <div class="rightContent">
            <p class="title_bar">
              <span>山东大学实施学科高峰计划，未来五年50亿元投入学科建设<span>
            </p>       
            <p class="title_content">
              教育部、国家外国专家局日前印发《高等学校学科创新引智计划实施与管理办法》（以下简称《办法》）。《办法》明确，“高等学校学科创新引智计划”（简称“111计划”）基地5年进行一次周期性评估，评估工作由“111专委会”教育部、国家外国专家局日前印发
            </p>
            <p class="title_bottom">
              <span>
                <span>来源：<span>山东大学新闻网</span></span>
                <span>类别：<span>国家动态</span></span>
                <span>时间：<span>2014-06-11</span>&nbsp;&nbsp;<span>09:00</span></span>
              </span> 
            </p>
          </div>
        </router-link>
      </div> -->
     <!--  <div class="rightContent_">
        <span class="includeBtn" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt=""><span>{{btnState}}</span></span>
        <router-link to="/articleDetail">
          <div class="rightContent">
            <p class="title_bar">
              <span>山东大学实施学科高峰计划，未来五年50亿元投入学科建设<span>
            </p>       
            <p class="title_content">
              教育部、国家外国专家局日前印发《高等学校学科创新引智计划实施与管理办法》（以下简称《办法》）。《办法》明确，“高等学校学科创新引智计划”（简称“111计划”）基地5年进行一次周期性评估，评估工作由“111专委会”教育部、国家外国专家局日前印发
            </p>
            <p class="title_bottom">
              <span>
                <span>来源：<span>山东大学新闻网</span></span>
                <span>类别：<span>国家动态</span></span>
                <span>时间：<span>2014-06-11</span>&nbsp;&nbsp;<span>09:00</span></span>
              </span> 
            </p>
          </div>
        </router-link>
      </div> -->
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
  name: 'test',
  data () {
    return {
      options: [
      {
        value: '全部内容',
        label: '全部内容'
      }, 
      {
        value: 'dynamic',
        label: '动态资讯'
      }, 
      {
        value: 'manual',
        label: '校内信息'
      }],
      // options: [],
      value: '全部内容',
      userid:'',
      totalNum:'',
      todayNum:'',
      keyword:'',
      btnState:'批示',
      // method:'dynamic',
      // method:'全部内容',
      // type:'全部内容',
      type:'',
      add:'',
      articlesAarry:[
      ],
      flag:false,
      pageNo:1,
      userSource:{},
      level:'',
    }
  },
  watch: { 
    // this.$route(to, from) { 
    //    // 对路由变化作出响应... 
    // }
    '$route': 'searchThis'
  },
  methods:{
    // showTop(){
    //   $(document).scrollTop(0);
    // },
    searchThis:function(){
      this.pageNo=1,
      this.flag=true;
      this.keyword = this.$route.query.keyword;
      this.add = this.$route.query.add;
      this.type=this.$route.query.type;
      this.value='全部内容';
      this.articlesAarry=[];
      var that=this;
      if(this.keyword!=''&&this.keyword!=undefined){
        $.when(searchArticle(that.keyword,that.pageNo,this.userid)).done(function(data){
          if(data.state=="0"){
            // that.$nextTick(function(){
            //   $(".rightContent_").remove();
            // })
            that.insertData(data); 
            that.$nextTick(function(){
              $(document).scrollTop(0);
            })
            that.flag=false;
          }
          else{
            alert(data.data);
          }
        })
      }
      else{//this.add=='全部'以及其他所有可能
        // if(this.add=='全部'){
          $.when(getAllArticles(that.userid,that.value,that.type,that.pageNo)).done(function(data){
            if(data.state=="0"){
              that.insertData(data);
              that.$nextTick(function(){
                $(document).scrollTop(0);
              })
                  // that.articlesAarry=data.data.list;
            }
            else{
              alert(data.data);
            }
          })
        // }
        // else{

        // }
      }
    },
    optionChangeHandler(val){
      // if(this.flag){
        var that=this;
        this.pageNo=1,
        this.articlesAarry=[];
        $.when(getAllArticles(this.userid,val,this.type,that.pageNo)).done(function(data){
          if(data.state=="0"){
            that.insertData(data);
          }
          else{
            alert(data.data);
          }
        })
      // }
    },
    includeThis_:function(e){
      // e.stopPropagation();
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('grey');
      if(this.btnState!='批示'){
        // var state=el.attr("data-state");
        // if(state=="false"){//文章不在批示中，可新增批示
        //   this.showPSBox();
        // }
        // else{
        //   el.find("span").text("已批示");
        //   el.addClass("grey");
        //   el.find("img").remove();
        // }
        if(class_){
          el.removeClass("red").addClass("grey").find("span").text("已收录");
          el.find("img").attr("src","./static/img/plus_grey.png");
        }
        else{
        }
      }
      // else{
      //   if(class_){
      //     el.removeClass("red").addClass("grey").find("span").text("已收录");
      //     el.find("img").attr("src","./static/img/plus_grey.png");
      //   }
      //   else{
      //   }
      // }
    },
    canceInclude:function(e){
      if(this.btnState!='批示'){
        var el=$(e.target).closest(".includeBtn");
        var class_=el.hasClass('grey');
        if(class_){
          el.addClass("red").find("span").text("取消收录");
          el.find("img").attr("src","./static/img/reduce.png");
        }
      }
      else{
      }
    },
    includeThis:function(e){
      // e.stopPropagation();
      if(this.btnState!='批示'){
        e.stopPropagation();
        var el=$(e.target).closest(".includeBtn");
        var class_=el.hasClass('red');
        var id=$(el).attr("data-id");
        if(class_){
          $.when(canceled(id,this.userid)).done(function(data){
            if(data.state=="0"){
              el.removeClass("grey red").find("span").text("收录");
              el.find("img").attr("src","./static/img/plus.png");
            }
            else{
              alert(data.data);
            }
          })
        }
        else{
          $.when(included(id,this.userid)).done(function(data){
            if(data.state=="0"){
            }
            else{
              alert(data.data);
            }
          })
          el.addClass("grey").find("span").text("已收录");
          el.find("img").attr("src","./static/img/plus_grey.png");
        }
      }
      else{//批示功能
        var el=$(e.target).closest(".includeBtn");
        var class_=el.hasClass('grey');
        var state=el.attr("data-state");
        var title=$(el).attr("data-title");
        var id=$(el).attr("data-id");
        var pid=$(el).attr("data-pid");
        var i=$(el).attr("data-i");
        var articleObj={
          value:title,
          radio:i,
          id:id,
        };
        var psObj={
          "value":title,//表示在文章列表或者详情页跳转
          "id":id,
        }
        if(state=="0"){//文章不在批示中，可新增批示
          this.$store.dispatch('changeNewArticle',{newArcticle:articleObj}).then(function(resp){});
          this.$store.dispatch('changePsShow',{psShow:psObj}).then(function(resp){});
          // this.$store.dispatch('changeArtObj',{articleObj:this.articleObj}).then(function(resp){});
          this.showPSBox();
        }
        else{
          el.find("span").text("批示中");
          el.addClass("grey");
          el.find("img").remove();
          // this.$router.push({path:'/homePage/instructionsDetail',query: {id:pid}});
        }
      }
    },
    copyArr(arr){
      return arr.map((e)=>{
          if(typeof e === 'object'){
              return Object.assign({},e)
          }else{
              return e
          }
      })
    },
    goSomewhere(e){
      var ele=e.currentTarget;
      e.preventDefault();
      window.open($(ele).text());
    },
    routerChange(id){
      this.$router.push({path:'/homePage/articleDetail', params: { id: id}})
    },
    showPSBox:function(){
      $(".mask1").addClass("showBtn");
      $(".psBox").addClass("showBtn");
      $(".psBox").find(".article_btn").attr("disabled",false).removeClass("is-disabled");
      this.$store.dispatch('changeAlertBox',{"type":'0'}).then(function(resp){});
    },
    insertData(data){
      var that=this;
      // $('.contentBox').empty();
      var res=data.data;
      var len=that.articlesAarry.length;
      that.totalNum=res.updateNum;
      that.todayNum=res.includeNum; 
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
        res.list.map(function(value,index){
          that.articlesAarry.push(value);
        })
        // that.articlesAarry.concat(that.copyArr(res.list));
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
      // if(!this.flag){
        if(this.keyword!=''&&this.keyword!=undefined){
          $.when(searchArticle(that.keyword,that.pageNo,this.userid)).done(function(data){
            if(data.state=="0"){
              that.insertData(data); 
              that.flag=false;
              that.$nextTick(function(){
                $(document).scrollTop(height-350);
              })
            }
            else{
              alert(data.data);
            }
          })
        }
      // }
      else{
        $.when(getAllArticles(that.userid,that.value,that.type,that.pageNo)).done(function(data){
          if(data.state=="0"){
            that.insertData(data);
            that.$nextTick(function(){
              // $(document).scrollTop(height);
              $(document).scrollTop(height-350);
            })
            // that.articlesAarry=data.data.list;
          }
          else{
            alert(data.data);
          }
        })
      }
    },
  },
  mounted(){
  },
  created: function() {
    this.keyword = this.$route.query.keyword;
    this.add = this.$route.query.add;
    this.type=this.$route.query.type;//获得左侧菜单type
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.level=this.userSource?this.userSource.level:'';
    this.userid=this.userSource?this.userSource.id:'';
    if(this.level==0||this.level==2){
      this.btnState='批示';
    }
    else if(this.level==1||this.level==4){
      this.btnState='收录';
    }
    else{}
    var that=this;
    if(this.keyword!=''&&this.keyword!=undefined){//有关键词的时候
      this.searchThis();
    }
    else{
      $.when(getAllArticles(that.userid,that.value,that.type,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.insertData(data);
          that.$nextTick(function(){
            $(document).scrollTop(0);
          })
          // that.articlesAarry=data.data.list;
        }
        else{
          alert(data.data);
        }
      })
    }
    this.$nextTick(function(){
      matchMenu();
    })
    // $.when(getArticleType()).done(function(data){
    //   if(data.state=="0"){
    //     var res=data.data;
    //     that.options=res.map(function(value,index){
    //       return {
    //         // "value":index+1,
    //         "value":value,
    //         "label":value,
    //       }
    //     })
    //     that.options.splice(0,0,{value:"全部内容",label:"全部内容"});
    //   }
    //   else{
    //     alert(data.data);
    //   }
    // })
    // scrollFun();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../static/less/init.less';
  .test{
    margin-bottom:65px;
    >a{
      display: block;
      color: #000;
    }
  }
  .allInfomations{
    // .showTop{
    //   cursor:pointer;
    //   display:none;
    //   position: fixed;
    //   bottom:100px;
    //   right:30px;
    //   width:40px;
    //   height:40px;
    //   background-color: rgba(204,204,204,.8);
    //   border-radius: 50%;
    //   text-align: center;
    //   box-shadow:0 0 10px #aaa;
    //   img{
    //     display: inline-block;
    //       width: 22px;
    //       height: 22px;
    //       vertical-align: middle;
    //       margin-top: 10px;
    //   }
    // }
    // .showTop:hover,.showTop:active{
    //   background-color: #b5b5b5;
    // }
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
      width:100px;
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
      font-size: 14px;
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
        border-top: 2px dashed #eee;
        padding: 20px 0;
        font-size:0;
        >span{
          color:#868686;
          // font-size:14px;
          font-size: 12px;
          display:inline-block;
          width:33.3%;
        }
        // >span:first-child{
        //   width:60%;
        // }
        // >span:nth-child(2){
        //   width:20%;
        // }
        // >span:last-child{
        //   width:20%;
        // }
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
  }
</style>
