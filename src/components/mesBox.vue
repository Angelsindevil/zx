<template>
  <!-- 新增消息弹窗 -->
  <div class="mesBox alertStyle">
    <div class="alertTop">新增消息<span @click="hideMesBox"><img src="../../static/img/cancel.png"></span></div>
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
      <span class="rightBot">
        <span class="bg_green" @click="addMes">确定</span> 
        <span @click="cancelMes" class="bg_cancle">取消</span> 
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
          title: '',
          area: '',
          accept: '',
          send: '',
        },
        userId:'',
        userSource:{},
      }
    },
    computed: {
      ...mapGetters({
        selectArr: 'selectArr',
      })
    },
    watch:{
      selectArr:{
        handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
          if(val&&val.name.length<2){
            this.form.accept=val.name[0];
          }
          else{
            this.form.accept=val.name[0]+'...';
          }
        },
        deep:true,
        immediate: true,
      },
      // mesObj:{
      //   handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
      //     console.log(val);
      //     if(val){
      //       console.log('change');
      //       this.form.title=val.title;
      //       this.form.area=val.area;
      //       this.form.accept=val.accept;
      //       // this.form.send=val.send;
      //     }
      //   },
      //   deep:true,
      //   immediate: true,
      // },
    },
    methods:{
      hideMesBox:function(){
        $(".mask1,.mesBox").removeClass("showBtn");
      },
      showCommonBox:function(){
        $(".mask2").addClass("showBtn");
        $(".mask1").removeClass("showBtn");
      },
      solvePeople:function(){
        var that=this;
        that.$store.dispatch('changeSelArr',{selectArr:{name:[],id:[]}}).then(function(resp){});
        $(".multiBox").addClass("showBtn");
        $(".printPs").removeClass("showBtn");
      },
      cancelMes(){
        if(this.form.title!=""||this.form.content!=""||this.form.send!=""||idArr.length!=0){
          if(confirm("消息未发送，确定要关闭消息发送界面吗")){
            $(".mask1,.mesBox").removeClass("showBtn");
            this.form.title="";
            this.form.area="";
            this.form.accept="";
          }
        }
        else{
          $(".mask1,.mesBox").removeClass("showBtn");
        }

      },
      addMes(){
        var idArr=[];
        // this.$store.dispatch('changeMesInfo',{mesObj:this.form}).then(function(resp){});
        if(this.selectArr.id&&this.selectArr.id.length>0){
          idArr=this.selectArr.id;
        }
        else{
        }
        if(this.form.title==""){
          alert("请输入消息标题！");
        }
        else if(this.form.content==""){
          alert("请输入消息内容！");
        }
        else if(this.form.send==""){
          alert("发送人不能为空！")
        }
        else if(idArr.length==0){
          alert("还未选择接受人！");
        }
        else{
          $.when(addMes(this.userId,this.form.title,this.form.area,idArr,this.form.send)).done(function(data){
            if(data.state=='0'){
              $(".mask1,.mesBox").removeClass("showBtn");
              alert("新增系统消息成功！");
              window.location.reload();
              that.$store.dispatch('changeSelArr',{selectArr:{name:[],id:[]}}).then(function(resp){});
              that.form.title="";
              that.form.area="";
              that.form.accept="";
              // that.$store.dispatch('changeMesInfo',{mesObj:that.form}).then(function(resp){});
            }
            else{
              alert(data.data);
            }
          })
        }
      },
    },
    mounted() {
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
      this.form.send=this.userSource?this.userSource.username:'';
    }

  }
</script>