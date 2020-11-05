<template>
  <section class="occupyEchartsContainer">
    <mpvue-echarts v-if="occupyList" :echarts="echarts" :onInit="echartInit"/>
    <div v-else class="occupyEchartsError">图表暂无数据 / 传入错误</div>
  </section>
</template>

<script>
  import * as echarts from "echarts/dist/echarts.simple.min";
  import mpvueEcharts from "mpvue-echarts";

  export default {
    name: "occupyEchartsContainer",
    props: {
      occupyList: {
        type: Array
      },
      color: {
        type: Array
      }
    },
    components: { mpvueEcharts },
    data() {
      return {
        echarts: echarts
      };
    },
    methods: {
      initChart(canvas, width, height) {
        const that = this;
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);

        chart.setOption({
          backgroundColor: "#fff", // 背景颜色
          color: that.color, // 饼图颜色
          series: [{
            label: {
              fontSize: 14, // 文字大小
              // formatter: "{b}: {d}%"
              formatter: "{d}%"
            },
            type: "pie",
            center: ["50%", "50%"], // 位置
            radius: [0, "60%"], // 图的大小
            data: that.occupyList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 2, 2, 0.3)"
              }
            }
          }]
        });
        return chart;
      },
      echartInit(canvas, width, height) {
        const that = this;
        return that.initChart(canvas, width, height);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .occupyEchartsContainer {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    .occupyEchartsError {
      text-align: center;
    }
  }

</style>
