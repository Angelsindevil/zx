<template>
  <!-- word弹窗 -->
	<div class="wordBox alertStyle">
    <span @click="hideUserBox"><img src="../../static/img/cancel_new.png"></span>
    <a @click="hideUserBox" :href="link" target="blank" class="linka">
      <img src="../../static/img/word_new.png" alt="">
      <span>{{filename}}</span>
    </a>  
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        filename:'',
        link:'',
      }
    },
    computed: {
      ...mapGetters({
        wordObj: 'wordObj',
      })
    },
    watch:{
      wordObj:{
        handler: function (val, oldVal) {
          // if(Object.keys(val).length!=0){
          if(val&&val.length!=0){
            this.filename=val.name;
            this.link=val.link;
          }
        },
        deep:true,
        immediate: true,
      },
    },
    methods:{
      // downloadEvent(){
      //   $(".mask2,.wordBox").removeClass("showBtn");
      //   $(".mask1").addClass("showBtn");
      // }
      hideUserBox:function(){
        $(".mask2,.wordBox").removeClass("showBtn");
        $(".mask1").addClass("showBtn");
      },
    },
    mounted() {
    },
    created(){
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userId=this.userSource?this.userSource.id:'';
    }
  }
</script>
<style lang="less">
  .wordBox{
    background-color: transparent;
    z-index:5;
    width:150px;
    height:140px;
    margin-top:-70px;
    margin-left:-75px;
    >span{
      img{
        cursor: pointer;
        display:block;
        width:20px;
        height:20px;
        position: absolute;
        right:-20px;
        top:-5px;
      }
    }
    .linka{
      display:block;
      text-align: center;
      img{
        display: block;
        width:120px;
        height:120px;
        margin:auto;
        margin-bottom:5px;
      }
      span{
        font-size: 16px;
        // text-align: center;
      }
    }
  }
</style>