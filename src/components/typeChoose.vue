<template>
	<div class="typeBox alertStyle">
      <div class="alertTop">文章发布<span @click="hideUserBox"><img src="../../static/img/cancel.png"></span></div>
      <div class="alertContent">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-form-item  label="文章类别：">
              <el-select v-model="form.type" placeholder="" @change="optionChangeHandler" @visible-change="optionChangeHandler">
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <select v-model="form.type" class="type_sel">
                <option v-for="item in options"
                  :value="item.value">{{item.label}}</option>
              </select> -->
            </el-form-item>
        </el-row>
          <!-- 这应该是编辑的时候才有的字段 -->
        </el-form>
      </div>
      <div class="alertBottom">
	      <span class="rightBot">
	        <span class="bg_green" @click="releaseBtn">发布</span> 
        	<span @click="hideUserBox" class="bg_cancle">取消</span> 
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
        form: {
          type:'',
        },
        options:[
          {
            'label':'社会动态',
            'value':'1'
          },
          {
            'label':'校内信息',
            'value':'02'
          },
        ],
        userSource:'',
        userId:'',
        source:'',
        id:'',
        event_:'',
      }
    },
    computed: {
      ...mapGetters({
        releaseObj: 'releaseObj',
      })
    },
    watch:{
      releaseObj:{
        handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
          if(val.id!=undefined){
            this.id=val.id;
            this.form.type=val.type;
            this.event_=val.event;
            // var value=this.options.find(function(element){
            //   if(element.label==val.type){
            //     return element;
            //   }
            // },this);
            var val_=false;
            this.options.map(function(value,index){
              if(value.label==val.type){
                val_=true;
              }
            },this)
            if(val_){
              this.id=val.id;
              this.form.type=val.type;
              this.event_=val.event;
            }
            else{
              this.id=val.id;
              this.form.type=this.options[0].label;
              this.event_=val.event;
            }
          }
        },
        deep:true,
        immediate: true,
      },
    },
    methods:{
      open(str) {
        this.$message({
          message: str,
          iconClass:'el-icon-check',
        });
      },
      openWarn(str) {
        this.$message({
          message: str,
          type:'warning',
          // iconClass:'el-icon-check',
        }); 
      },
      releaseBtn(e){
        var that=this;
        var el=$(e.target).closest(".rightContent_");
        $.when(releaseArticle(this.id)).done(function(data){
          if(data.state=="0"){
            // alert("文章发布成功！");
            that.open("文章发布成功！");
            that.hideUserBox();
            that.$store.dispatch('changeArtFlag',true).then(function(resp){});
            that.$store.dispatch('changeArtEvent',that.event_).then(function(resp){});
            // window.location.reload();
          }
          else if(data.state=='9000'){
            // alert("用户未登录！")
            that.$router.push({path:'/login',query: {}});
          }
          else{
            alert(data.data);
          }
        })
        $.when(editArticleType(this.id,this.form.type)).done(function(data){
          if(data.state=="0"){
          }
          else if(data.state=='9000'){
            // alert("用户未登录！")
            that.$router.push({path:'/login',query: {}});
          }
          else{
            alert(data.data);
          }
        })
      },
      hideUserBox:function(){
        $(".mask1,.typeBox").removeClass("showBtn");
        $("body").css("overflow","auto");
      },
      optionChangeHandler(){
        this.$nextTick(function(){
          $(".el-select-dropdown").addClass('alert_fixed');
        })
      },
    },
    mounted(){
    },
    created(){
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
      this.source=JSON.parse(localStorage.getItem("editor"));
      var that=this;
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
          // if(that.id!=undefined&&that.source){
          //   that.form.type=that.source.type;
          // }
          // else{
            that.form.type=that.options[0].value;
          // }
        }
        else if(data.state=='9000'){
          // alert("用户未登录！")
          that.$router.push({path:'/login',query: {}});
        }
        else{
          alert(data.data);
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .typeBox{
    width:400px;
    height:200px;
    margin-top:-100px;
    margin-left:-200px;
    label{
      width:100px;
    }
    .el-select{
      width:95%;
    }
    .el-form-item__content{
      margin-left:100px;
    }
    .el-input{
      width:100%;
    }
    .type_sel{
      width: 250px;
      height: 30px;
      background: #fff;
      font-size: 14px;
      color:#333;
    }
  }
  .alert_fixed{
    // position: fixed!important;
  }
</style>