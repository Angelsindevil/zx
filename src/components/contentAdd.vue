<template>
  <div class="contentAdd">
    <div class="rightBar">
      <p>内容编辑
      </p>
      <el-button class="btn_position" @click="releaseBtn">发布</el-button>
    </div>
    <div class="rightContent">
      <div class="title_bar">
        <el-form ref="form" :model="form">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <el-form-item label="类别：">
                <el-select v-model="form.type" placeholder="" @change="optionChangeHandler">
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源：">
                <el-input v-model="form.source" placeholder="请输入来源"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源链接：">
                <el-input v-model="form.link" placeholder="请输入链接"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题：">
            <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="公布日期：">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
             >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="正文：" class="item_new">
            <div class="editBox">
              <!-- <textarea id="tinymce"></textarea>
              <input type="file" name="" class="file_" id="my_form" style="display:none;">
               -->
                <div id="toolbar">
                  <span class="ql-formats">
                    <select class="ql-size">
                     <!--  <option value="12px">12px</option>
                      <option value="14px">14px</option>
                      <option value="16px">16px</option>
                      <option value="18">18px</option> -->
                      <option value="small">12px</option>
                      <!-- Note a missing, thus falsy value, is used to reset to default -->
                      <option selected>14px</option>
                      <option value="large">16px</option>
                      <option value="huge">18px</option>
                    </select>
                  </span>
                  <span class="ql-formats">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                  </span>
                  <span class="ql-formats">
                    <button class="ql-list" value="ordered" type="button"></button>
                    <button class="ql-list" value="bullet" type="button"></button>
                    <select class="ql-align">
                      <option selected=""></option>
                      <option value="center"></option>
                      <option value="right"></option>
                      <option value="justify"></option>
                    </select>
                    <button class="ql-image" type="button"></button>
                  </span>
                </div>
               <div id="editor"></div>
            </div>
          </el-form-item>
        </el-form>
        <div class="newBottom">
          <span class="rightBot">
            <span class="bg_blue" @click="saveBtn">保存</span> 
            <span class="bg_cancle" @click="resetBtn">取消</span> 
          </span>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import {matchMenu} from '../../static/js/public.js'
