i<template>
  <div class="message orgManage">
    <div class="rightBar">
      <p>
        组织信息
      </p>
      <el-button class="btn_position" @click="showUserBox">新增</el-button>
      <el-input
        placeholder="搜索组织名称、上级单位"
        icon="search"
        v-model="input2"
        class="input_position" :on-icon-click="handleInputClick" @keyup.native.enter='handleInputClick'>
      </el-input>
    </div>
    <div class="rightContent">
      <el-table
        :data="filterData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="org"
          label="组织名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="上级单位"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
           <template scope="scope">
            <el-button type="text" size="small" :data-id="scope.row.id" :data-state="propsArr[scope.row.index-1]" @click="showUserBox_">编辑</el-button>
          </template>
        </el-table-column>  
      </el-table>    
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalItem"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>  
  </div>
</template>
<script>
import {scrollFun,matchMenu} from '../../static/js/public.js'
export default {
  name: 'report',
  components: {
   app
  },
  // props:['isActive'],
  data () {
    return {
        input2:'',
        options: [{
          value: '1',
          label: '全部消息'
        }, {
          value: '2',
          label: '已读消息'
        }, {
          value: '3',
          label: '未读消息'
        }],
        value: '1',
        tableData: [
          // {
          //   index: 0,
          //   org: '组织1',
          //   level: '2',
          //   name: '西安交通大学',
          //   id:'5',
          //   pid:'2',
          // }, 
          // {
          //   index: 1,
          //   org: '数据与信息中心',
          //   level:'2',
          //   name: '内容管理员',
          //   id:'4',
          //   pid:'1',
          // }, 
        ],
        totalItem:1,
        propsArr:[],
        pageSize:20,
        currentPage:1,
        filterData:[],
      }
  },
  methods: {
    showSomething:function(){
      $(".mask").addClass("showBtn");
      $(".alertBox").addClass("showBtn");
    },
    optionChangeHandler:function(){
    },
    handleInputClick:function(){
      // this.$set(this.filterData,[]);
      // this.filterData=[];
      this.filterData.splice(0);
      var that=this;
      console.log(this.tableData);
      for(var i=0;i<this.tableData.length;i++){
        if(((this.tableData[i].name?this.tableData[i].name:'').indexOf(that.input2)!=-1)||((this.tableData[i].org?this.tableData[i].org:'').indexOf(that.input2)!=-1)){
          this.filterData.push(this.tableData[i]);
        }
        else{
        }
      }
    },
    showUserBox(){
      $(".mask1").addClass("showBtn");
      $(".orgBox").addClass("showBtn");
      $(".orgBox .user-dele").removeClass("showBtn");
      this.$store.dispatch('changeUserState',{"userState":{}}).then(function(resp){});
      // this.$store.dispatch('changeUnitVal',{"unitVal":''}).then(function(resp){});
    },
    showUserBox_(e){
      var ele=e.currentTarget;
      var id=$(ele).attr("data-id");
      var state=JSON.parse($(ele).attr("data-state"));
      state.type="organization";
      $(".mask1").addClass("showBtn");
      $(".orgBox").addClass("showBtn");
      $(".orgBox .user-dele").addClass("showBtn");
      this.$store.dispatch('changeUserState',{"userState":{}}).then(function(resp){});
      this.$store.dispatch('changeUserState',{"userState":state}).then(function(resp){});
    },
    copyArr(arr){
      return arr.map((e)=>{
          if(typeof e === 'object'){
              return Object.assign({},e)
          }else{
              return e
          }
      })
    },
    handleCurrentChange(val){
      var page=val;
      this.filterData.splice(0);
      var start=(page-1)*(this.pageSize);
      var end=page*(this.pageSize);
      if(page==Math.ceil(this.totalItem/(this.pageSize))){
        end=this.totalItem;
      }
      else{
      }
      for(var i=start;i<end;i++){
        this.filterData.push(this.tableData[i]);
      }
    },
  },
  created: function () {
    this.$nextTick(function(){
      matchMenu();
    })
    var that=this;

    // this.filterData=this.copyArr(this.tableData).slice(0,this.pageSize);
    // this.propsArr=this.tableData.map(function(value){
    //   return JSON.stringify(value);
    // })//测试 

    $.when(getOrgList()).done(function(data){
      if(data.state==0){
        // var res=data.data.results;
        var res=data.data;
        that.totalItem=res.length;
        that.tableData=res.map(function(value,index){
          return {
            "index":index+1,
            "org": value.organization,//组织名称
            "name": value.parentOrgName,//上级单位名称
            "level":value.level,
            "id":value.id,
            "pid":value.parentOrgId,
          }
        })
      }
      else{
        alert(data.data);
      }
      that.propsArr=that.tableData.map(function(value){
        return JSON.stringify(value);
      })
      that.filterData=that.tableData.slice(0,that.pageSize);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../static/less/init.less';
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
        font-size: 18px;
      }
    }
    .input_position{
      width: 240px!important;
      position: absolute!important;
      right: 10px;
      top: 12px;
      font-size: 12px;
      input{
        background-color: #fafafa!important;
      }
    }
    .btn_position{
      position: absolute;
      right:270px;
      top:12px;
      color:#0099FF;
      font-size: 12px;
      background-color: #fafafa!important;
      padding:11px 15px;
    }
  }
  .rightContent{
    border:none;
    // border: 1px solid #ccc;
    margin-top:15px;
    border-radius:5px;
    position: relative;
    background-color: #fff;
    .el-table{
      font-size: 13px!important;
    }
    .el-table .cell{
      font-size:  13px!important;
    }
    .el-table th{
      font-weight:500!important;
    }
  }
  .orgManage{
    .el-table__body-wrapper {
      overflow: hidden!important;
      position: relative;
    }
  }
  .selectStyle{
    width: 120px;
    position: absolute;
    right: 10px;
    // top: 12px;
    font-size: 12px;
  }

</style>
