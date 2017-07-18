<template>
  <div id="app">
    <div class="topBar">
      <div class="topContent">
        <p><span>H</span><span>I</span><span>N</span>高教信息平台<span>pro</span></p>
        <p>
          <input type="text" placeholder="输入关键词，搜索你想要的">
          <a href="">
            <img src="../static/img/search.png">
          </a>
          <!-- <el-input placeholder="输入关键词，搜索你想要的" v-model="input5">
            <el-button slot="append" icon="search"></el-button>
          </el-input> -->
        </p>
        <p>
          <router-link to="/messageBox"><img src="../static/img/message.png" alt=""></router-link>
          <img src="../static/img/user.png" alt="">
          <span>3</span>
        </p>
      </div>
    </div>
    <div class="bottomBar">
      <div class="bottomContent">
        <p>
          <span>©&nbsp;2016&nbsp;青塔</span>
          <span>平台说明</span>
          <span>联系我们</span>
          <span>关于青塔</span>
        </p>
        <p>
          <span>浙ICP备15004817号-2</span>
          <span>浙公网安备33010502000513号</span>
        </p>
      </div>
    </div>
    <hello></hello>
    <!-- <div class="mask mask1" @click="showBox"></div> -->
    <div class="mask mask1"></div>
    <div class="mask mask2"></div>

    <div class="alertBox alertStyle">
        <div class="alertTop">报告顺序确认<span @click="hideBox"><img src="../static/img/cancel.png"></span></div>
        <div class="alertContent">
          <draggable :list="list" class="dragArea" @start="dragging=true" @end="dragging=false">
            <div v-for="(element,index) in list"  class="dragItem">
              <div class="title_bar">
                <img src="../static/img/report.png" alt="">
                <span>{{element.title}}<span>{{element.time}}</span></span> 
                <img src="../static/img/cancel_1.png" alt="" class="removeItem" @click="removeItem(index)">  
              </div>      
            </div>
          </draggable>
        </div>
        <div class="alertBottom">
          <span class="bg_blue"><img src="../static/img/word.png" alt="">生成WORD</span> 
          <span class="bg_red"><img src="../static/img/pdf.png" alt="">生成PDF</span> 
          <span @click="hideBox" class="bg_cancle">取消</span> 
        </div>
    </div>
    <div class="psBox alertStyle">
      <div class="alertTop">信息批示<span @click="hidePSBox"><img src="../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-button class="article_btn" @click="showAllArticle();showCommonBox()"><img src="../static/img/report.png" alt="">批示文章：<span>{{currentRow}}</span></el-button>
        <div class="editContainer">
          <p>输入批示内容</p>
          <div class="editBox">
            <textarea id="tinymce"></textarea>
            <input type="file" name="" class="file_" id="my_form" style="display:none;">
          </div>
        </div>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6"><div class="grid-content bg-purple">
            <span class="typeLabel">类型：</span>
            <el-select v-model="value" placeholder="请选择" class="typeChoose">
              <el-option
                v-for="item in type"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light" @click="psPeople();showCommonBox()">
            <span class="typeLabel">批示人：</span>
            <el-input
              placeholder="请选择"
              icon="menu"
              v-model="input2"
              class="typeChoose_"
              >
            </el-input>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple" @click="solvePeople();showCommonBox()">
            <span class="typeLabel">处理人：</span>
            <el-input
              placeholder="请选择"
              icon="menu"
              v-model="input3"
              class="typeChoose_">
            </el-input>
          </div></el-col>
        </el-row>
      </div>
      <div class="alertBottom">
          <div>
            <span><img src="../static/img/link.png" alt="">上传附件</span>
            <span><span>附件：</span>双一流政策研究报告</span>
          </div>
          <div>
            <span class="bg_green" @click="hidePSBox">确定</span> 
            <span class="bg_blue printPs"><img src="../static/img/print.png" alt="">打印批示</span> 
            <span @click="hidePSBox" class="bg_cancle">取消</span> 
          </div>
        </div>
    </div>
    <div class="articleBox alertStyle">
      <div class="alertTop">{{titleName}}<span @click="hideArtBox"><img src="../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          :placeholder="phtext"
          :trigger-on-focus="false"
          @select="handleSelect"
        ><el-button slot="append" icon="search"></el-button></el-autocomplete>
        <el-table
          class="article_table"
          :data="commonData"
          highlight-current-row
          @current-change="handleTableCurrentChange"
          style="width: 100%">
          <!-- <component :is="currentView"></component> -->
          <!-- <el-table-column
            type="selection"
            width="20%"
            v-if="isSelect">
          </el-table-column> -->
          <el-table-column
            label="选择"
            width="20%"
            >
            <template scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.i"></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            :label="labeltext"
            width="80%">
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="11"
            :page-size="6">
          </el-pagination>
        </div> -->
      </div>
      <div class="alertBottom">
        <span class="bg_green" @click="hideArtBox">确定</span> 
        <span @click="hideArtBox" class="bg_cancle">取消</span>    
      </div>
    </div>
    <div class=" multiBox alertStyle" style="z-index:5">
      <div class="alertTop">{{titleName}}<span @click="hideMultiBox"><img src="../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          :placeholder="phtext"
          :trigger-on-focus="false"
          @select="handleSelect"
        ><el-button slot="append" icon="search"></el-button></el-autocomplete>
        <el-table
          class="article_table"
          :data="commonData"
          highlight-current-row
          @current-change="handleTableCurrentChange"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="20%"
            >
          </el-table-column>
          <el-table-column
            prop="value"
            :label="labeltext"
            width="80%">
          </el-table-column>
        </el-table>
      </div>
      <div class="alertBottom">
        <span class="bg_green" @click="hideMultiBox">确定</span> 
        <span @click="hideMultiBox" class="bg_cancle">取消</span>    
      </div>
    </div>
    <div class="mesBox alertStyle">
      <div class="alertTop">新增消息<span @click="hideMesBox"><img src="../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="85px">
          <el-form-item label="消息标题：">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="消息内容：">
            <el-input type="textarea" v-model="form.area"></el-input>
          </el-form-item>
          <el-form-item label="接收人：">
            <el-input
              placeholder="请选择"
              icon="menu"
              v-model="form.accept"
              @click="solvePeople();showCommonBox()"
              @focus="solvePeople();showCommonBox()"
              >
            </el-input>
          </el-form-item>
          <el-form-item label="发送人：">
            <el-input v-model="form.send"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="alertBottom">
        <span class="bg_green" @click="hideMesBox">确定</span> 
        <span @click="hideMesBox" class="bg_cancle">取消</span> 
      </div>
    </div>
    <div class="userBox alertStyle" style="height:300px;">
      <div class="alertTop">新增消息<span @click="hideUserBox"><img src="../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="85px">
          <el-row :gutter="20">
            <el-col :span="6">
               <el-form-item label="所属组织：">
                <el-input
                  placeholder="请选择"
                  icon="menu"
                  v-model="form.accept"
                  @click="solvePeople();showCommonBox()"
                  @focus="solvePeople();showCommonBox()"
                  >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户账号：">
                <el-input v-model="form.send"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="用户姓名：">
                <el-input v-model="form.send"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色权限：">
                <!-- <el-input
                  placeholder="请选择"
                  icon="menu"
                  v-model="form.accept"
                  @click="solvePeople();showCommonBox()"
                  @focus="solvePeople();showCommonBox()"
                  >
                </el-input> -->
                <el-select v-model="value2" placeholder="" @change="optionChangeHandler">
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="状态：">
                <span>正常</span> 
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 这应该是编辑的时候才有的字段 -->
        </el-form>
      </div>
      <div class="alertBottom">
        <span class="bg_green" @click="hideUserBox">确定</span> 
        <span @click="hideUserBox" class="bg_cancle">取消</span> 
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// var AComponent = Vue.extend({
//   template: '<el-table-column type="selection" width="20%"></el-table-column>'
// })

