i<template>
  <div class="message userManage">
    <div class="rightBar">
      <p>
        用户管理
      </p>
      <el-button class="btn_position" @click="showUserBox">新增用户</el-button>
      <el-input
        placeholder="搜索用户账号、用户名称、所属组织"
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
          width="10%">
        </el-table-column>
        <el-table-column
          prop="org"
          label="所属组织"
          width="15%">
        </el-table-column>
        <el-table-column
          prop="account"
          label="用户账号"
          width="20%">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          width="20%"
          >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="10%">
        </el-table-column>
        <el-table-column
          prop="level"
          label="角色权限"
          width="15%">
        </el-table-column>
        <el-table-column
          label="操作"
          width="10%">
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
       list:[{name:"Foo"}, 
          {name:"Bar"}, 
          {name:"Baz"},
           ],
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
        totalItem:1,
        tableData: [
        // {
        //   index: 1,
        //   org: '校长办公室',
        //   account: 'PK_admin',
        //   name: '张三',
        //   state:'正常',
        //   level: '系统管理员',
        //   id:'01',
        //   orgid:'3',
        // }, 
        // {
        //   index: 2,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
        // {
        //   index: 3,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
        // {
        //   index: 4,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
        // {
        //   index: 5,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
        // {
        //   index: 6,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
        // {
        //   index: 7,
        //   org: '数据与信息中心',
        //   account:'TH_edit',
        //   name: '李四',
        //   state:'正常',
        //   level: '内容管理员',
        //   id:'02',
        //   orgid:'4',
        // }, 
      ],
      propsArr:[],
      currentPage:1,
      pageSize:20,
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
      this.filterData.splice(0);
      var that=this;
      for(var i=0;i<this.tableData.length;i++){
        if((this.tableData[i].name.indexOf(that.input2)!=-1)||(this.tableData[i].org.indexOf(that.input2)!=-1)||(this.tableData[i].account.indexOf(that.input2)!=-1)||(this.tableData[i].level.indexOf(that.input2)!=-1)){
          this.filterData.push(this.tableData[i]);
        }
        else{
        }
      }
    },
    showUserBox(){
      $(".mask1").addClass("showBtn");
      $(".userBox").addClass("showBtn userBoxAdd");
      // $(".userBox").removeAttr("data-id");
      // $(".userBox").removeAttr("data-state");
      // this.$store.dispatch('changeUnitVal',{"unitVal":''}).then(function(resp){});
      this.$store.dispatch('changeUserState',{"userState":{}}).then(function(resp){});
      $(".userBox .user-wf").removeClass("showBtn");
      $(".userBox .user-dele").removeClass("showBtn");
      $(".userBox .stateRow").removeClass("showBtn");
    },
    showUserBox_(e){
      var ele=e.currentTarget;
      var id=$(ele).attr("data-id");
      var state=JSON.parse($(ele).attr("data-state"));
      state.type="user";
      $(".mask1").addClass("showBtn");
      $(".userBox").addClass("showBtn");
      // $(".userBox").attr("data-id",id);
      // $(".userBox").attr("data-state",state);
      $(".userBox .user-wf").addClass("showBtn");
      $(".userBox .user-dele").addClass("showBtn");
      $(".userBox .stateRow").addClass("showBtn");
      this.$store.dispatch('changeUserState',{"userState":{}}).then(function(resp){});
      this.$store.dispatch('changeUserState',{"userState":state}).then(function(resp){});
    },
    levelJudge(value){
      if(value=='0'){
        return "系统管理员";
      }
      else if(value=='1'){
        return "内容管理员";
      }
      else if(value=='2'){
        return "批示用户";
      }
      else if(value=='3'){
        return "普通用户";
      }
      else if(value=='4'){
        return "超级管理员";
      }
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
      var that=this;
      this.$nextTick(function(){
        matchMenu();
      })

      // this.totalItem=this.tableData.length;
      // this.propsArr=this.tableData.map(function(value){
      //   return JSON.stringify(value);
      // })//测试
      // this.filterData=this.copyArr(this.tableData).slice(0,this.pageSize);


      $.when(getAllUsers()).done(function(data){
        if(data.state==0){
          var res=data.data;
          that.totalItem=res.length;
          that.tableData=res.map(function(value,index){
            var val=that.levelJudge(value.level);
            var status;
            if(value.status=="1"){
              status='正常';
            }
            else{
              status='已注销';
            }
            return {
              "index":index+1,
              "org": value.organization,
              "account":value.account,
              "name": value.username,
              "state":status,
              "level":val,
              "id":value.id,//用户id
              "orgid":value.orgId,
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
    .el-table__empty-block{
      width:100%!important;
    }
  }
  .userManage{
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
