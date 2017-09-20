<template>
  <!-- 文章选择弹窗 -->
  <div class="articleBox alertStyle">
    <div class="alertTop"><span>{{titleName}}</span><span @click="hideArtBox"><img src="../../static/img/cancel.png"></span></div>
    <div class="alertContent">
      <!-- <el-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        :placeholder="phtext"
        :trigger-on-focus="false"
        @select="handleSelect"
      ><el-button slot="append" icon="search" @click="handleIconSelect"></el-button></el-autocomplete> -->
      <el-input
        placeholder="请输入文章标题"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
      <el-table
        class="article_table"
        :data="commonData"
        highlight-current-row
        @row-click="handleTableCurrentChange"
        @click.native="jump($event)"
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
      <p class="btn_position"><span @click="loadMore" ref="rightBottom" class="loadMoreStyle">加载更多</span></p>
      <!-- <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="totalItem"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>   -->
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
          {
            value: '国家“111计划”基地5年评估一次，运行良好可滚动支持',
            radio:0,
            id:'01',
          }, {
            value: '江苏省公布十三五期间重点学科名单，21所高校313个学科入选',
            radio:1,
            id:'02',
          }, {
            value: '山东大学实施学科高峰计划，未来五年50亿元投入学科建设',
            radio:2,
            id:'03',
          }, {
            value: '国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单',
            radio:3,
            id:'04',
          },
          {
            value: '测试文章1',
            radio:4,
            id:'05',
          },
          {
            value: '国家“111计划”基地5年评估一次，运行良好可滚动支持',
            radio:5,
            id:'01',
          }, {
            value: '江苏省公布十三五期间重点学科名单，21所高校313个学科入选',
            radio:6,
            id:'02',
          }, {
            value: '山东大学实施学科高峰计划，未来五年50亿元投入学科建设',
            radio:7,
            id:'03',
          }, {
            value: '国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单',
            radio:8,
            id:'04',
          },
          {
            value: '测试文章1',
            radio:9,
            id:'05',
          },
          {
            value: '国家“111计划”基地5年评估一次，运行良好可滚动支持',
            radio:10,
            id:'01',
          }, {
            value: '江苏省公布十三五期间重点学科名单，21所高校313个学科入选',
            radio:11,
            id:'02',
          }, {
            value: '山东大学实施学科高峰计划，未来五年50亿元投入学科建设',
            radio:12,
            id:'03',
          }, {
            value: '国家“双一流”实施方案正式出台，预计2017年上半年公布入围名单',
            radio:13,
            id:'04',
          },
          {
            value: '测试文章1',
            radio:14,
            id:'05',
          },
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
        input2:'',
        scroll: '',
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
          this.radio=val.radio;
          this.$nextTick(function(){
            $(".articleBox").find(".article_table tbody").children("tr").eq(val.radio).find(".el-radio__input").addClass("is-checked");
          })
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
      handleInputClick(){
        var that=this;
        $.when(searchArticle(that.input2,1,this.userid)).done(function(data){
          if(data.state=="0"){
            that.insertData(data); 
            $(".articleBox").find(".alertContent .el-table__body-wrapper").scrollTop(0);
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
      handleIconSelect(){
        for (var i=0;i<this.commonData.length;i++) {
          if(this.commonData[i].value==this.state2){
            // if(this.isSelect){
            //   this.commonSelHandler('.multiBox',i,item);
            // }
            // else{
            //   this.commonSelHandler('.articleBox',i,item);
            // }
            this.commonSelHandler('.articleBox',i,this.state2);
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
        $(selector).find(".alertContent .el-table__body-wrapper").scrollTop(height);
      },
      handleTableCurrentChange(val){//点击具体表格中的条目
        if(val){
          if(this.commonData==this.alltableData){
            this.currentRow=val.value;
            // this.radio1=val.i;
          }
          else if(!this.isSelect){
            this.input2=val.value;
            // this.radio2=val.i;
          }
          console.log(val);
          console.log(val.i);
          console.log(val.radio);
          this.radio=val.radio;
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
        var val2=val1.slice(0,9);
        return val2;
        // return val1;
      },
      submit(){
        this.$store.dispatch('changeArtObj',{articleObj:this.articleObj}).then(function(resp){});
      },
      insertData(data){
        var that=this;
        var res=data.data;
        var list=res.list;
        // that.commonData.splice(0);
        if(res.list&&res.list.length!=0){
          if(res.list.length<20){
            that.$nextTick(function(){
              // $(that.$refs.rightBottom).children('span').text('暂无更多');
              // $(that.$refs.rightBottom).children('i').hide();
              $(that.$refs.rightBottom).text("暂无更多");
            })
            if(that.pageNo==1){
              that.commonData=[];
            }
            else{}
          }
          else{
            that.$nextTick(function(){
              $(that.$refs.rightBottom).text("加载更多");
              // $(that.$refs.rightBottom).children('span').text('加载更多');
              // $(that.$refs.rightBottom).children('i').show();
            })
          }
          list.map(function(value,index){
            var val_item={
              value:value.title,
              radio:index+(that.pageNo-1)*20,
              id:value.id,
            }
            that.commonData.push(val_item);
            // return {
            //   value:value.title,
            //   radio:index,
            //   id:value.id,
            // }
          })
          if(that.commonData.length>0){
            that.currentRow=that.commonData[0].value;
            that.articleObj.value=that.commonData[0].value;
            that.articleObj.id=that.commonData[0].id;
          }
        }
        else{
          if(that.pageNo==1){//只一页
            that.$nextTick(function(){
              $(that.$refs.rightBottom).text("暂无文章");
              // $(that.$refs.rightBottom).children('span').text('暂无文章');
              // $(that.$refs.rightBottom).children('i').hide();
            })
            that.commonData=[];
          }
          else{//多余一页
            that.$nextTick(function(){
              $(that.$refs.rightBottom).text("暂无更多");
              // $(that.$refs.rightBottom).children('span').text('暂无更多');
              // $(that.$refs.rightBottom).children('i').hide();
            })
          }
        }
      },
      loadMore(){
        this.pageNo=this.pageNo+1;
        var height;
        this.$nextTick(function(){
          // height=$(".rightContent_").last().offset().top;
          height=$(".articleBox").find(".article_table tbody").children("tr").last().position().top;
        })
        var that=this;
        // if(!this.flag){
          if(this.input2!=''&&this.input2!=undefined){
            $.when(searchArticle(that.input2,that.pageNo,this.userid)).done(function(data){
              if(data.state=="0"){
                that.insertData(data); 
                that.$nextTick(function(){
                  $(".articleBox").find(".alertContent .el-table__body-wrapper").scrollTop(height);
                })
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
        // }
        else{
          $.when(getAllArticles(this.userid,this.method,this.type,this.pageNo)).done(function(data){
            if(data.state=="0"){
              that.insertData(data);
              that.$nextTick(function(){
                // $(document).scrollTop(height);
                $(".articleBox").find(".alertContent .el-table__body-wrapper").scrollTop(height);
              })
              // that.articlesAarry=data.data.list;
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
      jump () {
        alert("....");
        this.$nextTick(function(){
          this.scroll = $(".el-table").scrollTop;
          console.log(this.scroll)
        })
      },
    },
    mounted(){
      document.getElementsByClassName("article_table")[0].addEventListener('scroll', this.jump)
      // this.$nextTick(function(){
      //   console.log(document.getElementsByClassName("el-table")[0]);
      //   document.getElementsByClassName("el-table")[0].addEventListener('scroll', this.jump)
      // })  
    },
    created() {

      this.commonData=this.handlePreData(this.alltableData);//测试

      var that=this;
      this.userSource=JSON.parse(localStorage.getItem("userSource"));
      this.userid=this.userSource?this.userSource.id:'';
      $.when(getAllArticles(this.userid,this.method,this.type,this.pageNo)).done(function(data){
        if(data.state=="0"){
          that.insertData(data);
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
<style lang="less">
  .articleBox{
    .loadMoreStyle{
      display: inline-block;
      border: 1px solid #e4e4e4;
      padding: 5px 10px;
      border-radius: 3px;
      margin-top: 10px;
      font-size: 13px;
    }
    .input_position{
      margin-bottom:20px;
      .el-input__icon{
        width: 46px;
        height: 34px;
        background-color: #fbfdff;
        color: #97a8be;
        border-right-top-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid #bfcbd9;
      }
    }
    .alertContent .el-table__body-wrapper{
      height:auto;
      max-height:260px;
    }
    .btn_position{
      width: 100%;
      text-align: center;
      button{
        padding:8px 10px;
        margin-top: 15px;
        border: 1px solid #dfe6ec;
        color:#bbb;
        font-weight:normal;
        font-size: 13px;
      }
      .el-button:focus, .el-button:hover{
        color: #20a0ff;
        border-color: #20a0ff;
      }
    }
  }
</style>