// var BComponent = Vue.extend({
//   props:['radio'],
//   data: function () {
//     return {
//       radio1:this.radio
//     }
//   },
//   watch: {
//       radio(val) {
//         console.log(val);
//         this.radio1 = val;//新增radio的watch，监听变更并同步到radio1上
//       },
//       radio1(val){
//         // console.log("radio1");
//         console.log(val)
//         this.$emit("data-change",val);//③组件内对radio1变更后向外部发送事件通知
//       }
//   },
//   template: '<el-table-column label="选择" width="20%">'+
//               '<template scope="scope">'+
//                 '<el-radio class="radio" v-model="radio1" :label="scope.row.i"></el-radio>'+ 
//               '</template>'+
//           '</el-table-column>',
// })
import Hello from './components/Hello.vue'
import reportBox from './components/reportBox.vue'
export default {
  name: 'app',
  components: {
    Hello,reportBox},
  data () {
    return {
      options: [{
        value: '0',
        label: '系统管理员'
      }, {
        value: '1',
        label: '内容管理员'
      }, {
        value: '3',
        label: '批示用户'
      }, {
        value: '4',
        label: '普通用户'
      }],
      value2: '1',
      form: {
        title: '',
        area: '',
        accept: '',
        send: '',
      },
      // currentView:BComponent,
      type:[
      {value:'0',
      label:'批示'},
      {value:'1',
      label:'批示1'},
      {value:'2',
      label:'批示2'},
      ],
      value:'',
      isActive:false,
      list:[{title:"2014年度国家科学技术奖正式公布，128所高校获奖 -",time:'2016/12/10'}, 
          {title:"2015年度国家科学技术奖正式公布，128所高校获奖 -",time:'2016/12/11'},
          {title:"2016年度国家科学技术奖正式公布，128所高校获奖 -",time:'2016/12/12'},
           ],
      input5: '',
      input2:'',
      input3:'',
      radio: 0,
      radio1:0,
      radio2:0,
      state2:'',
      isSelect:false,
      titleName:'文章选择',
      phtext:'请输入文章标题',
      labeltext:'文章标题',
      // restaurants: [],
      commonData:[],
      alltableData: [
        {
          value: '国家“111计划”基地5年评估一次，运行良好可滚动支持',
          i:0
        }, {
          value: '江苏省公布十三五期间重点学科名单，21所高校313个学科入选',
          i:1
        }, {
          value: '山东大学实施学科高峰计划，未来五年50亿元投入学科建设',
          i:2
        }, {
          value: '国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单',
          i:3
        },
        {
          value: '测试文章1',
          i:4
        },
        {
          value: '测试文章2',
          i:5
        },
        {
          value: '测试文章3',
          i:6
        },
        {
          value: '测试文章4',
          i:7
        },
        {
          value: '测试文章5',
          i:8
        },
        {
          value: '测试文章6',
          i:9
        },
        {
          value: '测试文章7',
          i:10
        }
      ],
      allpsData:[
        {value:'张三',i:0},
        {value:'李四',i:1},
        {value:'赵五',i:2},
        {value:'王六',i:3},
        {value:'关七',i:4},
        {value:'李四1',i:5},
        {value:'李四2',i:6},
        {value:'李四3',i:7},
        {value:'李四4',i:8},
        {value:'李四5',i:9},
        {value:'李四6',i:10},
        {value:'李四7',i:11},
        {value:'李四8',i:12},
        {value:'李四9',i:13},
      ],
      psData:[],
      tableData:[],
      currentRow:'国家“111计划”基地5年评估一次，运行良好可滚动支持',
      multipleSelection: []
    }
  },
  methods:{
    showBox:function(){
      $(".mask1,.alertBox").addClass("showBtn");
    },
    hideArtBox:function(){
      $(".mask2,.articleBox").removeClass("showBtn");
      $(".mask1").addClass("showBtn");
    },
    hideMultiBox:function(){
      $(".mask2,.multiBox").removeClass("showBtn");
      $(".mask1").addClass("showBtn");
    },
    showMultiBox:function(){
      $(".articleBox").addClass("showBtn");
      $(".printPs").removeClass("showBtn");
    },
    hideBox:function(){
      $(".mask1,.alertBox").removeClass("showBtn");
    },
    hideMesBox:function(){
      $(".mask1,.mesBox").removeClass("showBtn");
    },
    hideUserBox:function(){
      $(".mask1,.userBox").removeClass("showBtn");
    },
    hidePSBox:function(){
      $(".mask1,.psBox").removeClass("showBtn");
      $(".psBox").removeClass("alertStyle_");
      $(".el-row").removeClass("show_row");
    },
    removeItem:function(index){
      var self=this;
      self.list.splice(index,1);
    },
    getTop:function(){
      return $(window).height()*0.5+'px';
    },
    showAllArticle:function(){
      // if(this.radio1=''){
        // this.radio=0;
      // }
      // else{
      //   console.log("123");
      //   this.radio=this.radio1;
      // }
      this.commonData=this.alltableData;
      this.titleName='文章选择';
      this.phtext="请输入文章标题";
      this.labeltext="文章标题";
      this.isSelect=false;
      $(".articleBox").addClass("showBtn");
      $(".printPs").addClass("showBtn");
      // this.currentView=BComponent;
    },
    showCommonBox:function(){
      this.state2='';
      $(".mask2").addClass("showBtn");
      $(".mask1").removeClass("showBtn");
      // $(".articleBox").addClass("showBtn");
    },
    querySearch(queryString, cb) {
      var alltableData = this.commonData;
      var results = queryString ? alltableData.filter(this.createFilter(queryString)) : alltableData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) ===0);
      };
    },
    psPeople:function(){
      // if(this.radio2=''){
        // this.radio=0;
      // }
      // else{
      //   this.radio=this.radio2;
      // }
      this.commonData=this.allpsData;
      this.titleName='批示人选择';
      this.phtext="请输入批示人姓名";
      this.labeltext="人员姓名";
      this.isSelect=false;
      $(".articleBox").addClass("showBtn");
      $(".printPs").removeClass("showBtn");
      // this.currentView=BComponent;
    },
    solvePeople:function(){
      this.commonData=this.allpsData;
      this.titleName='处理人选择';
      this.phtext="请输入处理人姓名";
      this.labeltext="人员姓名";
      this.isSelect=true;
      $(".multiBox").addClass("showBtn");
      $(".printPs").removeClass("showBtn");
      // this.currentView=AComponent;
    },
    // loadAll() {
    //   return [
    //     {"value":"国家“111计划”基地5年评估一次，运行良好可滚动支持"},
    //     {"value":"江苏省公布十三五期间重点学科名单，21所高校313个学科入选"},
    //     {"value":"山东大学实施学科高峰计划，未来五年50亿元投入学科建设"},
    //     {"value":"国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单"},
    //   ];
    // },
    handleSelect(item) {
      // var el=event.currentTarget;
      console.log(item.value);
      for (var i=0;i<this.commonData.length;i++) {
        if(this.commonData[i].value==item.value){
          if(this.isSelect){
            this.commonSelHandler('.multiBox',i,item);
          }
          else{
            this.commonSelHandler('.articleBox',i,item);
          }
        }
      }
    },
    commonSelHandler(selector,i,item){
      $(selector).find(".article_table tbody").children("tr").removeClass("current-row");
      $(selector).find(".article_table tbody").children("tr").eq(i).addClass("current-row");
      this.radio=i;
      if(this.commonData==this.alltableData){
        this.currentRow=item.value;
        // this.radio1=this.radio;
      }
      else if(!this.isSelect){
        console.log("success");
        this.input2=item.value;
        // this.radio2=this.radio;
      }
      var height=$(selector).find(".article_table tbody").children("tr").eq(i).position().top;
      $(selector).find(".alertContent .el-table__body-wrapper").scrollTop(height)
    },
    handleCurrentChange(currentPage){
      var start=(currentPage-1)*6;
      var end=currentPage*6;
      this.tableData=this.alltableData.slice(start,end);
    },
    handleTableCurrentChange(val){//点击具体表格中的条目
      if(val){
        if(this.commonData==this.alltableData){
          this.currentRow=val.value;
          // this.radio1=val.i;
        }
        else if(!this.isSelect){
          this.input2=val.value;
          // this.radio2=val.i;
        }
        this.radio=0;
      }
    },
    handlePreData:function(val1){
      for (var i=0;i<val1.length;i++) {
        val1[i].i=i;
      }
      var val2=val1.slice(0,6);
      return val2;
    },
    handleSelectionChange(val) {//点击多选的条目
      // console.log(val);
      this.input3='';
      for (var i=0;i<val.length;i++) {
        this.input3+=val[i].value+' ';
      }
      // this.multipleSelection = val;
    },
    optionChangeHandler(val){

    },
  },
  // created: function(){
  //   editor.render()
  // },
  mounted() {
    // this.restaurants = this.loadAll();
    editor.render();
    this.tableData=this.handlePreData(this.alltableData);
    this.psData=this.handlePreData(this.allpsData);
  }
}
var editor =  new tinymce.Editor('tinymce', {
  selector: '#tinymce',
  height: 200,
  theme: 'modern',
  language: 'zh_CN',
  menubar: false,
  plugins: [
      'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      // 'searchreplace wordcount visualblocks visualchars code fullscreen',dsd
      'insertdatetime media nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern imagetools'
  ],
  toolbar1: 'insertfile undo redo | fontsizeselect styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image print | preview media',
  // toolbar2: 'print preview media | forecolor backcolor | example',
  setup: function(ed) {
  },
  fontsize_formats: "12px 14px 18px 24px 36px 48px 60px 72px 84px 96px 108px 120px",
  image_advtab: true,
  relative_url: false,
  templates: [
      { title: 'Test template 1', content: 'Test 1' },
      { title: 'Test template 2', content: 'Test 2' }
  ],
  content_css: [
      './static/css/tinymce.css'
  ],
  file_browser_callback: function(field_name, url, type, win) {
      if(type=='image') 
      {
          $('#my_form').click();
          $("#my_form").on("change", function(e){
              type_arr=[];
              var file = e.target.files; //获取图片资源
              for(var i=0; i< file.length; i++){
                  var formData = new FormData();  
                  formData.append("file" , file[i]);
                  $.when(getImgUrl(formData)).done(function(data){
                      if(data.state==0){
                          var order=data.order;
                          var photo_=order[0].file;
                          win.document.getElementById(field_name).value = photo_;
                      }
                  })
              }
          });
      };

  },
}, tinymce.EditorManager);
</script>

