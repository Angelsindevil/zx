<template>
  <!-- 文章选择弹窗 -->
  <div class="articleBox alertStyle">
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
        titleName:'文章选择',
        phtext:'请输入文章标题',
        labeltext:'文章标题',
        // restaurants: [],
        commonData:[],
        pageNo:1,
        alltableData: [
          // {
          //   value: '国家“111计划”基地5年评估一次，运行良好可滚动支持',
          //   i:0,
          //   id:'01',
          // }, {
          //   value: '江苏省公布十三五期间重点学科名单，21所高校313个学科入选',
          //   i:1,
          //   id:'02',
          // }, {
          //   value: '山东大学实施学科高峰计划，未来五年50亿元投入学科建设',
          //   i:2,
          //   id:'03',
          // }, {
          //   value: '国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单',
          //   i:3,
          //   id:'04',
          // },
          // {
          //   value: '测试文章1',
          //   i:4,
          //   id:'05',
          // },
        ],
        tableData:[],
        articleObj:{
          value:'',
          id:'',
        },
        // currentRow:'国家“111计划”基地5年评估一次，运行良好可滚动支持',
        currentRow:'',
        userid:'',
        method:'全部内容',
        type:'全部内容',
        userSource:{},
        userid:'',
      }
    },
    computed: {
      ...mapGetters({
        newArcticle: 'newArcticle',
      })
    },
    watch:{
      newArcticle:{
        handler: function (val, oldVal) {//监听学校和指标数组，只要学科id没有变化，则不变化
          console.log(val);//用来渲染从文章列表或者文章详情点击进入的批示弹窗 选取文章的时候 事先渲染选中值
          this.radio=parseInt(val.radio);
          this.articleObj={
            value:val.value,
            id:val.id,
          }
        },
        deep:true,
        immediate: true,
      },
    },
    methods:{
      hideArtBox:function(){
        $(".mask2,.articleBox").removeClass("showBtn");
        $(".mask1").addClass("showBtn");
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
      handleTableCurrentChange(val){//点击具体表格中的条目
        console.log("11");
        console.log(val);
        if(val){
          if(this.commonData==this.alltableData){
            this.currentRow=val.value;
            // this.radio1=val.i;
          }
          else if(!this.isSelect){
            this.input2=val.value;
            // this.radio2=val.i;
          }
          this.radio=val.i;
          // this.articleObj=val;
          this.articleObj={
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
        this.$store.dispatch('changeArtObj',{articleObj:this.articleObj}).then(function(resp){});
      },
    },
    mounted() {
      // this.commonData=this.handlePreData(this.alltableData);
      var that=this;
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userid=this.userSource?this.userSource.id:'';
      $.when(getAllArticles(this.userid,this.method,this.type,this.pageNo)).done(function(data){
        if(data.state=="0"){
          var res=data.data;
          var list=res.list;
          that.commonData=list.map(function(value,index){
            return {
              value:value.title,
              radio:index,
              id:value.id,
            }
          })
          that.currentRow=that.commonData[0].value;
          that.articleObj.value=that.commonData[0].value;
          that.articleObj.id=that.commonData[0].id;
        }
        else{
          alert(data.data);
        }
      })
    }

  }
</script>