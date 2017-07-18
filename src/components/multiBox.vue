<template>
	<!-- 处理人弹窗 -->
	<div class=" multiBox alertStyle" style="z-index:5">
      	<div class="alertTop">{{titleName}}<span @click="hideMultiBox"><img src="../../static/img/cancel.png"></span></div>
      	<div class="alertContent">
        	<el-autocomplete
	          class="inline-input"
	          v-model="state2"
	          :fetch-suggestions="querySearch"
	          :placeholder="phtext"
	          :trigger-on-focus="false"
	          @select="handleSelect"
	        >
	        	<el-button slot="append" icon="search" @click="handleIconSelect"></el-button>
	        </el-autocomplete>
		    <el-table
		      ref="multipleTable"
		      class="article_table"
		      :data="commonData"
		      highlight-current-row
		      @current-change="handleTableCurrentChange"
		      @selection-change="handleSelectionChange"
		      style="width: 100%">
			    <el-table-column
			        type="selection"
			        width="20%"
			        >
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
	    		<span class="bg_green" @click="hideMultiBox(),submit()">确定</span> 
	    		<span @click="hideMultiBox" class="bg_cancle">取消</span>
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
	      input2:'',
	      input3:'',
	      state2:'',
	      isSelect:false,
	      titleName:'处理人选择',
	      phtext:'请输入处理人姓名',
	      labeltext:'人员姓名',
	      commonData:[],
	      alltableData:[
	        // {value:'张三',i:0},
	        // {value:'李四',i:1},
	        // {value:'赵五',i:2},
	        // {value:'王六',i:3},
	        // {value:'关七',i:4},
	        // {value:'李四1',i:5},
	        // {value:'李四2',i:6},
	        // {value:'李四3',i:7},
	        // {value:'李四4',i:8},
	        // {value:'李四5',i:9},
	        // {value:'李四6',i:10},
	        // {value:'李四7',i:11},
	        // {value:'李四8',i:12},
	        // {value:'李四9',i:13},
	      ],
	      selectArr:{
	      	name:[],
	      	id:[]
	      },
	      multipleSelection: []
	    }
	  },
	  computed: {
	    ...mapGetters({
	      clearAll:'clearAll'
	    })
	  },
	  watch:{
	    clearAll:{
	      handler: function (val, oldVal) {//取消所有选择
	      	console.log("execute");
	      	this.$nextTick(function () {
	      		$(".multiBox .el-table__body-wrapper").find("tbody tr").each(function(index,element){
                  $(element).children('td').find('.el-checkbox__input').removeClass("is-checked");
                  // $(element).children('td').eq(0).children('div').addClass("ellipsis");
              	})
		    })	
	      },
	      deep:true,
	      immediate: true,
	    },
	  },
	  methods:{
	  	toggleSelection(rows) {
	        this.$refs.multipleTable.clearSelection();
	    },
	    hideMultiBox:function(){
	      $(".mask2,.multiBox").removeClass("showBtn");
	      $(".mask1").addClass("showBtn");
	    },
	    querySearch(queryString, cb) {
	      var alltableData = this.commonData;
	      var results = queryString ? alltableData.filter(this.createFilter(queryString)) : alltableData;
	      cb(results);
	    },
	    // createFilter(queryString) {
	    //   return (restaurant) => {
	    //     return (restaurant.value.indexOf(queryString.toLowerCase()) ===0);
	    //   };
	    // },
	    createFilter(queryString) {
          return (restaurant) => {
          	return (restaurant.value.search(queryString) !=-1);
          };
      	},
	    handleSelect(item) {
	      console.log(item.value);
	      for (var i=0;i<this.commonData.length;i++) {
	        if(this.commonData[i].value==item.value){
	          // if(this.isSelect){
	          //   this.commonSelHandler('.multiBox',i,item);
	          // }
	          // else{
	          //   this.commonSelHandler('.articleBox',i,item);
	          // }
	          this.commonSelHandler('.multiBox',i,item);
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
	          this.commonSelHandler('.multiBox',i,this.state2);
	        }
	      }
	    },
	    commonSelHandler(selector,i,item){
	      this.$nextTick(function(){
	      	$(selector).find(".article_table tbody").children("tr").removeClass("current-row");
	        $(selector).find(".article_table tbody").children("tr").eq(i).addClass("current-row");
	      	var height=$(selector).find(".article_table tbody").children("tr").eq(i).position().top;
	      	$(selector).find(".alertContent .el-table__body-wrapper").scrollTop(height)
	      	$(selector).find(".article_table tbody").children("tr").eq(i).find(".el-checkbox__input").addClass("is-checked");
	      	})
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
	      }
	    },
	    handlePreData:function(val1){
	      for (var i=0;i<val1.length;i++) {
	        val1[i].i=i;
	      }
	      // var val2=val1.slice(0,6);
	      return val1;
	    },
	    handleSelectionChange(val) {//点击多选的条目
	      this.multipleSelection = val;
	      console.log(val);
	      this.selectArr.name.length=0;
	      this.selectArr.id.length=0;
	      for (var i=0;i<val.length;i++) {
	        this.selectArr.name.push(val[i].value);
	        this.selectArr.id.push(val[i].id);
	      }
	    },
	    submit(){
	    	console.log(this.selectArr);
	    	this.$store.dispatch('changeSelArr',{selectArr:this.selectArr}).then(function(resp){});
	    },
	  },
	  // mounted() {
	  //   this.commonData=this.handlePreData(this.alltableData);
	  // },
	  created(){
	  	var that=this;
	  	$.when(getAllUsers()).done(function(data){
	        if(data.state==0){
	          var res=data.data;
	          that.commonData=res.map(function(value,index){
	            return{
	              value:value.username,
	              i:index,
	              id:value.id,
	            }
	          })
	        }
	    })
	  }
	}
</script>