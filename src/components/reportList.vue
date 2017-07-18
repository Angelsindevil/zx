<template>
  <!-- 最后 alert（data.data）要记得加上 -->
  <div class="report">
    <div class="rightBar">
      <p>报告中心-报告列表：
        <span>共计生成<span>{{totalNum}}</span>篇报告</span>
      </p>
      <el-button class="btn_position btnUpload">
        <input type="file" name="" class="file_" @change="linkChange">上传报告
      </el-button>
      <el-input
        placeholder="搜索已生成的报告"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>
    <div class="reporterContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="系统报告" name="first" class="tab1">
          <div class="rightContent" v-for="(item,index) in listFilter_1">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span class="title_new"><span class="ellipsis titleEll">{{item.title}}</span><span class="date_new">生成日期：<span>{{item.createTime}}</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_(item.id)" :data-id='item.id'>
              <a :href="'http://'+fwLink+'/api/article/downloadAttachment?attachmentId='+item.bulletinUrl" target="blank" class="downloadBtn">
              <!-- <a :href="item.bulletinUrl" class="downloadBtn" target="blank"> -->
                <!-- <span class="includeBtn"> -->
                  <img src="../../static/img/download.png" alt="">
                  <!-- <span>下载报告</span> -->
                <!-- </span> -->
              </a>
            </div>
          </div>
          <!-- <div class="rightContent">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span><span>高等教育信息动态-20161208-V02</span>&nbsp;&nbsp;&nbsp;<span>生成日期：<span>2016/12/08 16：45</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_">
              <span class="includeBtn"><img src="../../static/img/download.png" alt=""><span>下载报告</span></span>
            </div>
          </div>
          <div class="rightContent">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span><span>高等教育信息动态-20161208-V03</span>&nbsp;&nbsp;&nbsp;<span>生成日期：<span>2016/12/08 16：45</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_">
              <span class="includeBtn"><img src="../../static/img/download.png" alt=""><span>下载报告</span></span>
            </div>
          </div>   -->
          <!-- <div class="rightBottom" ref="rightBottom1" @click="loadMore">
            <p>
            点击加载更多历史报告
            </p>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="手工报告" name="second" class="tab2">
          <div class="rightContent" v-for="(item,index) in listFilter_2">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span class="title_new"><span class="ellipsis titleEll">{{item.title}}</span><span class="date_new">生成日期：<span>{{item.createTime}}</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_(item.id)" :data-id='item.id'>
              <a :href="'http://'+fwLink+'/api/article/downloadAttachment?attachmentId='+item.bulletinUrl" target="blank" class="downloadBtn">
              <!-- <a :href="item.bulletinUrl" class="downloadBtn" target="blank"> -->
                <!-- <span class="includeBtn"> -->
                  <img src="../../static/img/download.png" alt="">
                  <!-- <span>下载报告</span> -->
                <!-- </span> -->
              </a>
            </div>
          </div>
          <!-- <div class="rightContent">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span><span>高等教育信息动态-20161208-V04</span>&nbsp;&nbsp;&nbsp;<span>生成日期：<span>2016/12/08 16：45</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_">
              <span class="includeBtn"><img src="../../static/img/download.png" alt=""><span>下载报告</span></span>
            </div>
          </div>
          <div class="rightContent">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span><span>高等教育信息动态-20161208-V05</span>&nbsp;&nbsp;&nbsp;<span>生成日期：<span>2016/12/08 16：45</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_">
              <span class="includeBtn"><img src="../../static/img/download.png" alt=""><span>下载报告</span></span>
            </div>
          </div>
          <div class="rightContent">
            <div class="title_bar">
              <img src="../../static/img/multi-report.png" alt="">
              <span><span>高等教育信息动态-20161208-V06</span>&nbsp;&nbsp;&nbsp;<span>生成日期：<span>2016/12/08 16：45</span></span></span>
              <img src="../../static/img/delete.png" alt="" class="delete" @click="delete_">
              <span class="includeBtn"><img src="../../static/img/download.png" alt=""><span>下载报告</span></span>
            </div>
          </div>   -->
          <!-- <div class="rightBottom" ref="rightBottom2" @click="loadMore">
            <p>
            点击加载更多内容
            </p>
          </div> -->
        </el-tab-pane>
      </el-tabs>
      <div class="rightBottom" ref="rightBottom" @click="loadMore">
        <p>
        点击加载更多内容
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {scrollFun,matchMenu} from '../../static/js/public.js'
export default {
  name: 'report',
  data () {
    return {
      input2:'',
      activeName: 'first',
      // type:'系统报告',
      type:'0',
      totalNum:'',
      todayNum:'',
      listFilter:[],
      listFilter_1:[
        // {
        //   'id':'001',
        //   'link':'http://www.baidu.com',
        //   'title':'高等教育信息动态-20161208-V01',
        //   'date':'2016/12/08 16：45',
        // },
        // {
        //   'id':'002',
        //   'link':'http://www.baidu.com',
        //   'title':'高等教育信息动态-20161208-V02',
        //   'date':'2016/12/08 16：45',
        // },
      ],
      listFilter_2:[
        // {
        //   'id':'003',
        //   'link':'http://www.baidu.com',
        //   'title':'高等教育信息动态-20161208-V03',
        //   'date':'2016/12/08 16：45',
        // },
        // {
        //   'id':'004',
        //   'link':'http://www.baidu.com',
        //   'title':'高等教育信息动态-20161208-V04',
        //   'date':'2016/12/08 16：45',
        // },
      ],
      pageCount_1:1,
      pageCount_2:1,
      fileFlag:'',
      file:'',
      linkName:'',
      userSource:{},
      userid:'',
      username:'',
      level:'',
      // fwLink:'',
      fwLink:'192.168.2.108:9000',
    }
  },
  methods:{
    delete_:function(id){
      // $(e.target).closest(".rightContent").remove();
      if(confirm("你确认删除该报告？")){
        $.when(deleteReporter(id)).done(function(data){
          if(data.state=="0"){
            alert("删除成功！");
            window.location.reload();
          }
          else{
            alert(data.data);
          }
        })
      }
    },
    handleClick(tab, event) {
      var that=this;
      var pageNo=1;
      // if(that.type=='手工报告'){
      if(tab.label=='手工报告'){
        that.type='1';
        that.pageCount_2=1;
      }
      else{
        that.type='0';
        that.pageCount_1=1;
      }
      // if(that.type=='1'){
      //   that.pageCount_2=1;
      // }
      // else{
      //   that.pageCount_1=1;
      // }
      // that.type=tab.label;
      // this.listFilter=[];
      $.when(getReporter(this.userid,that.type,pageNo)).done(function(data){
        if(data.state=="0"){
          // var res=data.data;
          // that.totalNum=res.totalNum;
          // // that.listFilter=res.list;
          // if(tab.label=="手工报告"){
          //   that.listFilter_2=res.list;
          //   // that.type="手工报告";
          // }
          // else if(tab.label=='系统报告'){
          //   that.listFilter_1=res.list;
          //   // that.type="系统报告";
          // }
          // else{}
          that.insertData(data,that.type);
        }
        else{
          alert(data.data);
        }
      })
    },
    handleInputClick:function(){
      var that=this;
      // if(that.type=='手工报告'){
      if(that.type=='1'){
        that.pageCount_2=1;
        that.listFilter_2=[];
      }
      else{
        that.pageCount_1=1;
        that.listFilter_1=[];
      }
      var pageNo=1;
      $.when(searchReporter(that.userid,that.input2,that.type,pageNo)).done(function(data){
        if(data.state=="0"){
          // var res=data.data;
          // that.totalNum=res.totalNum;
          // if(that.type=='0'){
          //   that.listFilter_1=res.list;
          // }
          // else{
          //   that.listFilter_2=res.list;
          // }
          that.insertData(data,that.type);
        }
        else{
          alert(data.data);
        }
      })
    },
    linkChange:function(e){
      var file = e.target.files; //获取图片资源
      var formData = new FormData();
      if(file[0]){
        this.file=file[0];
        this.linkName=file[0].name;
        formData.append("file",this.file);
        formData.append("title",this.linkName);
        formData.append("userId",this.userid);
        if(confirm("你确认要上传报告  "+this.linkName)){
          $.when(uploadReporter(formData)).done(function(data){
            if(data.state=="0"){
              alert("报告上传成功！");
              window.location.reload();
            }
            else{
              alert(data.data);
            }
          })
        }
      }
    },
    loadMore(){
      var that=this;
      var height;
      // if(that.type=='0'){
        this.$nextTick(function(){
          if(that.type=='0'){
            height=$(".tab1 .rightContent").last().offset().top;
          }
          else{
            height=$(".tab2 .rightContent").last().offset().top;
          }
        })
      // }
      // else{

      // }
      if(this.activeName=='first'){
        this.pageCount_1++;
        $.when(searchReporter(that.userid,that.input2,that.type,that.pageCount_1)).done(function(data){
          if(data.state=="0"){
            // var res=data.data;
            // that.totalNum=res.totalNum;
            // that.listFilter_1=res.list;
            that.insertData(data,that.type);
            that.$nextTick(function(){
              $(document).scrollTop(height);
            })
          }
          else{
            alert(data.data);
          }
        })
      }
      else if(this.activeName=='second'){
        this.pageCount_2++;
        $.when(searchReporter(that.userid,that.input2,that.type,that.pageCount_2)).done(function(data){
          if(data.state=="0"){
            // var res=data.data;
            // that.totalNum=res.totalNum;
            // that.listFilter_2=res.list;
            that.insertData(data,that.type);
            that.$nextTick(function(){
              $(document).scrollTop(height-350);
            })
          }
          else{
            alert(data.data);
          }
        })
      }
      else{}
    },
    insertData(data,type){
      var that=this;
      var res=data.data;
      that.totalNum=res.totalNum;
      if(res.list&&res.list.length!=0){
        if(res.list.length<10){
          $(that.$refs.rightBottom).children('p').text('暂无更多历史报告');
          if((that.pageCount_1==1)&&(type=='0')){
            that.listFilter_1=[];
          }
          else{}
          if((that.pageCount_2==1)&&(type=='1')){
            that.listFilter_2=[];
          }
          else{}
            // if(type=='0'){
            //   // $(that.$refs.rightBottom).children('p').text('暂无更多历史报告');
            //   that.listFilter_1=[];
            // }
            // else{
            //   // $(that.$refs.rightBottom).children('p').text('暂无更多历史报告');
            //   that.listFilter_2=[]
            // }
          // }
          // else{}
        }
        else{
          $(that.$refs.rightBottom).children('p').text('点击加载更多历史报告');
        }
        res.list.map(function(value,index){
          if(type=='0'){
            that.listFilter_1.push(value);
          }
          else{
            that.listFilter_2.push(value);
          }
        })
      }
      else{
        if(that.pageNo==1){//只一页
          $(that.$refs.rightBottom).children('p').text('暂无历史报告');
          if((that.pageCount_1==1)&&(type=='0')){
            that.listFilter_1=[];
          }
          else{}
          if((that.pageCount_2==1)&&(type=='1')){
            that.listFilter_2=[];
          }
          else{}
          // if(type=='0'){
          //   that.listFilter_1=[]
          // }
          // else{
          //   that.listFilter_2=[]
          // }
        }
        else{//多余一页
          $(that.$refs.rightBottom).children('p').text('暂无更多历史报告');
        }
      }
    },
  },
  created(){
    // var that=this;
    this.fwLink=window.location.host;//有用
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.username=this.userSource?this.userSource.username:'';
    this.level=this.userSource?this.userSource.level:'';
    this.userid=this.userSource?this.userSource.id:'';
    this.$nextTick(function(){
      matchMenu();
    })
    if(this.level=='0'||this.level=='2'||this.level=='3'){
      this.$nextTick(function(){
        $(".el-tabs__header").hide();
        // $(".el-tabs__header").find(".el-tabs__item").eq(0).hide();
        // $(".el-tabs__header").find(".el-tabs__item").eq(1).addClass("is-active");
        // $(".el-tabs__header").find(".el-tabs__item").css("border-bottom","3px solid #20a0ff");
        $(".el-tabs__content").find(".tab1").hide();
        $(".el-tabs__content").find(".tab2").show();
        $(".btnUpload").hide();
        $(".delete").hide();
      })
    }
    else{}
  },
  mounted(){
    var that=this;
    $.when(getReporter(that.userid,that.type,that.pageCount_1)).done(function(data){
      if(data.state=="0"){
        // var res=data.data;
        // that.totalNum=res.totalNum;
        // that.listFilter_1=res.list;
        that.insertData(data,that.type);
      }
      else{
        alert(data.data);
      }
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/less/init.less';
  .report{
    margin-bottom:65px;
    >a{
      display: block;
      color: #000;
    }
    .file_{
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 110px;
      height: 32px;
      cursor:pointer;
    }
    .btn_position{
      font-size: 13px;
      padding:10px 15px;
      position: absolute;
      right:265px;
      top:13px;
      color:#09f;
    }
    .rightContent{
      border:none;
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
        // font-size:18px;
        font-size: 16px;
        color:#fff;
        span{
          vertical-align: middle;
          color:#E4E4E4;
          // font-size: 18px;
          font-size: 16px;
        }
      }
    }
    .rightContent{
      width:100%;
      margin-top:10px;
      // border:1px solid #ccc;
      background-color: #fff;
      // border-radius:8px;
      .title_bar{
        font-size:16px;
        padding:20px;
        position: relative;
        border: 1px solid #e4e4e4;
        border-radius:5px;
        // border-bottom:1px solid #eee;
        img{
          display:inline-block;
          width: 30px;
          height: 30px;
          margin-right: 6px;
          vertical-align:middle;
        }
        span{
          vertical-align:middle;
        }
        span:first-child{
          // font-size:16px;
          font-size: 15px;
          color:#333;
        }
        span:last-child{
          font-size:14px;
          color:#999;
          span{
            font-size:14px;
              color:#999;
          }
        }
        .titleEll{
          display: inline-block;
          max-width: 50%;
          vertical-align: middle;
        }
        .delete{
          position: absolute;
          right:65px;
          top:20px;
          cursor:pointer;
        }
        .title_new{
          color:#333;
          font-size: 15px;
          .date_new{
            position: absolute;
            right: 120px;
            top: 25px;
            color:#666;
            span{
              color:#999;
              font-size: 13px;
            }
          }
        }
        .includeBtn{
          position: absolute;
          right:20px;
          top:20px;
          width:110px;
          height:30px;
          display:inline-block;
          border:1px solid #0099cc;
          text-align: center;
          line-height: 30px;
          font-size: 16px;
          // color: #0099cc!important;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          img{
             display:inline-block;
              margin-right: 10px;
              width: 25px;
              height: 25px;
          }
          span{
            color: #0099cc!important;
            vertical-align:inherit;
          }
        }
      }
    }
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
      border-color:#C3C7D0;
      color:#C3C7D0;
    }
    .red{
      border-color:#FF6666;
      color:#FF6666;
    }
    .rightBar .input_position{
      width: 230px;
      position: absolute;
      right: 10px;
      top: 12px;
      font-size: 13px;
      input{
        background-color: #fafafa!important;
      }
    }
    .downloadBtn{
      display: inline-block;
      position: absolute;
      right: 20px;
    }
  }
</style>