<style lang="less">
@import '../static/less/init.less';
@import '../static/less/tinymce.less';
@import '../static/less/alertStyle.less';
body{
  margin:0;
  position: relative;
  // margin-bottom:50px;
}
#app {
 }
.topBar{
   // height: 80px;
   background-color: #fff;
   width: 100%;
   border-bottom: 1px solid #C9C9C9;
}
.topContent{
    width:1100px;
    // height:80px;
    margin:auto;
    p{
      float:left;
    }
    p:nth-child(1){
      color:#797979;
      font-size: 24px;
      position: relative;
      margin: 21px;
      margin-right: 40px;
      margin-left: 0;
      font-weight:400;
      span{
        vertical-align: middle;
      }
      span:nth-child(1){
        color:#0099FF;
        font-size: 32px;
      }
      span:nth-child(2){
        color:#FFCC00;
        font-size: 32px;
      } 
      span:nth-child(3){
        color:#00CC99;
        font-size: 32px;
        display:inline-block;
        margin-right:10px;
      }
      span:nth-child(4){
        position: absolute;
        top: -5px;
        right: -20px;
        font-size: 14px;
        color: #F74937;
      }
    }
    p:nth-child(2){
      position: relative;
      width:520px;
      // padding-top: 20px;
      // padding-bottom: 20px;
      line-height:86px;
      a{
        display: block;
        position: absolute;
        right: 0;
        // top: 20px;
        top:23px;
        width: 80px;
        height: 40px;
        background-color: #0099ff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      img{
        display: block;
        width: 26px;
        height: 26px;
        margin: auto;
        margin-top: 10px;
      }
      input{
        padding: 0 10px;
        height:40px;
        width: 440px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border:none;
        border:1px solid #ccc;
        background-color: #f2f2f2;
      }
    }
    p:nth-child(3){
      float:right;
      height:42px;
      position: relative;
      padding-top:20px;
      img{
        display:block;
        width:30px;
        height:30px;
        float:left;
        margin-top:8px;
      }
      img:nth-child(1){
        margin-right:15px;
      }
      span{
        display:inline-block;
        background-color: #ff6666;
        width:16px;
        height:16px;
        text-align: center;
        color:#fff;
        font-size:10px;
        border-radius: 50%;
        line-height: 16px;
        position: absolute;
        left: 20px;
        top: 25px;
      }
    }
    .after;
}
.bottomBar{
  font-size:13px;
  z-index:2;
  width:100%;
  height:50px;
  line-height:50px;
  background-color: #001726;
  position: absolute;
  bottom: 0;
  left:0;
  color:#fff;
  .bottomContent{
    width:85%;
    margin:auto;
    p{
      float:left;
    }
    p:nth-child(2){
      float:right;
    }
    span{
      display:inline-block;
      margin:0 10px;
    }
    .after;
  }
}
</style>
