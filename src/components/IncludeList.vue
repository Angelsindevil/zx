<template>
  <div class="report reportStyle">
    <div class="rightBar">
      <p>报告中心-收录管理：
        <span>今日收录<span>{{totalNum}}</span>篇，选入报告<span>{{todayNum}}</span>篇</span>
      </p>
      <!-- <div>
        <input type="" name="" placeholder="搜索已收录的内容">
      </div> -->
      <!-- <div class="admin_ui_input">
        <input type="" name="" placeholder="搜索已收录的内容">
      </div> -->
      <el-input
        placeholder="搜索已收录的内容"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>
    <div class="rightContent">
      <div class="title_bar">
        <!-- <label for="selAll"><input type="checkbox" id="selAll" @click="checkAll">全选</label> -->
        <el-checkbox v-model="checked" @change="checkAll" id="selAll">全选</el-checkbox>
        <el-select v-model="value" placeholder="" @change="optionChangeHandler" class="selectStyle">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        <span class="includeBtn_" id="reportProduce" @click="showSomething"><img src="../../static/img/report.png" alt="" style="margin-bottom: -3px;"><span>生成报告</span><span class="redFlag" ref="red">{{num}}</span></span>
      </div>
      <div class="title_content">
        <ul>
          <li v-for="(item,index) in articlesAarry">
            <!-- <label for="selItem_1"> -->
              <!-- <input type="checkbox" class="checkItem" @click="checkItem" id="selItem_1"> -->
              <!-- <el-checkbox v-model="checked"></el-checkbox> -->
            <!-- </label> -->
            <el-checkbox  @change="checkItem($event,index)" class="checkItem" v-model="checkedList[index]"></el-checkbox>
            <span><span class="ellipsis titleEll">{{item.title}}</span> - <span class="dateStyle">{{item.date}}</span></span>
            <span class="includeBtn_" :class="item.isGenerate==1?'grey':''" :data-id="item.articleId"><span>{{item.isGenerate==1?'已生成报告':'未生成报告'}}</span></span>
            <span class="includeBtn grey" @click="includeThis($event,item.isGenerate)" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus_grey.png" alt="" style="margin-bottom: -7px;"><span>已收录</span></span>
          </li>
          <!-- <li>
            <label for="selItem_2">
              <input type="checkbox" class="checkItem" @click="checkItem" id="selItem_2">
            </label>
            <span>2016年度国家科学技术奖正式公布，128所高校获奖 - <span>2016/12/10</span></span>
            <span class="includeBtn_ grey"><span>已生成报告</span></span>
            <span class="includeBtn grey" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus_grey.png" alt=""><span>已收录</span></span>
          </li>
          <li>
            <label for="selItem_3">
              <input type="checkbox" class="checkItem" @click="checkItem" id="selItem_3">
            </label>
            <span>2016年度国家科学技术奖正式公布，128所高校获奖 - <span>2016/12/10</span></span>
            <span class="includeBtn_"><span>未生成报告</span></span>
            <span class="includeBtn" @click="includeThis" @mouseover="canceInclude" @mouseout="includeThis_"><img src="../../static/img/plus.png" alt=""><span>收录</span></span>
          </li> -->
        </ul>
      </div>
    </div>  
    <div class="rightBottom" ref="rightBottom" @click="loadMore">
      <p>
      点击加载更多内容
      </p>
    </div>
    <!-- <ul v-sortable="{ onUpdate: onUpdate }">
      <li v-for="item in list">{{ item }}</li>
   </ul> -->
    <!-- <draggable :list="list" class="dragArea" @start="dragging=true" @end="dragging=false">
      <div v-for="element in list">{{element.name}}</div>
    </draggable> -->
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
       list:[{name:"Foo"}, 
          {name:"Bar"}, 
          {name:"Baz"},
           ],
        input2:'',
        checked:false,
        options: [{
          value: '0',
          label: '全部内容'
        }, {
          value: '1',
          label: '未生成报告'
        }, {
          value: '2',
          label: '已生成报告'
        }],
        value: '1',
        num:0,
        tableData: {
          list:[
            {
              'articleId':'001',
              'date':'2016-07-12',
              'isGenerate':'0',
              'title':"高等教育信息动态1-20161208-V01",
            },
            {
              'articleId':'002',
              'date':'2016-07-15',
              'isGenerate':'1',
              'title':"高等教育信息动态2-20161208-V02",
            },
            {
              'articleId':'003',
              'date':'2016-07-15',
              'isGenerate':'1',
              'title':"高等教育信息动态2-20161208-V02",
            },
            {
              'articleId':'004',
              'date':'2016-07-15',
              'isGenerate':'1',
              'title':"高等教育信息动态2-20161208-V02",
            },
            {
              'articleId':'005',
              'date':'2016-07-15',
              'isGenerate':'1',
              'title':"高等教育信息动态2-20161208-V02",
            }
        ],
        "totalNum":"136",
        "todayNum":"12",
      },
      checkedList:[],
      articlesAarry:[],
      totalNum:'',
      todayNum:'',
      pageNo:1,
      userSource:{},
      userid:'',
      article_id:[],
    }
  },
  methods: {
    showSomething:function(){
      this.article_id=[];
      console.log(this.checkedList);
      console.log(this.articlesAarry);
      var that=this;

      var storeObj=[];//test

      this.checkedList.map(function(value,index){
        console.log(value);
        var id=that.articlesAarry[index].id;
        if(value){
          that.article_id.push(id);
          storeObj.push(that.articlesAarry[index]);
        }
        else{
        }
      },that);
      if(this.article_id.length==0){
        alert("还未选择收录的文章！");
      }
      else{
        $(".mask1").addClass("showBtn");
        $(".alertBox").addClass("showBtn");

        // console.log(storeObj);
        this.$store.dispatch('changeReporter',{reportObj:storeObj}).then(function(resp){});//test

        // $.when(buildReporter(that.userid,that.article_id)).done(function(data){
        //   if(data.state=="0"){
        //     var list=data.data.list;
        //     this.$store.dispatch('changeReporter',{reportObj:list}).then(function(resp){});
        //   }
        //   else{
        //     // alert(data.data);
        //   }
        // })
      }
    },
    checkAll:function(e){
      if(this.checked){
        this.checkedList=this.checkedList.map(function(value,index){
          return true;
        })
        this.num=this.checkedList.length;
        $(this.$refs.red).show();
      }
      else{
        this.checkedList=this.checkedList.map(function(value,index){
          return false;
        })
        this.num=0;
        $(this.$refs.red).hide();
      }
    },
    checkItem:function(e,index){
      var flag=this.checkedList.indexOf(true);
      if(this.checkedList[index]){
        $(this.$refs.red).show();
        this.num=this.num+1;
      }
      else{
        if(flag==-1){
          $(this.$refs.red).hide();
        }
        else{}
        this.num=this.num-1;
      }
    },
    includeThis_:function(e){
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('grey');
      if(class_){
        el.removeClass("red").addClass("grey").find("span").text("已收录");
        el.find("img").attr("src","./static/img/plus_grey.png");
      }
      else{
      }
    },
    canceInclude:function(e){
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('grey');
      if(class_){
        el.addClass("red").find("span").text("取消收录");
        el.find("img").attr("src","./static/img/reduce.png");
      }
    },
    includeThis:function(e,item){
      e.stopPropagation();
      var el=$(e.target).closest(".includeBtn");
      var class_=el.hasClass('red');
      var id=$(el).attr("data-id");
      if(class_){
        //执行取消
        if(item==1){//已生成报告 不允许取消
          alert("已生成报告，不可取消收录！");
        }
        else{
          $.when(canceled(id)).done(function(data){
            if(data.state=="0"){
              el.removeClass("grey red").find("span").text("收录");
              el.find("img").attr("src","./static/img/plus.png");
            }
            else{
              alert(data.data);
            }
          })
        }
      }
      else{
      }
    },
    handleInputClick:function(){
      var that=this;
      that.pageNo=1;
      this.articlesAarry=[];
      $.when(getIncludedSearch(that.userid,that.input2,that.value,that.pageNo)).done(function(data){
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
      $.when(getIncludedSearch(that.userid,that.input2,val,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.insertData(data);
        }
        else{
          alert(data.data);
        }
      })
    },
    insertData(data){
      var that=this;
      var res=data.data;
      var len=that.articlesAarry.length;
      that.totalNum=res.totalNum;
      that.todayNum=res.todayNum;
      if(res.list&&res.list.length!=0){
        if(res.list.length<20){
          $(that.$refs.rightBottom).children('p').text('暂无更多历史收录内容');
          if(that.pageNo==1){
            that.articlesAarry=[];
          }
          else{}
        }
        else{
          $(that.$refs.rightBottom).children('p').text('点击加载更多历史收录内容');
        }
        // $(that.$refs.rightBottom).children('p').text('点击加载更多批示');
        that.articles=res.list.map(function(value,index){
          return {
            "id":value.articleId,
            "title":value.title,
            "date":value.createTime,
            "isGenerate":value.status,
          }
        })
        that.articlesAarry=that.articles;
        that.checkedList=that.articlesAarry.map(function(value,index){
          return false;
        })
      }
      else{
        if(that.pageNo==1){//只一页
          $(that.$refs.rightBottom).children('p').text('暂无历史收录内容');
          that.articlesAarry=[];
        }
        else{//多余一页
          $(that.$refs.rightBottom).children('p').text('暂无更多历史收录内容');
        }
      }
    },
    loadMore(){
      this.pageNo=this.pageNo+1;
      var height;
      this.$nextTick(function(){
        // height=$(".rightContent").last().offset().top;
        height=$(".rightContent ul").find('li').last().offset().top;
      })
      var that=this;
      $.when(getIncludedSearch(that.userid,that.input2,that.value,that.pageNo)).done(function(data){
        if(data.state=="0"){
          that.insertData(data);
          that.$nextTick(function(){
            // $(document).scrollTop(height);
            $(document).scrollTop(height-350);
          })
        }
        else{
          alert(data.data);
        }
      })
    },
  },
  created:function(){
    var that=this;
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.userid=this.userSource?this.userSource.id:'';
    this.$nextTick(function(){
      matchMenu();
    })

    this.articlesAarry=this.tableData.list;//test

    this.checkedList=this.articlesAarry.map(function(value,index){
      return false;
    })
    $.when(getIncludedList(that.userid,that.value,that.pageNo)).done(function(data){
      if(data.state=='0'){
        that.insertData(data);;
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
  .report{
    margin-bottom:65px;
    >a{
      display: block;
      color: #000;
    }
    .titleEll{
      display: inline-block;
      max-width: 50%;
      vertical-align: middle;
    }
    .rightContent{
      width:100%;
      margin-top:15px;
      border:1px solid #eee;
      background-color: #fff;
      border-radius:5px;
      .title_bar{
        padding:20px;
        font-size:20px;
        position: relative;
        border-bottom:1px solid #eee;
        img{
          display:inline-block;
          width: 17px;
          height: 17px;
          margin-right: 6px;
        }
        >label{
          color:#777;
          font-size:16px;
          input{
            margin-right:15px;
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
  .includeBtn,.includeBtn_{
    position: absolute;
    right:20px;
    top:22px;
    width:110px;
    height:30px;
    display:inline-block;
    border:1px solid #0099cc;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    color: #0099cc;
    border-radius:5px;
    >span:nth-child(3){
      display:none;
      position: absolute;
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background-color: #FF6666;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      top: -8px;
      right: -6px;
    }
    .redFlag{
      // display:none;
    }
    img{
       display:inline-block;
        margin-bottom: -5px;
        margin-right: 15px;
        width: 25px;
        height: 22px;
    }
  }
  .title_content{
    margin:0;
    // margin-bottom:20px;
    ul{
      padding:0 20px;
      margin:0;
      li{
        font-size:15px;
        color:#333;
        width:100%;
        padding:25px 0;
        border-bottom:2px dashed #efefef;
        position: relative;
        .includeBtn,.includeBtn_{
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }
        .includeBtn_{
          font-size: 12px;
          width: 80px;
          height: 25px;
          line-height: 25px;
          position: absolute;
          right:130px;
          top:24px;
        }
        .includeBtn{
          width:100px;
          position: absolute;
          right:0px;
          top:22px;
          cursor:pointer;
          font-size: 14px;
        }
      }
      li:last-child{
        border:none;
      }
      .dateStyle{
        font-size: 14px;
        color: #666
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
  body.dragging, body.dragging * {
    cursor: move !important;
  }
  .dragged {
    position: absolute;
    opacity: 0.5;
    z-index: 2000;
  }
  ul.list-group li.placeholder {
    position: relative;
    /** More li styles **/
  }
  ul.list-group li.placeholder:before {
    position: absolute;
    /** Define arrowhead **/
  }
  #reportProduce{
    cursor:pointer;
  }
  .admin_ui_select,.admin_ui_input{
    position: absolute;
    left: 100px;
    top:15px;
    display: inline-block;
    width: 120px;
    line-height: 1;
    background-color: #fff;
    border-radius:5px;
  }
  .admin_ui_select > select,.admin_ui_input>input{
      position: relative;
      width: 100%;
      height: 32px;
      line-height:1;
      padding: 6px 20px 6px 12px;
      border: 1px solid #ccc!important;
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
  .admin_ui_select:before,.admin_ui_input:before{
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
  .admin_ui_input{
    position:absolute;
    right:20px;
    top:15px;
    left:auto;
    background-color: #D2E5F5;
    width: 230px;
  }
  .admin_ui_input>input{
    font-size:12px;
     padding: 6px 30px 6px 12px;
  }
  .admin_ui_input:before{
    content:'\f002';
    color:#fff;
    font-size:18px;
    top:6px;
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
  .el-select{
    width:120px;
    margin-left:20px;
    position: relative;
    top: 0;
  }
  .checkItem{
    margin-right: 5px;
    .el-checkbox__input{
      line-height:14px;
      vertical-align: middle;
    }
  }
  #selAll{
    .el-checkbox__input{
      margin-right:5px;
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
        // font-size: 18px;
        // font-size: 16px;
      }
    }
  }
  label{
    color:#777;
    font-size:16px;
    input{
      margin-right:15px;
    }
  }
}

// .switchBtn{
//   position: absolute;
//   left: 100px;
//   top:15px;
//   border:1px solid #aaa;
//   border-radius:5px;
//   width:120px;
//   line-height:1;
//   select{
//     border: none;
//     background-color: transparent;
//     height: 30px;
//     width: 100px;
//     background-color: #fff;
//     color:#797979;
//     text-indent: 1em;
//     width:100%;
//     padding: 6px 20px 6px 4px;
//     appearance: none;
//     -moz-appearance: none;
//     -webkit-appearance: none;
//   }
//   &:before{
//     // content:url('../../static/img/arrow.png');
//     content:'';
//     position: absolute;
//     right:4px;
//     top:7px;
//     width:20px;
//     height:16px;
//     display:inline-block;
//     background-image: url('../../static/img/arrow.png');
//     background-size:16px 16px;
//     background-repeat: no-repeat;
//   }
// }
  
</style>
