<template>
  <div class="psBox alertStyle">
    <div class="alertTop">信息批示<span @click="hidePSBox"><img src="../../static/img/cancel.png"></span></div>
    <div class="alertContent">
      <el-button class="article_btn" @click="showAllArticle();showCommonBox()"><img src="../../static/img/report.png" alt="">批示文章：<span>{{currentRow}}</span></el-button>
      <div class="editContainer">
        <p class="ptitle">输入批示内容</p>
        <div class="editBox">
          <!-- <textarea id="tinymce_new"></textarea>
          <input type="file" name="" class="file_" id="my_form" style="display:none;"> -->
          <div id="toolbar_new">
            <span class="ql-formats">
              <select class="ql-size">
                <option value="10px">12px</option>
                <option value="13px" selected>14px</option>
                <option value="18px">16px</option>
                <option value="32px">18px</option>
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
            </span>
          </div>
          <div id="editor_new"></div>
        </div>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content bg-purple">
          <span class="typeLabel">类型：</span>
          <el-select v-model="value" placeholder="请选择" class="typeChoose" disabled>
            <el-option
              v-for="item in typeOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light" @click="psPeople">
          <span class="typeLabel">批示人：</span>
          <el-input
            placeholder="请选择"
            icon="menu"
            v-model="input2"
            class="typeChoose_"
            :disabled="psDisabled"
            >
          </el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" @click="solvePeople">
          <span class="typeLabel">处理人：</span>
          <el-input
            placeholder="请选择"
            icon="menu"
            v-model="input3"
            class="typeChoose_"
            :disabled="clDisabled"
            >
          </el-input>
        </div></el-col>
      </el-row>
    </div>
    <div class="alertBottom">
      <span class="leftBot">
        <span class="blueBot">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </span>
        <span class="linkBot">附件：<span>双一流政策研究报告</span></span>
      </span>
      <span class="rightBot">
        <span class="bg_green" @click="hidePSBox(),addPs()">确定</span> 
        <span class="bg_blue printPs"><img src="../../static/img/print.png" alt="">打印批示</span> 
        <span @click="hidePSBox" class="bg_cancle">取消</span> 
      </span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
     name: 'app',
  data () {
    return {
      typeOptions:[
      {value:'0',
      label:'批示'},
      {value:'1',
      label:'分发'},
      {value:'2',
      label:'反馈'},
      ],
      value:'0',
      input2:'',
      input3:'',
      state2:'',
      psDisabled:false,
      clDisabled:false,
      currentRow:'国家“111计划”基地5年评估一次，运行良好可滚动支持',
      fileList: []
    }
  },
  computed: {
    ...mapGetters({
      selectArr: 'selectArr',
      peopleObj:'peopleObj',
      articleObj:'articleObj',
      type:'type',
    })
  },
  watch:{
    selectArr:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        console.log(val);
        // for (var i=0;i<val.length;i++) {
        //   this.input3+=val[i]+' ';
        // }
        if(val.length<2){
          this.input3=val[0];
        }
        else{
          this.input3=val[0]+'...';
        }
      },
      deep:true,
      immediate: true,
    },
    peopleObj:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        console.log(val);
        this.input2=val.value;
      },
      deep:true,
      immediate: true,
    },
    articleObj:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        console.log(val);
        this.currentRow=val.value;
      },
      deep:true,
      immediate: true,
    },
    type:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        console.log(val);
        this.value=val;
        this.psDisabled=true;//判断不是系统管理员
        if(val=='0'){//批示弹窗
          // tinymce.get('tinymce').setContent('<p style="line-height:2">请发展规划处等抓紧时间研究国家双一流方案的细则和教育部有关部门的解读<br><span style="color:#FF6600">（如批示是由纸质材料批示，则由数据与信息中心发起流程并人工输入）</span></p>');
        }
        else if(val=='1'){//分发弹窗
          this.clDisabled=false;
        }
        else if(val=='2'){//反馈弹窗
          this.clDisabled=true;
        }
        else{
        }
      },
      deep:true,
      immediate: true,
    },
  },
  methods:{
    hidePSBox:function(){
      $(".mask1,.psBox").removeClass("showBtn");
      $(".psBox").removeClass("alertStyle_");
      $(".el-row").removeClass("show_row");
    },
    showAllArticle:function(){
      $(".articleBox").addClass("showBtn");
      $(".printPs").addClass("showBtn");
    },
    showCommonBox:function(){
      this.state2='';
      $(".mask2").addClass("showBtn");
      $(".mask1").removeClass("showBtn");
    },
    psPeople:function(){
      if(!this.psDisabled){
        $(".peopleBox").addClass("showBtn");
        $(".printPs").removeClass("showBtn");
        $(".mask2").addClass("showBtn");
        $(".mask1").removeClass("showBtn");
      }
    },
    solvePeople:function(){
      if(!this.clDisabled){
        $(".multiBox").addClass("showBtn");
        $(".printPs").removeClass("showBtn");
        $(".mask2").addClass("showBtn");
        $(".mask1").removeClass("showBtn");
      }
    },
    addPs:function(){
      var formData = new FormData();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  mounted() {
    var quill = new Quill('#editor_new', {
      modules: {
        toolbar: '#toolbar_new',
      },
      theme: 'snow'
    });
    // tinymce.init(obj);
    // editor.render();
    // tinymce.get('tinymce').setContent('请发展规划处等抓紧时间研究国家双一流方案的细则，特别是教育部有关部门的解读（如批示是由纸质材料批示，则由数据与信息中心发起流程并人工输入）');
  },
  created(){
    // tinymce.remove('textarea'); 
    // tinymce.init(obj);
  }
}
  // var obj={
  //     selector: '#tinymce_new',
  //     height: 200,
  //     theme: 'modern',
  //     language: 'zh_CN',
  //     menubar: false,
  //     plugins: [
  //         'advlist autolink lists link image charmap print preview hr anchor pagebreak',
  //         // 'searchreplace wordcount visualblocks visualchars code fullscreen',dsd
  //         'insertdatetime media nonbreaking save table contextmenu directionality',
  //         'emoticons template paste textcolor colorpicker textpattern imagetools'
  //     ],
  //     toolbar1: 'insertfile undo redo | fontsizeselect styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image print | preview',
  //     // toolbar2: 'print preview media | forecolor backcolor | example',
  //     setup: function(ed) {
  //     },
  //     fontsize_formats: "12px 14px 18px 24px 36px 48px 60px 72px 84px 96px 108px 120px",
  //     image_advtab: true,
  //     relative_url: false,
  //     templates: [
  //         { title: 'Test template 1', content: 'Test 1' },
  //         { title: 'Test template 2', content: 'Test 2' }
  //     ],
  //     content_css: [
  //         './static/css/tinymce.css'
  //     ],
  //     file_browser_callback: function(field_name, url, type, win) {
  //         if(type=='image') 
  //         {
  //             $('#my_form').click();
  //             $("#my_form").on("change", function(e){
  //                 type_arr=[];
  //                 var file = e.target.files; //获取图片资源
  //                 for(var i=0; i< file.length; i++){
  //                     var formData = new FormData();  
  //                     formData.append("file" , file[i]);
  //                     $.when(getImgUrl(formData)).done(function(data){
  //                         if(data.state==0){
  //                             var order=data.order;
  //                             var photo_=order[0].file;
  //                             win.document.getElementById(field_name).value = photo_;
  //                         }
  //                     })
  //                 }
  //             });
  //         };

  //     },
  //   }
  // var editor =  new tinymce.Editor('tinymce_new',obj, tinymce.EditorManager);
</script>
<style lang="less" scoped>
.psBox{
  .el-button--small{
    padding:0;
    span{
    }
  }
  .el-upload-list{
    display:none;
  }
}
</style>