<template>
  <!-- 批示管理中心 -->
  <div class="test">
    <div class="rightBar">
      <p>平台管理-批示管理
        <span>共计<span>{{totalNum}}</span>份批示，今日收到批示和反馈<span>{{todayNum}}</span>份</span>
      </p>
      <!-- <div class="admin_ui_input">
        <input type="" name="" placeholder="搜索批示和反馈的内容">
      </div> -->
      <el-input
        placeholder="搜索批示和反馈的内容"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>
    <div class="rightContent">
      <div class="title_bar">
        <p>
          <span><img src="../../static/img/edit_reporter.png" alt="">{{topTips}}</span>
          <el-button type="success" class="button_style addPsBtn" @click="showPSBox">发起新流程</el-button>
          <!-- <span class="includeBtn_ green">发起新流程</span> -->
          <el-select v-model="value" placeholder="" @change="optionChangeHandler">
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
        </p>
      </div>
      <!-- <div class="title_content" v-for="(item,index) in articlesAarry"> -->
      <div class="title_content">
        <ul>
          <li v-for="(item,index) in articlesAarry">
            <span class="ellipsis" style="display:block;padding-right:250px">批示内容：<span>{{item.title}}</span>  - <span>{{item.date}}</span></span>
            <span class="includeBtn_" :class="(item.rowState!=0)?'orange':'grey'"><span>{{item.btn_con}}</span></span>
            <!-- <router-link to="/instructionsDetail"><span class="includeBtn"><span>查看</span><img src="../../static/img/arrow_blue.png" alt=""></span></router-link> -->
            <!-- <el-tag type="primary" class="label_style">有新反馈</el-tag> -->
            <router-link :to="{ path: '/homePage/instructionsDetail', query: { id: item.instructionsId}}" :data-id="item.instructionsId"><el-button type="primary" class="button_style">{{(item.rowState!=0)?"批示处理":"查看详情"}}</el-button></router-link>
          </li>    
        </ul>
      </div>
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
       options: [{
          value: '5',
          label: '全部内容'
        }, {
          value: '0',
          label: '流程已结束'
        }, {
          value: '1',
          label: '新反馈'
        }, {
          value: '2',
          label: '新批示'
        },
        {
          value: '3',
          label: '新分发'
        }
        ],
        userId:'d733ed4b5afd11e79ea400269e28ab11',
        value: '5',
        input2: '',
        articles:[
        // {title:'国家“双一流”实施方案正式出台，预计2017年上半年公布名单',date:"2016/12/10",rowState:'0',btn_con:'流程已结束',instructionsId:'01'},
        // {title:'国家“111计划”基地5年评估一次，运行良好可滚动支持',date:"2016/12/10",rowState:'1',btn_con:'新反馈',instructionsId:'02'},
        // {title:'江苏省公布十三五期间重点学科名单，21所高校313个学科入选',date:"2016/12/10",rowState:'2',btn_con:'新批示',instructionsId:'03'},
        // {title:'江苏省公布十三五期间重点学科名单，21所高校313个学科入选',date:"2016/12/10",rowState:'3',btn_con:'新分发',instructionsId:'04'},
        // {title:'测试文章1',date:"2016/12/10",rowState:'0',btn_con:'流程已结束',instructionsId:'05'},
        // {title:'测试文章2',date:"2016/12/10",rowState:'0',btn_con:'流程已结束',instructionsId:'06'},
        // {title:'测试文章3',date:"2016/12/10",rowState:'0',btn_con:'流程已结束',instructionsId:'07'},
        ],
        articlesAarry:[],
        totalNum:'',
        todayNum:'',
        pageNo:1,
        userSource:{},
        userid:'',
        level:'',
        topTips:'',
    }
  },
  methods:{
    showPSBox:function(){
      $(".mask1").addClass("showBtn");
      $(".psBox").addClass("showBtn");
      $(".psBox").find(".article_btn").attr("disabled",false).removeClass("is-disabled");
      this.$store.dispatch('changeAlertBox',{"type":'0'}).then(function(resp){});
      this.$store.dispatch('changePsShow',{psShow:{}}).then(function(resp){});
    },
    handleInputClick() {
      var that=this;
      that.pageNo=1;
      this.articlesAarry=[];
      $.when(searchInstructionList(that.userid,that.input2,that.value,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.insertData(data);
        }
        else{
          alert(data.data);
        }
      })
    },
    optionChangeHandler(val){
        var that=this;
        this.pageNo=1,
        this.articlesAarry=[];
        $.when(searchInstructionList(that.userid,that.input2,val,that.pageNo)).done(function(data){
          if(data.state=="0"){
            that.insertData(data);
          }
          else{
            alert(data.data);
          }
        })
        // if(val=='2'){
        //   this.articlesAarry=this.articles.filter(this.filterCallback_1);
        // }
        // else if(val=='1'){
        //   this.articlesAarry=this.articles
        // }
        // else if(val=='3'){
        //   this.articlesAarry=this.articles.filter(this.filterCallback_2);
        // }
        // else if(val=='4'){
        //   this.articlesAarry=this.articles.filter(this.filterCallback_3); 
        // }
        // else if(val=='5'){
        //   this.articlesAarry=this.articles.filter(this.filterCallback_5); 
        // }

    },
    // filterCallback_1(item,index,array){
    //   if(item.rowState=='0'){
    //     return true;
    //   }
    // },
    // filterCallback_2(item,index,array){
    //   if(item.rowState=='1'){
    //     return true;
    //   }
    // },
    // filterCallback_3(item,index,array){
    //   if(item.rowState=='2'){
    //     return true;
    //   }
    // },
    // filterCallback_4(item,index,array){//搜索过滤
    //   if(item.title.indexOf(this.input2)!=-1){
    //     return true;
    //   }
    // },
    // filterCallback_5(item,index,array){//搜索过滤
    //   if(item.rowState=='3'){
    //     return true;
    //   }
    // }
    insertData(data){
      var that=this;
      var res=data.data;
      var len=that.articlesAarry.length;
      that.totalNum=res.totalNum;
      that.todayNum=res.todayNum;
      if(res.results&&res.results.length!=0){
        if(res.results.length<10){
          $(that.$refs.rightBottom).children('p').text('暂无更多批示');
          if(that.pageNo==1){
            that.articlesAarry=[];
          }
          else{}
        }
        else{
          $(that.$refs.rightBottom).children('p').text('点击加载更多批示');
        }
        // $(that.$refs.rightBottom).children('p').text('点击加载更多批示');
        if(res.results.length>0){
          // that.articles=res.results.map(function(value,index){
          //   var btn_con;
          //   if(value.rowState=='0'){
          //     btn_con="流程已结束";
          //   }
          //   else if(value.rowState=='1'){
          //     btn_con="新反馈"
          //   }
          //   else if(value.rowState=='2'){
          //     btn_con="新批示"
          //   }
          //   else if(value.rowState=='3'){
          //     btn_con="新分发"
          //   }
          //   else{}
          //   return {
          //     "title":value.title,
          //     "date":value.date,
          //     "rowState":value.rowState,
          //     "btn_con":btn_con,
          //     "instructionsId":value.instructionsId,
          //   }
          // })
          // that.articlesAarry=that.articles;
          res.results.map(function(value,index){
            var btn_con;
            if(value.rowState=='0'){
              btn_con="流程已结束";
            }
            else if(value.rowState=='1'){
              btn_con="新反馈"
            }
            else if(value.rowState=='2'){
              btn_con="新批示"
            }
            else if(value.rowState=='3'){
              btn_con="新分发"
            }
            else{}
            var item={
              "title":value.title,
              "date":value.date,
              "rowState":value.rowState,
              "btn_con":btn_con,
              "instructionsId":value.instructionsId,
            }
            that.articlesAarry.push(item);
          })
        }
      }
      else{   
        if(that.pageNo==1){//只一页
          $(that.$refs.rightBottom).children('p').text('暂无批示');
          that.articlesAarry=[];
        }
        else{//多余一页
          $(that.$refs.rightBottom).children('p').text('暂无更多批示');
        }
      }
    },
    loadMore(){
      this.pageNo=this.pageNo+1;
      var that=this;
      var height;
      this.$nextTick(function(){
        height=$(".rightContent ul").find('li').last().offset().top;
      })
      // if(this.input2==""){
      //   $.when(getInstructionsList(that.userid,that.pageNo)).done(function(data){
      //     if(data.state=="0"){
      //       that.insertData(data.data);
      //     }
      //     else{
      //       alert(data.data);
      //     }
      //   })
      // }
      // else{
        $.when(searchInstructionList(that.userid,that.input2,that.value,that.pageNo)).done(function(data){
          if(data.state=="0"){
            that.insertData(data);
            that.$nextTick(function(){
              $(document).scrollTop(height-350);
            })
          }
          else{
            alert(data.data);
          }
        })
      // }
    },
  },
  created(){
    // this.articlesAarry=this.articles;
    var that=this;
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.userid=this.userSource?this.userSource.id:'';
    this.level=this.userSource?this.userSource.level:'';
    if(this.level==0||this.level==4){
      this.$nextTick(function(){
        $(".addPsBtn").show();
      });
    }
    else{
      this.$nextTick(function(){
        $(".addPsBtn").hide();
      });
    }
    if(this.level==0||this.level==4){
      this.topTips="批示管理";
    }
    else{
      this.topTips="批示内容"
    }
    this.$nextTick(function(){
      matchMenu();
    });
    $.when(getInstructionsList(that.userid,that.pageNo)).done(function(data){
      if(data.state=='0'){
        // var res=data.data
        that.insertData(data);;
        // that.totalNum=res.totalNum;
        // that.todayNum=res.todayNum;
        // that.articles=res.results.map(function(value,index){
        //   var btn_con;
        //   if(value.rowState=='0'){
        //     btn_con="流程已结束";
        //   }
        //   else if(value.rowState=='1'){
        //     btn_con="新反馈"
        //   }
        //   else if(value.rowState=='2'){
        //     btn_con="新批示"
        //   }
        //   else if(value.rowState=='3'){
        //     btn_con="新分发"
        //   }
        //   else{}
        //   return {
        //     "title":value.title,
        //     "date":value.date,
        //     "rowState":value.rowState,
        //     "btn_con":btn_con,
        //     "instructionsId":value.instructionsId,
        //   }
        // })
        // that.articlesAarry=that.articles;
      }
      else{
        alert(data.data);
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/less/init.less';
  @import '../../static/less/instructions.less';
</style>
