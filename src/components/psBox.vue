<template>
  <div class="psBox alertStyle  alertStyle_">
    <div class="alertTop">{{alertTips}}<span @click="hidePSBox"><img src="../../static/img/cancel.png"></span></div>
    <div class="alertContent">
      <el-button class="article_btn" @click="showAllArticle"><img src="../../static/img/report.png" alt="">批示文章：<span class="ellipsis titleEll">{{currentRow}}</span></el-button>
      <div class="editContainer">
        <p class="ptitle">{{ptitle}}</p>
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
          <el-select v-model="value" placeholder="请选择" class="typeChoose" :disabled="disabled_tp">
            <el-option
              v-for="item in typeOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <!-- <el-col :span="6"><div class="grid-content bg-purple-light" @click="solveSinglePeople">
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
          <span class="typeLabel">{{peopleTips}}：</span>
          <el-input
            placeholder="请选择"
            icon="menu"
            v-model="input3"
            class="typeChoose_"
            :disabled="clDisabled"
            >
          </el-input>
        </div></el-col> -->
        <el-col :span="6" v-if="alertType=='0'"><div class="grid-content bg-purple-light" @click="solveSinglePeople">
          <span class="typeLabel">{{psPerson}}</span>
          <el-input
            placeholder="请选择"
            icon="menu"
            v-model="input2"
            class="typeChoose_"
            :disabled="psDisabled"
            >
          </el-input>
        </div></el-col>
        <el-col :span="6" v-else><div class="grid-content bg-purple" @click="solvePeople">
          <span class="typeLabel">{{psPerson}}：</span>
          <el-input
            placeholder="请选择"
            icon="menu"
            v-model="input3"
            class="typeChoose_"
            :disabled="clDisabled"
            >
          </el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
          <span class="typeLabel">{{psTime}}：</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            class="typeChoose_ dateChoose"
           >
          </el-date-picker>
        </div></el-col>
      </el-row>
    </div>
    <div class="alertBottom">
      <span class="leftBot">
        <span class="blueBot"><img src="../../static/img/link.png" alt=""><input type="file" name="" class="file_" @change="linkChange">上传附件</span>
        <!-- <span class="linkBot" ref="linkBot"><span style='font-size:12px;margin:0'>{{linkName}}</span></span> -->
        <span class="linkBot" ref="linkBot">{{linkName}}</span>
      </span>
      <span class="rightBot">
        <span class="bg_green" @click="addPs()">确定</span> 
        <!-- <span class="bg_blue printPs"><img src="../../static/img/print.png" alt="">打印批示</span>  -->
        <span @click="hidePSBox" class="bg_cancle">取消</span> 
      </span>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
    return {
      // typeOptions:[
      // {value:'0',
      // label:'批示'},
      // {value:'1',
      // label:'分发'},
      // {value:'2',
      // label:'反馈'},
      // ],
      typeOptions:[
      {value:'0',
      label:'它山之石'},
      {value:'1',
      label:'网络舆情'},
      ],
      value:'0',
      input2:'',
      input3:'',
      psDisabled:false,
      clDisabled:false,
      currentRow:'',
      linkName:'',
      file:'',
      articleId:'',
      instructionId:'',
      quill:'',
      psObj:[],
      clrArr:[],
      fileFlag:false,
      userSource:{},
      level:'',//权限 一开始就存下来的 登录的时候
      userId:'',
      userName:'',//想一想 先存哪里去 登录的时候
      psId:'',
      // url:'http://192.168.2.108:9000',
      url:'',
      peopleTips:'处理人',

      alertTips:'批示',
      psPerson:'批示人',
      psTime:'批示时间',
      date:'',
      disabled_tp:false,
      alertType:'',
      ptitle:'输入批示内容',
      artChoose:true,
    }
  },
  computed: {
    ...mapGetters({
      selectArr: 'selectArr',
      peopleObj:'peopleObj',
      articleObj:'articleObj',
      singleObj:'singleObj',
      psBox:'psBox',
      psShow:'psShow',
    })
  },
  watch:{
    // newArcticle:{
    //   handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化

    //   },
    //   deep:true,
    //   immediate: true,
    // },
    selectArr:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        // for (var i=0;i<val.length;i++) {
        //   this.input3+=val[i]+' ';
        // }
        if(val.name.length<2){//待测试
          this.input3=val.name[0];
        }
        else{
          this.input3=val.name[0]+'...';
        }
      },
      deep:true,
      immediate: true,
    },
    peopleObj:{
      handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
        if(val.value!=undefined){
          this.input2=val.value;
          this.psId=val.id;
        }
      },
      deep:true,
      immediate: true,
    },
    psShow:{
      handler: function (val, oldVal) {//用于判断由文章列表或者文章详情点入的还是在批示那边新建批示流程
        // this.quill.setContents('');
        if(Object.keys(val).length!=0){//不为空对象，由文章列表或者文章详情点入
          this.currentRow=val.value;
          this.articleId=val.id;//需要有，当未点击打开文章的时候，需要有直接的id
          this.artChoose=false;
        }
        else{
          this.artChoose=true;
          this.currentRow="";
          this.articleId="";//需要有，当未点击打开文章的时候，需要有直接的id
        }
      },
      deep:true,
      immediate: true,
    },
    articleObj:{
      handler: function (val, oldVal) {//文章选择后，相应的渲染
        if(this.alertType=="0"){//分发和反馈的值应该是后台传过来的
          if(val.flag=='0'){

          }
          this.currentRow=val.value;
          this.articleId=val.id;
        }
        else{
        }
      },
      deep:true,
      immediate: true,
    },
    singleObj:{
      handler: function (val, oldVal) {//批示人选择后 相应渲染
        if(val.value!=undefined){
          if(this.level=='0'||this.level=='4'){//权限为管理员 批示人可选
            this.input2=val.value;
            this.psId=val.id;
          }
          else{}
        }
      },
      deep:true,
      immediate: true,
    },
    psBox:{
      handler: function (val, oldVal) {//
        if(val.flag){
          if(val.psType=='0'){//批示管理新增
            this.currentRow="";
            this.articleId="";
          }
          else{}
          this.date="";
          if(val.psObj==undefined){
            this.psObj=["系统管理员","d733ed4b5afd11e79ea400269e28ab11"];
          }
          else{
            this.psObj=val.psObj;//先名字 后id 有用
          }
          this.artChoose=true;
          this.instructionId=val.instructionId;
          // this.value=val.type;

          // this.psDisabled=true;//判断不是系统管理员
          this.alertType=val.type;
          if(val.type=='0'){//批示弹窗
            this.peopleTips='处理人';
            this.$nextTick(function(){
              $(".blueBot").show();
            })
            if(this.level=='0'||this.level=='4'){//权限为管理员 分发处理人可选
              this.psDisabled=false;
              this.clDisabled=false;
              this.input2="";
              this.input3="";
            }
            else{
              this.psDisabled=true;
              this.clDisabled=true;
              this.input2=this.userName;
              this.input3=this.userName;
            }
            // this.psDisabled=false;

            // this.input3=this.userName;

            this.psPerson="批示人";
            this.psTime="批示时间";
            this.alertTips="批示";
            this.disabled_tp=false;
            this.ptitle="输入批示内容";
            // tinymce.get('tinymce').setContent('<p style="line-height:2">请发展规划处等抓紧时间研究国家双一流方案的细则和教育部有关部门的解读<br><span style="color:#FF6600">（如批示是由纸质材料批示，则由数据与信息中心发起流程并人工输入）</span></p>');
          }
          else if(val.type=='1'){//分发弹窗
            if(val.insType!=undefined){
              this.value=val.insType;
            }
            this.peopleTips='分发人';
            this.currentRow=val.title;
            if(this.level=='0'||this.level=='4'){//权限为管理员 分发处理人可选
              this.clDisabled=false;
              // this.input3=this.psObj[0];//弹窗不可点击。 有用
              this.input3="";
            }
            else{}
            this.$nextTick(function(){
              $(".blueBot").hide();
            })
            // this.psDisabled=true;
            // this.input3="";
            // this.input2=this.psObj[0];//弹窗不可点击。 有用

            this.psPerson="转办";
            this.psTime="转办时间";
            this.alertTips="转办";
            this.disabled_tp=true;
            this.ptitle="输入转办内容";
          }
          else if(val.type=='2'){//反馈弹窗
            this.ptitle="输入反馈内容";
            if(val.insType!=undefined){
              this.value=val.insType;
            }

            if(this.level=='0'||this.level=='4'){//权限为管理员 分发处理人可选
              this.clDisabled=false;
              this.input3="";
              // this.input3=this.psObj[0];//弹窗不可点击。 有用
            }
            else{
              this.clDisabled=true;
              this.input3=this.userName;
            }

            this.peopleTips='反馈人';
            this.currentRow=val.title;
            // if(this.level=='0'||this.level=='4'){//权限为管理员 反馈处理人可选
              // this.clDisabled=true;
              // this.psDisabled=true;

              // this.input3=this.userName;

              this.input2=this.psObj[0];//弹窗不可点击。 有用
              // this.input3=this.userName;
            // }
            this.$nextTick(function(){
              $(".blueBot").show();
            })

            this.psPerson="反馈人";
            this.psTime="反馈时间";
            this.alertTips="反馈";
            this.disabled_tp=true;
          }
          else{
          }
        }
      },
      deep:true,
      immediate: true,
    },
  },
  methods:{
    getpsRed(){
      var that=this;
      $.ajax({
        url: that.url+"/api/article/instructionChangeMark",
        type: "post",
        contentType: "application/json;",
        data:JSON.stringify({
            "userId":that.userId,
        }),
        success:function(data){
          if(data.state=="0"){
            if(data.data==0){
            }
            else{
            }
            that.$store.dispatch('changepsCount',{"psCount":data.data}).then(function(resp){});
          }
          else{
            alert(data.data);
          }
        }
      });
    },
    openWarn(str) {
      this.$message({
        message: str,
        type: 'warning'
      });
    },
    open(str) {
      this.$message({
        message: str,
        iconClass:'el-icon-check',
      });
    },
    hidePSBox:function(){
      var that=this;
      $(".mask1,.psBox").removeClass("showBtn");
      $("body").css("overflow","auto");
      // $(".psBox").removeClass("alertStyle_");
      // $(".el-row").removeClass("show_row");
      that.fileFlag=false;
      that.quill.setText('');
      $(that.$refs.linkBot).text("");
      that.$store.dispatch('changeAlertBox',{'flag':false}).then(function(resp){});
    },
    showAllArticle:function(){
      if(this.alertType=='0'){
        if(this.artChoose){
          $(".articleBox").addClass("showBtn");
          $(".printPs").addClass("showBtn");
          $(".mask2").addClass("showBtn");
          $(".mask1").removeClass("showBtn");
          this.$store.dispatch('getNewArt',true).then(function(resp){});
        }
      }
      else{}
    },
    showCommonBox:function(){
      $(".mask2").addClass("showBtn");
      $(".mask1").removeClass("showBtn");
    },
    psPeople:function(){//暂时不需要
      if(!this.psDisabled){
        $(".peopleBox").addClass("showBtn");
        $(".printPs").removeClass("showBtn");
        $(".mask2").addClass("showBtn");
        $(".mask1").removeClass("showBtn");
      }
    },
    solvePeople:function(){//处理人弹窗  反馈还是分发
      if(this.level=="0"||this.level=='4'){//系统管理员无论反馈和分发 都弹窗 而且都默认选中自己
        if(this.alertType=='1'||this.alertType=='2'){//分发
          this.$store.dispatch('getNewUser',{
            'flag':false,
            'type':this.alertType
          }).then(function(resp){});
          $(".multiBox").addClass("showBtn");
          $(".printPs").removeClass("showBtn");
          $(".mask2").addClass("showBtn");
          $(".mask1").removeClass("showBtn");
        }
        else{}
      }
      else{}

      // this.$store.dispatch('changeClearAll',{clearAll:[]}).then(function(resp){});
      // $(".multiBox").addClass("showBtn");
      // $(".printPs").removeClass("showBtn");
      // $(".mask2").addClass("showBtn");
      // $(".mask1").removeClass("showBtn");

      // if(!this.clDisabled){
      //   $(".multiBox").addClass("showBtn");
      //   $(".printPs").removeClass("showBtn");
      //   $(".mask2").addClass("showBtn");
      //   $(".mask1").removeClass("showBtn");
      // }
    },
    solveSinglePeople:function(){//批示人弹窗
      $(".singleBox").addClass("showBtn");
      $(".mask2").addClass("showBtn");
      $(".mask1").removeClass("showBtn");
    },
    addPs:function(){ //新增批示 分发 反馈方法
      var formData = new FormData();
      var that=this;
      if(this.file!=''&&this.fileFlag){
        formData.append("file",this.file);
        formData.append("title",this.linkName);
      }
      else{
        formData.append("file",'');
      }
      // if(this.instructionId!=""){
      //   formData.append("instructionId",this.instructionId);
      // }
      var delta =this.quill.getText();
      formData.append("content",delta);
      formData.append("time",this.date);
      formData.append("insType",this.value);
      // formData.append("userId",this.userId);//或许还有用吧

      if(this.alertType=='0'){//批示
        // formData.append("insType",this.value);
        
        // formData.append("userId",this.userId);
        formData.append("type",'0');
        formData.append("articleId",this.articleId);
        if(this.level=='0'||this.level=='4'){
          formData.append("userId",this.psId);
        }
        else{
          formData.append("userId",this.userId);
        }        
        if(delta.length==1){
          // alert("请输入批示内容！");
          this.openWarn("请输入批示内容！",'warning');
        }
        else if(this.date==""){
          this.openWarn("请选择批示时间！");
        }
        else{
          $.when(addInstruction(formData)).done(function(data){
            if(data.state=='0'){
              // alert("新增批示成功！");
              that.open("新增批示成功！",'success');
              that.getpsRed();
              $(".mask1,.psBox").removeClass("showBtn");
              $("body").css("overflow","auto");
              // $(".psBox").removeClass("alertStyle_");
              // $(".el-row").removeClass("show_row");
              $(that.$refs.linkBot).text("");
              that.fileFlag=false;
              that.quill.setText('');
              that.$store.dispatch('changeAlertBox',{'flag':false}).then(function(resp){});
              that.$store.dispatch('changeClearAll',{clearAll:[]}).then(function(resp){});
              that.$store.dispatch('changeSingleObj',{singleObj:{value:'',id:''}}).then(function(resp){});
              that.$store.dispatch('changepsFlag',true).then(function(resp){});
              // window.location.reload();
            }
            else{
              alert(data.data);
              // that.fileFlag=false;
              // that.quill.setText('');
              // $(that.$refs.linkBot).text("");
            }
          })
        }
      }
      else if(this.alertType=='1'){//分发
        formData.append("userId",this.userId);
        formData.append("type",'1');
        formData.append("psPeople",this.psObj[1]);
        formData.append("instructionId",this.instructionId);
        formData.append("currentPeople",this.userId);
        if(this.selectArr.id&&this.selectArr.id.length>0){
          formData.append("clPeople",this.selectArr.id);
          if(delta.length==1){
            // alert("请输入分发内容！");
            this.openWarn("请输入转办内容！",'warning');
          }
          else if(this.date==""){
            this.openWarn("请选择转办时间！");
          }
          else{
            $.when(addFeedback(formData)).done(function(data){
              if(data.state=='0'){
                // alert("新增分发成功！");
                that.open("新增转办成功！",'success');
                $(".mask1,.psBox").removeClass("showBtn");
                // $(".psBox").removeClass("alertStyle_");
                // $(".el-row").removeClass("show_row");
                that.fileFlag=false;
                that.quill.setText('');
                $(that.$refs.linkBot).text("");
                // that.fileFlag=false;
                // that.quill.setText('');
                // $(that.$refs.linkBot).text("");
                that.$store.dispatch('changeAlertBox',{'flag':false}).then(function(resp){});
                that.$store.dispatch('changeClearAll',{clearAll:[]}).then(function(resp){});
                that.$store.dispatch('changeSelArr',{selectArr:{name:[],id:[]}}).then(function(resp){});
                that.$store.dispatch('changepsDetailFlag',true).then(function(resp){});
                // window.location.reload();
              }
              else{
                alert(data.data);
                // that.fileFlag=false;
                // that.quill.setText('');
                // $(that.$refs.linkBot).text("");
              }
            })
          }
        }
        else{
          this.openWarn("还未选择处理人",'warning');
          // alert("还未选择处理人");
        }
      }
      else if(this.alertType=='2'){// 反馈
        formData.append("userId",this.userId);
        formData.append("type",'2');
        formData.append("psPeople",this.psObj[1]);
        formData.append("instructionId",this.instructionId);
        if(this.level=='0'||this.level=='4'){
          if(this.selectArr.id&&this.selectArr.id.length>0){
            formData.append("clPeople",this.selectArr.id);
          }
          else{
            this.openWarn("还未选择反馈人",'warning');
          }
        }
        else{
          formData.append("clPeople",this.userId);
        }        
        if(delta.length==1){
          // alert("请输入反馈内容！");
          this.openWarn("请输入反馈内容！",'warning');
        }
        else if(this.date==""){
          this.openWarn("请选择反馈时间！");
        }
        else{
          $.when(addFeedback(formData)).done(function(data){
            if(data.state=='0'){
              // alert("新增反馈成功！");
              that.open("新增反馈成功！",'success');
              $(".mask1,.psBox").removeClass("showBtn");
              // $(".psBox").removeClass("alertStyle_");
              // $(".el-row").removeClass("show_row");
              that.fileFlag=false;
              that.quill.setText('');
              $(that.$refs.linkBot).text("");
              that.$store.dispatch('changeAlertBox',{'flag':false}).then(function(resp){});
              that.$store.dispatch('changeClearAll',{clearAll:[]}).then(function(resp){});
              that.$store.dispatch('changeSelArr',{selectArr:{name:[],id:[]}}).then(function(resp){});
              that.$store.dispatch('changepsDetailFlag',true).then(function(resp){});
              // window.location.reload();
            }
            else{
              alert(data.data);
            }
          })
        }
      }
      else{}
    },
    linkChange:function(e){
      var file = e.target.files; //获取图片资源
      if(file[0]){
        this.fileFlag=true;
        this.file=file[0];
        this.linkName=file[0].name;
        $(this.$refs.linkBot).text(file[0].name);
      }
    }
  },
  mounted() {
    this.quill = new Quill('#editor_new', {
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
    // this.instructionId = this.$route.query.id;
    // tinymce.remove('textarea'); 
    // tinymce.init(obj);    
    this.userSource=JSON.parse(localStorage.getItem("userSource"));
    this.level=this.userSource?this.userSource.level:'';
    this.userId=this.userSource?this.userSource.id:'';
    this.userName=this.userSource?this.userSource.username:'';
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
<style lang="less">
.psBox{
  .titleEll{
    display: inline-block;
    width: 80%;
    vertical-align: middle;
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
  .ql-editor{
    height:250px!important;
  }
  .dateChoose{
    padding-left:70px;
  }
}

</style>