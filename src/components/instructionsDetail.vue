<template>
  <div class="instructionsDetail">
    <div class="rightBar">
      <p>消息反馈-我的批示：
        <span>批示流程详细信息</span>
      </p>
      <router-link to='/homePage/managementCenter'><el-button class="btn_position">返回</el-button></router-link>
    </div>
    <div class="rightContent" v-for="(item,index) in articlesFilter">
      <!-- <ul>
        <li v-for="(item,index) in articlesFilter">
          <div class="rightContent"> -->
            <div class="title_bar">
              <p><img src="../../static/img/edit_reporter.png" alt="">
              {{item.type=='0'?'我的批示流程':(item.type=='1'?'数据与信息中心分发':(item.type=='2'?'发展规划处'+item.fkPeople+'反馈':''))}}
              <span class="time">
              {{item.type=='0'?'批示时间':(item.type=='1'?'分发时间':(item.type=='2'?'反馈时间':''))}}
              ：<span>{{item.date}}</span></span></p>
              <p class="grey_font" v-show="(item.type=='0'?true:false)">
                <span>批示文章：<span class="ellipsis titleEll">{{item.title}}</span> - <span class="dateSmall">{{item.art_date}}</span></span>
                <router-link :to="{ path: '/homePage/articleDetail', query: { id:item.articleId,edit:'0'}}">
                  <el-button type="primary" size="small" class="btn-pos">查看原文</el-button>
                </router-link>
              </p>
              <p class="blue_font">
                <span>
                {{item.type=='0'?'批示内容':(item.type=='1'?'分发内容':(item.type=='2'?'反馈内容':''))}}
                ：<span>{{item.content}}</span></span>
                <!-- <span class="includeBtn grey"><span>无附件</span></span> -->
                <a :href="'http://'+fwLink+'/api/article/downloadAttachment?attachmentId='+item.link" target="blank">
                <!-- <a @click="download(item.name)"> -->
                  <el-button type="text" :disabled="item.link?false:true" class="btn-pos btn-pos-1" size="small">{{item.link?'查看附件':'无附件'}}</el-button>
                </a>
              </p>
            </div>
          <!-- </div>
        </li>
      </ul> -->
      <!-- <div class="rightContent">
        <div class="title_bar">
          <p><img src="../../static/img/edit_reporter.png" alt="">我的批示流程<span class="time">批示时间：<span>2017-01-26 19:35</span></span></p>
          <p class="grey_font">
            <span>批示文章：<span>国家“双一流”实施方案正式出台，预计2017年上半年公布名单</span> - <span>2017/01/26</span></span>
            <router-link to="/articleDetail"><el-button type="primary" size="small" class="btn-pos">查看原文</el-button></router-link>
          </p>
          <p class="blue_font">
            <span>批示内容：<span>请发展规划处等抓紧时间研究国家双一流方案的细则，特别是教育部有关部门的解读。</span></span>
            <el-button type="text" :disabled="true" class="btn-pos btn-pos-1" size="small">无附件</el-button>
          </p>
        </div>
      </div>
      <div class="rightContent">
        <div class="title_bar">
          <p><img src="../../static/img/edit_reporter.png" alt="">数据与信息中心分发<span class="time">分发时间：<span>2017-01-26 19:35</span></span></p>
          <p class="blue_font">
            <span>分发内容：<span>已分发至发展规划处张三处长处理</span></span>
            <el-button type="text" :disabled="true" class="btn-pos btn-pos-1" size="small">无附件</el-button>
          </p>
        </div>
      </div>
      <div class="rightContent">
        <div class="title_bar">
          <p><img src="../../static/img/edit_reporter.png" alt="">发展规划处张三反馈<span class="time">反馈时间：<span>2017-01-26 19:35</span></span></p>
          <p class="blue_font">
            <span>反馈内容：<span>发展规划处联合教科院，对双一流政策进行了详细的多角度解读，内容见附件。</span></span>
            <a href=""><el-button type="text" size="small" class="btn-pos btn-pos-1">查看附件</el-button></a>
          </p>
        </div>
      </div> -->
    </div>
    <el-dropdown trigger="click" class="psBtn_new" @command="showSelect">
      <el-button :disabled="dropDownState">
        批示处理<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="psDown">
        <el-dropdown-item command="ff" style="display:none;">分发</el-dropdown-item>
        <el-dropdown-item command="fk" ref="feedback">{{feedback}}</el-dropdown-item>
        <el-dropdown-item command="gb" style="display:none;">关闭</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-button @click="showPSBox" icon="edit" class="psBtn_new">再次批示</el-button> -->
    <!-- <p class="psBtn" @click="showPSBox">再次批示</p> -->
    <!-- <div class="rightBottom dark_grey">
      <p>
      超过24个小时无新批示和反馈，流程已结束
      </p>
    </div> -->
    <div class="rightBottom">
      <p>
      {{bottomTips}}  
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'instructionsDetail',
  data () {
    return {
      instructionId:"",
      bottomTips:'',
      psObj:[],
      articleName:'',
      dropDownState:false,
      feedback:'',
      articlesFilter:[
      // {
      //     "type":'0',//批示模块
      //     "articleId":'001',
      //     "title":"国家双一流”实施方案正式出台，预计2017年上半年公布名单",
      //     "art_date":' 2017/01/26',
      //     "date":' 2017/01/26',
      //     "content":"请发展规划处等抓紧时间研究国家双一流方案的细则，特别是教育部有关部门的解读。",
      //     "link":'http://www.baidu.com',
      // },
      // {
      //     "type":'1',//分发模块
      //     "date":' 2017/01/26',
      //     "content":"请发展规划处等抓紧时间研究国家双一流方案的细则，特别是教育部有关部门的解读。",
      //     "link":'http://www.baidu.com',
      // },
      // {
      //     "type":'2',//反馈模块
      //     "fkPeople":'王五',
      //     "date":' 2017/01/26',
      //     "content":"请发展规划处等抓紧时间研究国家双一流方案的细则，特别是教育部有关部门的解读。",
      // }
      ],
      userSource:{},
      level:'',
      // fwLink:'',
      fwLink:'192.168.2.108:9000',
    }
  },
  methods:{
    showSelect:function(command){
      console.log("instructionId");
      console.log(this.instructionId);
      var that=this;
      if(command!='gb'){
        $(".mask1").addClass("showBtn");
        $(".psBox").addClass("showBtn");
        $(".printPs").removeClass("showBtn");
        $(".el-row").addClass("show_row");
        $(".psBox").addClass("alertStyle_");
        $(".psBox").find(".article_btn").attr("disabled",true).addClass("is-disabled");
      }
      console.log(command);
      if(command=="ff"){
        this.$store.dispatch('changeAlertBox',{"type":'1',"psObj":this.psObj,'title':this.articleName,'instructionId':this.instructionId}).then(function(resp){});
      }
      else if(command=="fk"){
        this.$store.dispatch('changeAlertBox',{"type":'2',"psObj":this.psObj,'title':this.articleName,'instructionId':this.instructionId}).then(function(resp){});
      }
      else if(command=="gb"){
        $.when(closeInstructions(this.instructionId)).done(function(data){
          if(data.state=='0'){
            alert("流程已关闭");
            that.$router.push('/homePage/managementCenter');
          }
          else{
            alert(data.data);
          }
        })
      }
    },
    download(name){
      $.when(downloadAnnex(name)).done(function(data){
        if(data.state=='0'){
        }
        else{
          alert(data.data);
        }
      })
    },
  },
  mounted() {
    // this.instructionId = this.$route.query.id;
    // console.log(this.instructionId);
  },
  created: function() {
    this.fwLink=window.location.host;//有用
    console.log(this.fwLink);
    this.instructionId = this.$route.query.id;
    console.log(this.instructionId);
    var that=this;
    $.when(getInstructionFlow(this.instructionId)).done(function(data){
      if(data.state=='0'){
        var res=data.data;
        if(res.isEnd=="0"){
          that.dropDownState=true;
          that.bottomTips='流程已结束'
        }
        else if(res.hasPassed){
          that.dropDownState=false;
          that.bottomTips='距离接收到领导批示'+res.hasPassed+'个小时，流程还未结束'
        }
        else{}
        that.articleName=res.results[0].title;
        that.articlesFilter=res.results;
        that.psObj=res.psPeople;
        // for (var i=0;i<res.results.length;i++) {
        //   if(res.results[i].type=='0'){
        //     var insertItem=$('<div class="rightContent">'+
        //               '<div class="title_bar">'+
        //                 '<p>'+
        //                 '<img src="../../static/img/edit_reporter.png" alt="">我的批示流程<span class="time">批示时间：<span>'+res.results[i].date+'</span></span></p>'+
        //                 '<p class="grey_font">'+
        //                 '<span>批示文章：<span>'+res.results[i].title+'</span> - <span>'+res.results[i].art_date+'</span></span>'+
        //                 '<router-link to="{ path: \"articleDetail\", query: {id:'+res.list[i].articleId+'}}">'+
        //                 '<el-button type="primary" size="small" class="btn-pos">查看原文</el-button>'+
        //                 '</router-link>'+
        //                 '</p>'+
        //                 '<p class="blue_font">'+
        //                   '<span>批示内容：<span>'+res.results[i].content+'</span></span>'+
        //                 '</p>'+
        //               '</div>'+
        //             '</div>');
        //     var linkItem;
        //     if(res.results[i].link){
        //       linkItem=$('<a href='+res.results[i].link+'><el-button type="text" size="small" class="btn-pos btn-pos-1">查看附件</el-button></a>');
        //     }
        //     else{
        //       linkItem=$('<el-button type="text" :disabled="true" class="btn-pos btn-pos-1" size="small">无附件</el-button>');
        //     }
        //     insertItem.find(".blue_font").append(linkItem);
        //   }
        //   else if(res.results[i].type=='1'){
            

        //   }
        //   else if(res.results[i].type=='2'){
            
        //   }
        // }
      }
      else{
        alert(data.data);
      }
    })
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.level=this.userSource?this.userSource.level:'';
    console.log(this.level);
    if(this.level==2){
      // console.log("222");
      // $(this.$refs.feedback).text("新批示");
      this.feedback="新批示";
    }
    else{
      this.feedback="反馈";
      // $(this.$refs.feedback).text("反馈");
    }
    if(this.userSource&&(this.userSource.level==0||this.userSource.level==4)){
      this.$nextTick(function(){
        $(".psDown").children("li").eq(0).addClass("showBtn");
        $(".psDown").children("li").eq(2).addClass("showBtn");
      })
    }
    else{
      this.$nextTick(function(){
        $(".psDown").children("li").eq(0).removeClass("showBtn");
        $(".psDown").children("li").eq(2).removeClass("showBtn");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/less/init.less';
  .test{
    margin-bottom:65px;
    >a{
      display: block;
      color: #000;
    }
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
      }
    }
  }
  .includeBtn{
    position: absolute;
    right:20px;
    top:16px;
    min-width:60px;
    padding:5px 10px;
    display:inline-block;
    border:1px solid #0099cc;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    text-align: center;
    font-size: 13px;
    color: #0099cc;
    cursor:pointer;
    z-index:1;
  }
  .btn-pos{
    position: absolute;
    right:20px;
    top:15px;
  }
  .btn-pos-1{
    top:17px;
  }
  .rightContent{
    position: relative;
    width:100%;
    margin-top:25px;
    border:1px solid #eee;
    background-color: #fff;
    border-radius:5px;
    .title_bar{
      font-size:16px;
      position: relative;
      p{
        padding:20px;
        border-bottom:1px solid #e4e4e4;
        position: relative;
      }
      p:first-child{
        font-size: 16px;
        color:#666;
        .time{
          position: absolute;
          right:20px;
          top:25px;
          font-size: 14px;
          color:#666;
        }
      }
      p:last-child{
        padding-right:120px;
        border-bottom:none;
      }
      .blue_font{
        font-size: 14px;
        color:#0099ff;
      }
      .grey_font{
        font-size: 14px;
        color:#5e5e5e;
      }
      img{
        display:inline-block;
        width: 21px;
        height: 21px;
        margin-right: 6px;
        vertical-align:middle;
      }
    }
  }
  .rightContent:after,.psBtn:after,.psBtn_new:after{
    content: '';
    width: 1px;
    border-left: 2px dashed #0099ff;
    height: 18px;
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translate(-50%, 0);

  }
  .rightBottom{
    cursor:default;
    // margin-top:15px;
    height:50px;
    text-align: center;
    color:#fff;
    background-color: #0099FF;
    line-height:50px;
    font-size:16px;
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
  .grey{
    border-color:#ccc!important;
    color:#ccc;
  }
  .blue{
    border-color:#3399ff!important;
    color:#3399ff;
  }
  .dark_grey{
    background-color: #bcbcbc;
  }
  .psBtn{
    position: relative;
    width:150px;
    height:35px;
    line-height: 35px;
    background-color: #fff;
    border:2px solid #3399ff;
    color:#3399ff;
    text-align: center;
    font-size: 14px;
    margin:auto;
    margin-top:25px;
    margin-bottom:25px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .psBtn_new{
    position: relative;
    margin:auto;
    text-align: center;
    color:#0099ff;
    // display:block;
    left: 50%;
    transform: translate(-50%,0);
    margin:25px auto;
    button{
      color:#0099ff!important;
    }
  }
  .el-button--primary{
    background: #52baff;
    border-color: #52baff;
  }
  .el-button--primary:focus, .el-button--primary:hover{
    background: #66c8ff;
    border-color: #66c8ff;
  }
  .article_btn{
    color:#0099ff!important;
  }
  .el-dropdown-menu__item{
    text-align: center;
    color:#666;
  }
  .titleEll{
    display: inline-block;
    width: 65%;
    vertical-align: middle;
  }
  .dateSmall{
    font-size: 13px;
  }
  .instructionsDetail{
    .btn_position{
      position:absolute;
      right:20px;
      top:12px;
    }
  }
</style>