export default {
  name: 'test',
  data () {
    return {
        // options: [{
        //   value: '动态资讯',
        //   label: '动态资讯'
        // }, {
        //   value: '学校新闻',
        //   label: '学校新闻'
        // }],
        options:[],
        form: {
          type:'',
          source: '',
          link: '',
          title: '',
          date:'',
          text:''
        },
        source:{},
        quill:'',
        id:'',
        txt:'',
        addId:'',
        initType:'',
        isAdded:'',
    }
  },
  beforeRouteLeave (to, from, next) {
    if(this.form.source!=""||this.form.link!=""||this.form.title!=""||this.form.text!=""){
      if(confirm("当前收录内容还未保存，是否退出该页面？")){
        next(true);
      }
      else{
        next(false);
        this.$nextTick(function(){
          $(".clickStyle").removeClass("blue");
          $(".leftMenu .contentManage").find(".clickStyle").eq(1).addClass('blue');
          // $(".contentManage").find("li").eq(2).addClass('blue');
        })
      }
    }
    else{
      next(true);
    }
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  // watch: {
  //   $route (to, from) {
  //       if(from.hash === "/homePage/contentAdd") {
  //       }
  //   }
  // },
  methods:{
    handleInputClick:function(){},
    optionChangeHandler(){},
    // beforeRouteLeave (to, from, next) {
    //   if(this.form.source!=""||this.form.link!=""||this.form.title!=""||this.form.date!=""||this.form.text!=""){
    //     if(confirm("当前收录内容还未保存，是否退出该页面？")){
    //       alert("111");
    //     }
    //     else{
    //     }
    //   }
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    // },
    searchThis(){
      var hash=this.$route.hash
      // if(this.form.source=""||this.form.link=""||this.form.title=""||this.form.date=""||this.form.text=""){
        // if(confirm("当前收录内容还未保存，是否退出该页面？")){
        // }
        // else{
        // }
      // }
    },
    saveBtn(){
      this.txt=document.querySelector("#editor .ql-editor").innerHTML;
      console.log(this.txt);
      var that=this;
      console.log(this.form.date);
      if(this.form.title==""){
        alert("请输入文章标题！");
      }
      else if(this.form.date==""){
        alert("还未选择日期！");
      }
      else if(this.txt=="<p><br></p>"){
        alert("请输入文章内容！");
      }
      else{
        if(this.id!=undefined){//编辑啊
          $.when(editArticle(this.id,this.form.type,this.form.source,this.form.link,this.form.title,this.form.date,this.txt)).done(function(data){
            if(data.state=="0"){
              alert("已保存至内容筛选列表！");
              that.resetBtn();
              // that.form.type=that.initType;
              // that.form.source="";
              // that.form.link="";
              // that.form.title="";
              // that.form.date="";
              // that.quill.setText("");
              // that.addId=data.data.id;
            }
            else{
              alert(data.data);
            }
          })
        }
        else{//新增
          $.when(addArticle(this.form.type,this.form.source,this.form.link,this.form.title,this.form.date,this.txt)).done(function(data){
            if(data.state=="0"){
              alert("已保存至内容筛选列表！");
              that.resetBtn();
            }
            else{
              alert(data.data);
            }
          })
        }
      }
    },
    resetBtn(){
      var that=this;
      that.form.type=that.initType;
      that.form.source="";
      that.form.link="";
      that.form.title="";
      that.form.date="";
      that.form.text="";
      that.quill.setText("");
    },
    releaseBtn(id){
      this.txt=document.querySelector("#editor .ql-editor").innerHTML;
      var that=this;
      if(this.form.title==""){
        alert("请输入文章标题！");
      }
      else if(this.form.date==""){
        alert("还未选择日期！");
      }
      else if(this.txt=="<p><br></p>"){
        alert("请输入文章内容！");
      }
      else{
        if(this.id!=undefined){//编辑可直接发布(编辑也要先报保存吧！)
          $.when(releaseArticle(this.id)).done(function(data){
            if(data.state=="0"){
              alert("文章发布成功！");
              that.resetBtn();
            }
            else{
              alert(data.data);
            }
          })
          $.when(editArticle(this.id,this.form.type,this.form.source,this.form.link,this.form.title,this.form.date,this.txt)).done(function(data){
            if(data.state=="0"){
              that.resetBtn();
            }
            else{
              alert(data.data);
            }
          })
        }
        else{//新增 先保存再发布
          $.when(addArticle(this.form.type,this.form.source,this.form.link,this.form.title,this.form.date,this.txt)).done(function(data){
            if(data.state=="0"){
              $.when(releaseArticle(data.data.id)).done(function(res){
                if(res.state=="0"){
                  alert("文章发布成功！");
                  that.resetBtn();
                }
                else{
                  alert(res.data);
                }
              })
            }
            else{
              alert(data.data);
            }
          })
        }
      }
    },
  },
  mounted() {
    this.quill = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',
      },
      theme: 'snow'
    });
    if(this.id!=undefined&&this.source!=undefined){
      // document.querySelector("#editor").innerHTML=this.source.content;
      // if(this.isAdded==0){
        // this.quill.setContents(this.source.content);
      // }
      // else if(this.isAdded==1){
      //   this.quill.clipboard.dangerouslyPasteHTML(0, this.source.content);
      // }
      // else{}
      this.quill.clipboard.dangerouslyPasteHTML(0, this.source.content);
    }
    else{}
  },
  created:function(){
    var that=this;
    this.$nextTick(function(){
      matchMenu();
    })
    // this.beforeRouteLeave();
    // this.$route.beforeRouteLeave((to, from, next) => {
    //   if(this.form.source!=""||this.form.link!=""||this.form.title!=""||this.form.date!=""||this.form.text!=""){
    //     if(confirm("当前收录内容还未保存，是否退出该页面？")){
    //       alert("111");
    //     }
    //     else{
    //       next(false);
    //     }
    //   }
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    // })
    this.id = this.$route.query.id;
    if(this.id!=undefined){
      this.source=JSON.parse(localStorage.getItem("editor"));
      if(this.source){
        // this.form.type=this.source.type;
        this.form.source=this.source.source;
        this.form.link=this.source.link;
        this.form.title=this.source.title;
        this.form.date=this.source.date;
        this.form.text=this.source.content;
        this.isAdded=this.source.isAdded;
      }
    }
    else{
      this.form.source="";
      this.form.link="";
      this.form.title="";
      this.form.date="";
      this.form.text="";
    }
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
        if(that.id!=undefined&&that.source){
          that.form.type=that.source.type;
        }
        else{
          that.form.type=that.options[0].value;
          that.initType=that.options[0].value;
        }
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
  .contentAdd{
    .ql-editor{
      height:400px!important;
    }
    .ql-toolbar.ql-snow,.ql-container.ql-snow{
      border-color:#bfcbd9;
    }
    .ql-toolbar{
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
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
      .btn_position{
        width:80px;
        position: absolute;
        right:20px;
        top:12px;
        color:#0099FF;
        font-size: 13px;
        background-color: #fafafa!important;
        padding:11px 15px;
      }
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
      }
    }
    .el-form{
      height:auto;
      .el-form-item__label{
        width:85px;
      }
      .el-form-item__content{
        margin-left: 85px;
        .el-select{
          margin-left: 0;
          width: 100%;
        }
      }
      .el-date-editor.el-input{
        width:100%;
      }
      .el-row{
        .el-col{
          .el-form-item__label{
            width:85px;
          }
          .el-form-item__content{
            margin-left: 85px;
            .el-select{
              margin-left: 0;
              width: 100%;
            }
          }
        }
        .el-col:first-child{
          width:23%;
        }
        .el-col:nth-child(2){
          width:33%;
        }
        .el-col:last-child{
          width:44%;
          label{
            width:120px;
          }
          .el-form-item__content{
            margin-left: 120px;
          }
        }
      }
    }
  }
  .newBottom{
    width:100%;
    height:50px;
    position: relative;
    .rightBot{
      position: absolute;
      right: 0px;
      bottom: 0px;
      >span{
        vertical-align:middle;
        display:inline-block;
        margin:0 10px;
        height:32px;
        line-height:32px;
        width: 100px;
        float:right;
        font-size: 14px;
        color:#fff;
        text-align: center;
        border-radius:5px;
        cursor:pointer;
      }
    }  
    .bg_blue{
      background-color: #0099FF;
    }
    .bg_cancle{
      background-color: #ccc;
    }
  }
  .item_new{
    .el-form-item__content{
      line-height:1;
    }
  }
</style>
