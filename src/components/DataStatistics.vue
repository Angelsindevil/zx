<template>
  <div class="statistics">
    <div class="rightBar">
      <p>
        数据中心
      </p>
    </div>
    <div class="rightContent">
      <div class="topbox">
        <div>
          <p><img src="../../static/img/statistics.png" alt=""><span>15</span></p>
          <p>累计生成报告总数</p>
        </div>
        <div>
          <p><img src="../../static/img/data.png" alt=""><span>15</span></p>
          <p>累计生成文章总数</p>
        </div>
        <div>
          <p><img src="../../static/img/time.png" alt=""><span>15</span></p>
          <p>近一年收录文章数</p>
        </div>
        <div>
          <p><img src="../../static/img/block.png" alt=""><span>15</span></p>
          <p>本月收录文章数</p>
        </div>
      </div>
    </div>
    <div class="chartsBox">
      <chart :options="polar" :style="{width:'100%',height:getHeight()}"></chart>
    </div>
    <div class="chartsBox_1">
      <div class="chartsBox_2">
        <chart :options="pies_1" :style="{width:'100%',height:getHeight()}"></chart>
      </div>
      <div class="chartsBox_2">
        <chart :options="pies_2" :style="{width:'100%',height:getHeight()}"></chart>
      </div>
    </div>
  </div>
</template>
<script>
import {scrollFun,matchMenu} from '../../static/js/public.js'
export default {
  name: 'statistics',
  components: {
  },
  // props:['isActive'],
  data () {
    return {
        polar:{
          title: {
              // text: 'ECharts 入门示例'
          },
          grid: {
              left: '5%',
              right: '5%',
              bottom: '5%',
              top:'20%',
              containLabel: true,
              // width:'800px',
              // height:'400px',
          },
          color:['#0099ff',"#edbc44"],
          tooltip: {},
          legend: {
              data:['收录文章数','生成报告数'],
              itemWidth:15,
              itemGap:40,
              
          },
          xAxis: {
              data:['国家','行业','地方','高校','海外','党建','专家','其他'],
              axisTick:{
                  length:0,
              },
              axisLine:{
                  lineStyle:{
                      color:'#999',
                  }
              },
              axisLabel:{
                  textStyle:{
                      color:'#333',
                  }
              },
          },
          yAxis: {
              type:'value',
              axisTick:{
                  length:0,
              },
              splitLine:{
                  show:false,  
              },
              splitNumber:10,
              axisLine:{
                  lineStyle:{
                      color:'#999'
                  }
              },
              axisLabel:{
                  textStyle:{
                      color:'#333',
                  }
              },
          },
          series: [{
              name: '收录文章数',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20],
              barWidth:'20%',
          },
          {
              name: '生成报告数',
              type: 'bar',
              data: [5, 10, 40, 5, 10, 20],
              barWidth:'20%',
              
          }]
        },
        pies_1:{
          tooltip: {},
          legend: {
              itemWidth:10,
              itemHeight:10,
              textType:{
                  
              },
              top:'10%',
              data:['国家','行业','地方','高校','海外','党建','专家','其他']
          },
          color:['#5698fb','#d47b39','#edb92b','#5571c0','#898989','#3e5e8e','#96d492'],
          series: [{
              name: '销量',
              type: 'pie',
              radius: ['60%', '25%'],
              center:['50%','55%'],
              itemStyle:{
                 normal:{
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  //   shadowBlur: 10,
                  //   shadowOffsetX:5,
                  //   shadowOffsetY:5,
                 } 
              },
              data: [
                  {name:'国家',value:100},
                  {name:'行业',value:200},
                  {name:'地方',value:90},
                  {name:'海外',value:80},
                  {name:'党建',value:150},
                  {name:'专家',value:40},
                  {name:'其他',value:90},
              ],
              label:{
                  normal:{
                      show:true,
                      position:'inside',
                      formatter: '{d}'+'%',
                      
                  }
              },
          }]
        },
        pies_2:{
          tooltip: {},
          legend: {
              itemWidth:10,
              itemHeight:10,
              textType:{
                  
              },
              top:'10%',
              data:['国家','行业','地方','高校','海外','党建','专家','其他']
          },
          color:['#5698fb','#d47b39','#edb92b','#5571c0','#898989','#3e5e8e','#96d492'],
          series: [{
              name: '销量',
              type: 'pie',
              radius: ['60%', '25%'],
              center:['50%','55%'],
              itemStyle:{
                 normal:{
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  //   shadowBlur: 10,
                  //   shadowOffsetX:5,
                  //   shadowOffsetY:5,
                 } 
              },
              data: [
                  {name:'国家',value:100},
                  {name:'行业',value:200},
                  {name:'地方',value:90},
                  {name:'海外',value:80},
                  {name:'党建',value:150},
                  {name:'专家',value:40},
                  {name:'其他',value:90},
              ],
              label:{
                  normal:{
                      show:true,
                      position:'inside',
                      formatter: '{d}'+'%',
                      
                  }
              },
          }]
        },
      }
  },
  methods:{
    getHeight:function(){
      return ((window.innerWidth - 240) * 0.3 | 0) + 'px'
    },
  },
  created:function(){
    this.$nextTick(function(){
      matchMenu();
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
        // font-size: 18px;
      }
    }
  }
  .rightContent{
    margin-top:15px;
    .topbox{
      >div{
        width:22%;
        height:100px;
        float: left;
        margin-right:3.5%;
        border:1px solid #ccc;
        border-radius:5px;
        background-color: #fff;
        p{
          text-align: center;
          img{
            display:inline-block;
            width:25px;
            height:25px;
            vertical-align:middle;
            margin-right:10px;
          }
          span{
            vertical-align:middle;
          }
        }
        p:nth-child(1){
          color:#000;
          font-size:25px;
          padding-top:25px;
          padding-bottom:10px;
        }
        p:nth-child(2){
          font-size:14px;
          color:#666;
        }
      }
      >div:last-child{
        margin:0;
      }
    }
  }
  .chartsBox{
    width:100%;
    border:1px solid #ccc;
    margin-top: 140px;
    padding-top: 20px;
    padding-bottom: 0;
    background-color: #fff;
  }
  .chartsBox_1{
    margin-top:20px;
    margin-bottom:80px;
    .chartsBox_2{
      float:left;
      width:48%;
      margin-right:3.5%;
      border:1px solid #ccc;
      background-color: #fff;
      canvas{
        position: absolute;
        left: -80px;
        top: 20px;
      }
    }
     .chartsBox_2:last-child{
      margin-right:0;
     }
    .after;
  }
</style>
