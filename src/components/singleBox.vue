<template>
  <!-- 批示人选择弹窗 -->
  <div class="singleBox alertStyle">
    <div class="alertTop"><span>{{titleName}}</span><span @click="hideArtBox"><img src="../../static/img/cancel.png"></span></div>
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
        @row-click="handleTableCurrentChange"
        style="width: 100%">
        <el-table-column
          label="选择"
          width="20%"
          >
          <template scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.row.radio"  :data-id="scope.row.id"></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          :label="labeltext"
          width="80%">
        </el-table-column>
      </el-table>
    </div>
    <div class="alertBottom">
      <span class="rightBot">
        <span class="bg_green" @click="hideArtBox(),submit()">确定</span> 
        <span @click="hideArtBox" class="bg_cancle">取消</span>    
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
        input2:'',//这个值是其他模块的值，用vuex
        radio: 0,
        state2:'',
        isSelect:false,
        titleName:'批示人选择',
        phtext:'请输入批示人名字',
        labeltext:'用户姓名',
        // restaurants: [],
        commonData:[],
        pageNo:1,
        alltableData: [
          {
            value: '里斯',
            radio:0,
            id:'01',
          }, {
            value: '章三',
            radio:1,
            id:'02',
          }, {
            value: '章四',
            radio:2,
            id:'03',
          }, {
            value: '双双',
            radio:3,
            id:'04',
          },
          {
            value: '王五',
            radio:4,
            id:'05',
          },
        ],
        tableData:[],
        singleObj:{
          value:'',
          id:'',
        },
        // currentRow:'国家“111计划”基地5年评估一次，运行良好可滚动支持',
        currentRow:'',
        userid:'',
        method:'全部内容',
        type:'全部内容',
        // userSource:{},
        // userid:'',
      }
    },
    computed: {
      ...mapGetters({
        multiBrush:'multiBrush',
      })
    },
    watch:{
      multiBrush:{
        handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
          if(val.flag){
            this.getCurrentUser();
          }
        },
        deep:true,
        immediate: true,
      },
    },
    methods:{
      hideArtBox:function(){
        $(".mask2,.singleBox").removeClass("showBtn");
        $(".mask1").addClass("showBtn");
        this.$store.dispatch('getNewUser',{'flag':false,'type':''}).then(function(resp){});
        // this.$store.dispatch('getNewArt',false).then(function(resp){});
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
      handleSelect(item) {
        // var el=event.currentTarget;
        for (var i=0;i<this.commonData.length;i++) {
          if(this.commonData[i].value==item.value){
            if(this.isSelect){
              this.commonSelHandler('.multiBox',i,item);
            }
            else{
              this.commonSelHandler('.singleBox',i,item);
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
          this.input2=item.value;
          // this.radio2=this.radio;
        }
        var height=$(selector).find(".article_table tbody").children("tr").eq(i).position().top;
        $(selector).find(".alertContent .el-table__body-wrapper").scrollTop(height)
      },
      handleTableCurrentChange(val){//点击具体表格中的条目
        console.log("哈哈哈哈哈");
        if(val){
          if(this.commonData==this.alltableData){
            this.currentRow=val.value;
            // this.radio1=val.i;
          }
          else if(!this.isSelect){
            this.input2=val.value;
            // this.radio2=val.i;
          }
          this.radio=val.radio;
          // this.singleObj=val;
          this.singleObj={
            value:val.value,
            // radio:val.i,
            id:val.id,
            // flag:'0',
          }
        }
      },
      handlePreData:function(val1){
        for (var i=0;i<val1.length;i++) {
          val1[i].i=i;
        }
        // var val2=val1.slice(0,6);
        // return val2;
        return val1;
      },
      submit(){
        this.$store.dispatch('changeSingleObj',{singleObj:this.singleObj}).then(function(resp){});
      },
      getCurrentUser(){
        var that=this;
        this.commonData.splice(0);
        $.when(getAllUsers()).done(function(data){
          if(data.state=="0"){
            var res=data.data;
            that.commonData=res.map(function(value,index){
              return {
                value:value.username,
                radio:index,
                id:value.id,
              }
            })
            that.currentRow=that.commonData[0].value;
            that.singleObj.value=that.commonData[0].value;
            that.singleObj.id=that.commonData[0].id;
            that.radio=0;
            that.singleObj={
              value:that.commonData[0].value,
              // radio:val.i,
              id:that.commonData[0].id,
              // flag:'0',
            }
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
    },
    mounted() {

      // this.commonData=this.handlePreData(this.alltableData);//测试

      // var that=this;
      // $.when(getAllUsers()).done(function(data){
      //   if(data.state=="0"){
      //     var res=data.data;
      //     that.commonData=res.map(function(value,index){
      //       return {
      //         value:value.username,
      //         radio:index,
      //         id:value.id,
      //       }
      //     })
      //     that.currentRow=that.commonData[0].value;
      //     that.singleObj.value=that.commonData[0].value;
      //     that.singleObj.id=that.commonData[0].id;
      //   }
      //   else if(data.state=='9000'){
      //     // alert("用户未登录！")
      //     that.$router.push({path:'/login',query: {}});
      //   }
      //   else{
      //     alert(data.data);
      //   }
      // })
      this.getCurrentUser();
    }

  }
</script>
<style lang="less">
  .singleBox{
    z-index:5;
  }
</style>