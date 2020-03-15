<template>
  <div id="app">
    <div id="main" style="width: 600px;height:400px;"></div>
    <div class="line" id="line" :style="{width: '700px', height: '300px'}"></div>
    <div class="line" id="line_M" :style="{width: '700px', height: '300px'}"></div>
    <div class="bing" id="bing" :style="{width: '700px', height: '300px',marginTop:'100px'}"></div>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option);
    },
    // 折线图 1
    drawLine1() {
      // 为charts选定父容器并初始化charts画布
      let myChart2 = this.$echarts.init(document.getElementById("line"));
      // 为图表添加数据
      myChart2.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    },
    // 折线图 2
    drawLine2() {
      // 为charts选定父容器并初始化charts画布
      let myChart3 = this.$echarts.init(document.getElementById("line_M"));
      // 为图表添加数据
      // 绘制图表
      myChart3.setOption({
        // 提示框
        tooltip: {
          trigger: "axis" // 坐标触发
        },
        // 图表的标注
        legend: {
          // 标注前面的形状这个是圆形
          icon: "circle",
          // 数据名称
          data: ["FIL", "TIC"],
          // y轴的位置 可选 top center bottom x轴同理
          y: "bottom"
        },
        // 图形在画布的距离
        grid: {
          top: 10
        },
        // x轴的数据
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["01", "02", "03", "04", "05", "06", "07"]
        },
        // y轴的数据
        yAxis: {
          type: "value"
        },
        // 折线图 （写几条折线图就写几个对象；是这个{}对象）
        series: [
          {
            name: "FIL",
            type: "line",
            stack: "总量",
            data: [12, 13, 10, 13, 9, 23, 21],
            color: "#ffb54c"
          },
          {
            name: "TIC",
            type: "line",
            stack: "总量",
            data: [20, 12, 11, 24, 29, 33, 31],
            color: "#9186fc"
          }
        ]
      });
    },
    // 饼状图
    drawBing() {
      // 为charts选定父容器并初始化charts画布
      let myChart4 = this.$echarts.init(document.getElementById("bing"));
      // 为图表添加数据
      // 绘制图表
      myChart4.setOption({
        // 移入显示文字
        tooltip: {
          trigger: "item", // 项目触发
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // 图解 可以设置在圆环图的中心
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          z: 2,
          zlevel: 100,
          style: {
            text: "你好",
            fontSize: 36,
            x: 100,
            y: 100,
            textAlign: "center",
            fill: "#f00",
            width: 100,
            height: 100
          }
        },
        // 左侧提示 图表的标注
        legend: {
          orient: "vertical",
          x: "right",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            // 显示成饼状
            type: "pie",
            // 内环和外环的大小
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            // 主标题
            label: {
              normal: {
                // 是否默认显示文字
                show: false
                // position: 'center'
              },
              emphasis: {
                // 移入是否显示文字
                show: false, // 不显示
                // 文字类型
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            // 是否显示连接线
            labelLine: {
              normal: {
                show: false
              }
            },
            // 每一个饼状图的信息
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
     
    this.drawChart();
    this.drawLine1();
    this.drawLine2();
    this.drawBing();
   
  },
  // 可以尝试下，调整大小的时候，重新销毁图后再绘制
  // echart的dispose()和clear()方法，你可以了解一下
  // dispose(){
  //   debugger
  //   window.onresize = function() {
  //     myChart1.resize();
  //     console.log(myChart1)
  //   };
  // }
};

</script>
