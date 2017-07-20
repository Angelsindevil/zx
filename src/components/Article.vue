<template>
  <div class="article">
    <div class="title_bar">
      <p style="padding-right:110px">
        <span class="ellipsis" style="display:block;font-size: 18px;color: #222;padding-top:0">{{title}}</span>
        <span>
          <span>来源：<span class="ellipsis" style="display: inline-block;width: 65%;vertical-align: middle;">{{source}}</span></span>
          <span class="linkStyle" @click="goSomewhere($event,link)" style="color: blue;text-decoration: underline;">来源链接</span>
          <span>类别：<span>{{type}}</span></span>
          <span>时间：<span>{{date}}</span></span>
        </span> 
      </p>
      <router-link :to="{path:'/homePage/contentAdd', query: { id:id}}" class="art_edit">
        <el-button type="text" size="small" class="editBtn">编辑</el-button>
      </router-link>
      <!-- <span class="includeBtn includeBtn_fb" @click="releaseBtn(id,$event,type)" style="width:80px;font-size:12px"><span>发布</span></span>
      <span class="includeBtn includeBtn_cfb" @click="clickBtn($event,id)" @mouseover="overBtn" @mouseout="outBtn"><span>已发布</span></span> -->
      <span class="includeBtn includeBtn_fb"
       @click="releaseChange(id,$event,type,isRelease)" 
       style="width:80px;font-size:12px"
       v-show="(level!=3)?true:false"
       :class="isRelease=='1'?'grey':false"
       >
        <span>{{isRelease=='1'?'已发布':'发布'}}</span>
       </span>
      <span class="includeBtn includeBtn_sl" 
        v-show="(level!=3)?true:false"
        :class="((level==0||level==2)?(isInstructions=='0'?'':'grey'):((level==1||level==4)?(isInclude=='0'?'':'grey'):''))"
        :data-state="isInstructions" 
        :data-pid="instructionId" 
        :data-id="id" 
        :data-title="title" 
        :data-i="number" 
        @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_" 
        ref="includeBtn">
        <!-- <img src="../../static/img/plus.png" alt="" 
        v-show="(level==0||level==2)?((isInstructions=='0')?true:false):((level==1)?((isInclude=='0')?true:false):false)">
        <span>
        {{(level==0||(level==2))?(isInstructions=='0'?'批示':'批示中'):((level==1)?(isInclude=='0'?'收录':'已收录'):false)}}
        </span> -->
        <img 
        :src="(level==1||level==4)?((isInclude=='0')?'./static/img/plus.png':'./static/img/plus_grey.png'):'./static/img/plus.png'" 
        alt="" 
        v-show="(level==0||level==2)?((isInstructions=='0')?true:false):((level==1||level==4)?true:false)">
        <span>
        {{(level==0||(level==2))?(isInstructions=='0'?'批示':'批示中'):((level==1||level==4)?(isInclude=='0'?'收录':'已收录'):false)}}
        </span>
      </span>
      <!-- <span class="includeBtn" :class="isInstructions=='0'?'':'grey'" :data-state="isInstructions" :data-id="id" :data-pid="instructionId" :data-title="title" :data-i="number" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt="" v-show="isInstructions=='0'?true:false"><span>{{isInstructions=='0'?'批示':'批示中'}}</span></span> -->
    </div>
    <div class="content_bar">
      <div class="article_content">
        <p v-html="content" class="ql-editor">
         <!-- 今天上午，湖南省科协第十次全省代表大会闭幕。会议中《湖南省科协事业发展“十三五”规划纲要》（下称《规划》)获通过，明确了我省科协事业“十三五”期间的发展目标和主要任务。“十二五”是我省科协事业快速发展、成效明显的五年。《全民科学素质行动计划纲要》深入实施，全省公民具备科学素质比例达到5.14%，比“十一五”末提高2.96个百分点。根据《规划》，“十三五”时期我省将健全科协组织、创新创业服务和科学普及三大体系，并建设科技工作者之家、科普主题公园、科技传播中心等三大服务平台。同时，实施科技人才托举、创新驱动助力、科普惠民提升和精准扶贫科技助力等四大工程，打造“科技湘军”“科普湖南”“湖湘智库”“湖南智造”四大品牌建设。力争到“十三五”末，基本形成符合科技创新规律和湖南发展需要的科协事业发展体制机制。《规划》还提出，我省将继续深入实施《全民科学素质行动计划纲要(20162020年)》，创新科普机制，形成全方位联合协作的社会化科普大格局，力争到“十三五”末，全省公民具备科学素质 -->
         <!-- {{content}} -->
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'article',
  data () {
    return {
      id:'',
      content:'',
      source:'',
      title:'',
      date:'',
      type:'',
      isInclude:'',
      number:'',
      isInstructions:'',
      btnState:'批示',
      instructionId:'',
      edit:'',
      datanew:{
        'id':'1',
        "title":'湖南：每年遴选30名院士推荐名单，重点培养45岁以下人才！',
        'source':'山东大学新闻网',
        'type':'国家动态',
        'date':'2014-06-11',
        'content':'<br>今天上午，湖南省科协第十次全省代表大会闭幕。会议中《湖南省科协事业发展“十三五”规划纲要》（下称《规划》)获通过，明确了我省科协事业“十三五”期间的<span style="color:red">发展目标</span>和主要任务。...',
      },
      userSource:{},
      level:'',
      userid:'',
    }
  },
  methods:{
    doThis:function(){

    },
    goSomewhere(e,link){
      var ele=e.currentTarget;
      e.preventDefault();
      window.open(link);
    },
    releaseChange(id,e,type,isRelease){
      console.log(isRelease);
      if(isRelease=='1'){
        this.clickBtn(e,id);
      }
      else{
        this.releaseBtn(id,e,type);
      }
    },
    clickBtn:function(e,id){
      var that=this;
      e.stopPropagation();
      e.preventDefault();
      $.when(cancelArticle(id)).done(function(data){
        if(data.state=="0"){
          window.location.reload();
        }
        else if(data.state=='9000'){
          alert("用户未登录！")
          that.$router.push({path:'/login',query: {}});
        }
        else{
          alert(data.data);
        }
      })
    },
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
    // releaseBtn(id){
    //   var that=this;
    //   $.when(releaseArticle(id)).done(function(data){
    //     if(data.state=="0"){
    //       alert("文章发布成功！")
    //       that.$router.push({path:'/homePage/contentPublish'});
    //     } 
    //     else{
    //       alert(data.data);
    //     }
    //   })
    // },
    releaseBtn(id,e,type){
      this.$store.dispatch('changeRelease',{id:id,type:type}).then(function(resp){});
      $(".mask1,.typeBox").addClass("showBtn");
    },
    // includeThis_:function(e){
    //   var el=$(e.target).closest(".includeBtn");
    //   var class_=el.hasClass('grey');
    //   if(class_){
    //     el.removeClass("red").addClass("grey").find("span").text("已收录");
    //     el.find("img").attr("src","./static/img/plus_grey.png");
    //   }
    //   else{
    //   }
    // },
    // canceInclude:function(e){
    //   var el=$(e.target).closest(".includeBtn");
    //   var class_=el.hasClass('grey');
    //   if(class_){
    //     el.addClass("red").find("span").text("取消收录");
    //     el.find("img").attr("src","./static/img/reduce.png");
    //   }
    // },
    // includeThis:function(e){
    //   // store.includeThis_(e);
    //   e.stopPropagation();
    //   var el=$(e.target).closest(".includeBtn");
    //   var class_=el.hasClass('red');
    //   if(class_){//取消收录
    //     $.when(canceled(this.id)).done(function(data){
    //       if(data.state=="0"){
    //         el.removeClass("grey red").find("span").text("收录");
    //         el.find("img").attr("src","./static/img/plus.png");
    //       }
    //       else{
    //         alert(data.data);
    //       }
    //     })
    //   }
    //   else{////收录
    //     $.when(included(this.id)).done(function(data){
    //       if(data.state=="0"){
    //         el.addClass("grey").find("span").text("已收录");
    //         el.find("img").attr("src","./static/img/plus_grey.png");
    //       }
    //       else{
    //         alert(data.data);
    //       }
    //     })
    //   }
    // },
    includeThis_:function(e){
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
    showPSBox:function(){
      $(".mask1").addClass("showBtn");
      $(".psBox").addClass("showBtn");
      $(".psBox").find(".article_btn").attr("disabled",false).removeClass("is-disabled");
      this.$store.dispatch('changeAlertBox',{"type":'0'}).then(function(resp){});
    },
    includeThis:function(e){
      if(this.btnState!='批示'){
        var that=this;
        e.stopPropagation();
        var el=$(e.target).closest(".includeBtn");
        var class_=el.hasClass('red');
        var id=$(el).attr("data-id");
        if(class_){
          $.when(canceled(id,this.userid)).done(function(data){
            if(data.state=="0"){
            }
            else if(data.state=='9000'){
              alert("用户未登录！")
              that.$router.push({path:'/login',query: {}});
            }
            else{
              alert(data.data);
            }
          })
          el.removeClass("grey red").find("span").text("收录");
          el.find("img").attr("src","./static/img/plus.png");
        }
        else{
          $.when(included(id,this.userid)).done(function(data){
            if(data.state=="0"){
            }
            else if(data.state=='9000'){
              alert("用户未登录！")
              that.$router.push({path:'/login',query: {}});
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
  },
  created: function() {
    this.id = this.$route.query.id;
    this.number=this.$route.query.index;
    this.edit=this.$route.query.edit;
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
    if(this.edit=='0'&&this.level!=3){//已发布文章列表点击查看文章详情
      this.$nextTick(function(){
        $(".art_edit").removeClass("showBtn");
        $(".includeBtn").hide();
        $(".includeBtn_sl").show();
        $(".linkStyle").hide();
      })
    }
    else if(this.edit=='1'&&this.level!=3){
      localStorage.setItem("editor",JSON.stringify(this.datanew));
      this.$nextTick(function(){
        $(".art_edit").addClass("showBtn");
        $(".includeBtn").hide();
        $(".includeBtn_fb").show();
        $(".linkStyle").show();
      })
    }
    else if(this.level!=3){
      this.$nextTick(function(){
        $(".art_edit").removeClass("showBtn");
        $(".includeBtn").hide();
        // $(".includeBtn_cfb").show();
        $(".includeBtn_fb").show();
        $(".linkStyle").hide();
      })
    }
    else{}
    var that=this;
    if(this.id!=''){
      $.when(getArticleDetail(that.id,this.userid)).done(function(data){
        if(data.state=="0"){
          var res=data.data;
          var str='';
          localStorage.setItem("editor",JSON.stringify(res));
          // var content=$.parseHTML(res.content);
          // for(var i=0;i<content.length;i++){
          //   if(content[i].outerText){
          //     str=str+content[i].outerText ;
          //   }
          //   else{
          //     str=str+content[i].textContent ;
          //   }
          // }
          that.content=res.content;
          // that.content=str;
          that.date=res.time;
          that.type=res.type;
          that.source=res.source;
          that.link=res.link;
          that.title=res.title;
          that.isInclude=res.isInclude;
          that.isInstructions=res.isInstructions;
          that.instructionId=res.instructionId;
          that.isAdded=res.isAdded;
          that.isRelease=res.isRelease;
        }
        else if(data.state=='9000'){
          alert("用户未登录！")
          that.$router.push({path:'/login',query: {}});
        }
        else{
          alert(data.data);
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/less/init.less';
  .article{
    width:100%;
    background-color: #fff;
    .art_edit{
      display:none;
    }
  }
  .title_bar{
    position: relative;
    border-bottom: 1px solid #eee;
    padding:20px 40px;
    p{
      // font-size: 20px;
      font-size: 18px;
      color:#222;
      >span{
        display:block;
        width: 100%;
        padding: 20px 0;
        font-size:0;
        padding-bottom:0;
        >span{
          color:#868686;
          // font-size:14px;
          font-size: 12px;
          display:inline-block;
          width:20%;
        }
      }
    }
    .editBtn{
      position: absolute;
      right: 160px;
      top: 35px;
    }
    img{
      display:inline-block;
      margin-bottom: -5px;
      margin-right: 10px;
      width: 25px;
      height: 22px;
    }
    .includeBtn{
      position: absolute;
      right:30px;
      top:30px;
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
      font-size: 14px;
      line-height:32px;
      color: #0099cc;
      // color:#4183F0;
      cursor:pointer;
    }
    .includeBtn_cfb{
      border:1px solid #cecece;
      color: #cecece;
    }
    .includeBtn_blue{
      background-color: #0099cc;
      color:#fff;
      // border-color:#0099cc;
      // color:#0099cc;
    }
  }
  .content_bar{
    width:100%;
    .article_content{
      padding:20px 40px;
      p{
        color:#656565;
        width: 100%;
        line-height: 35px;
        // text-indent: 2em;
      }
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
</style>
