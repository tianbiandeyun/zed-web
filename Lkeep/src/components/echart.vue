<template>
  <section class="echart-container" :id="id">
    <mpvue-echarts :echarts="echarts" :onInit="echartInit"/>
  </section>
</template>

<script>
  import * as echarts from "echarts/dist/echarts.simple.min";
  import mpvueEcharts from "mpvue-echarts";

  export default {
    props: {
      t: {
        type: Array,
        default: [70, 70, 70, 70, 70, 70, 70]
      },
      id: {
        type: Number
      }
    },
    components: { mpvueEcharts },
    data() {
      return {
        echarts
      };
    },
    methods: {

      initChart(canvas, width, height) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);

        chart.setOption({

          xAxis: {
            type: "category",
            data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期七"]
          },
          yAxis: {
            type: "value",
            splitNumber: 3,
            max: 130,
            min: 70
          },
          series: [{
            data: this.t,
            type: "line",
            label: {
              show: true,
              formatter: "{c}"
            }
          }]

        });

        return chart;
      },
      echartInit(canvas, width, height) {
        return this.initChart(canvas, width, height);
      }

    }
  };
</script>

<style lang="less" scoped>
  .echart-container {
    width: 100%;
    height: 200px;
  }
</style>
