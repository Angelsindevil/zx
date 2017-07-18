<template>
  <div class="mesDetailBox alertStyle">
    <div class="alertTop">消息详情<span @click="hideMesBox"><img src="../../static/img/cancel.png"></span></div>
    <div class="alertContent">
      <div class="contentTop">
        <p class="mesTitle">{{filterData.title}}</p>
        <p><span>发送人：<span>{{filterData.sender}}</span></span><span>接收时间：<span>{{filterData.receiveTime}}</span></span></p>
      </div>
      <div class="contentBottom">
        {{filterData.content}}
      </div>
    </div>
    <div class="alertBottom">
      <span class="rightBot">
        <span class="bg_green" @click="hideMesBox">确定</span> 
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
        state2:'',
        isSelect:false,
        tableData:{
          title:'#海外动态#  今日更新文章30篇！可点击海外动态进行查看！',
          sender:'admin',
          date:'2016-11-24 08:52',
          content:'今天上午，湖南省科协第十次全省代表大会闭幕。会议中《湖南省科协事业发展“十三五”规划纲要》（下称《规划》',
        },
        // filterData:{
        //   title:'',
        //   sender:'',
        //   date:'',
        //   content:'',
        // },
        filterData:{},
        userId:'',
        userSource:{},
        // url:'http://192.168.2.129:9000',
        url:'', 
      }
    },
    computed: {
      ...mapGetters({
        mesId: 'mesId',
      })
    },
    watch:{
      mesId:{
        handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
          console.log(val);//用来渲染从文章列表或者文章详情点击进入的批示弹窗 选取文章的时候 事先渲染选中值
          var that=this;
          if(val!=""){
            $.when(messageDetail(val)).done(function(data){
              if(data.state=="0"){
                that.filterData=data.data;
                that.getMesRed();
              }
              else{
                alert(data.data);
              }
            })
          }
        },
        deep:true,
        immediate: true,
      },
    },
    methods:{
      hideMesBox:function(){
        this.filterData.title="";
        this.filterData.sender="";
        this.filterData.date="";
        this.filterData.content=""; 
        $(".mask1,.mesDetailBox").removeClass("showBtn");
      },
      getMesRed(){
        var that=this;
        $.ajax({
          url: that.url+"/api/message/messageCount",
          type: "get",
          // contentType: "application/json;",
          // data:JSON.stringify({
          //     "userId":that.userid,
          // }),
          data:{
            "userId":that.userId,
          },
          success:function(data){
            if(data.state=="0"){
              if(data.data==0){
                // $(that.$refs.redMes).children('span').hide();
              }
              else{
                console.log("11");
                if(data.data>30){
                  // that.xtNum='...';
                }
                else{
                  // that.xtNum=data.data;
                }
                // that.xtNum=data.data;
              }
              that.$store.dispatch('changeMesCount',{"mesCount":data.data}).then(function(resp){});
            }
            else{
              alert(data.data);
            }
          }
        });
      },
    },
    mounted(){
    },
    created(){
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
      // this.filterData=this.tableData;
      // $.when(messageDetail()).done(function(data){
      //   if(data.state=="0"){
      //   }
      //   else{
      //     alert(data.data);
      //   }
      // })
    }
  }
</script>
<style lang="less">
.mesDetailBox{
  .alertContent{
    height: 375px;
    overflow: auto;
    border-bottom: 1px solid #e4e4e4
  }
  .contentTop{
    margin-top:10px;
    padding-bottom:15px;
    border-bottom:1px solid #ccc;
    p{
      text-align: center;
    }
    >p:first-child{
      font-size: 16px;
      font-weight: 500;
      color:#333;
    }
    >p:nth-child(2n){
      margin-top:20px;
      font-size: 12px;
      color:#868686;
      >span{
        margin-right:30px;
        margin-left:30px;
      }
    }
  }
  .contentBottom{
    padding:20px 0;
    font-size: 14px;
    color:#333;
    text-indent: 2em;
    line-height: 25px;
  }
}
</style>