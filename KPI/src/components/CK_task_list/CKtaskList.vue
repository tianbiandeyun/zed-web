<template>
  <section class="task-list">

    <div class="task-list-content" v-if="page === ''">
      <p class="task-list-content-tile">{{data.task_name}}</p>
      <p class="task-list-content-detail">
        任务截止时间{{data.end_date}}， 持续{{data.working_day_count}}天<span v-if="score !== 0">，得{{score}}分</span>
      </p>
    </div>

    <div class="task-list-content" v-if="page === 'staff_chart'">
      <p class="task-list-content-tile">{{data.date}}</p>
      <p class="task-list-content-detail">
        绩效评分{{data.score}}，参与评率{{score2}}%
      </p>
    </div>

    <div class="task-status" v-if="isIcon">
      <!--1 黄色 ffc300 info-->
      <!--2 蓝色 waiting-->
      <!--3 红色 red info-->
      <!--4 绿色 success-->
      <icon v-show="data.attachinfo_of_task.task_icon_status === 1" type="info" color="#ffc300" size="26"></icon>
      <icon v-show="data.attachinfo_of_task.task_icon_status === 2" type="waiting" size="26"></icon>
      <icon v-show="data.attachinfo_of_task.task_icon_status === 3" type="info" color="red" size="26"></icon>
      <icon v-show="data.attachinfo_of_task.task_icon_status === 4" type="success" size="26"></icon>
    </div>

    <div class="task-next">
      <img src="../../../static/images/right.png" alt="">
    </div>

  </section>
</template>

<script>

  export default {
    name: "task-list",
    props: {
      /**
       * 单个项目数据
       * */
      data: {
        type: Object,
        default: () => {
          return {
            title: "我是标题",
            end_date: "2020-07-03",
            day_count: 10,
            task_score: 50,
            score_status: true,
            task_state: 2
          };
        }
      },
      /**
       * 使用组件的页面
       * */
      page: {
        type: String,
        default: ""
      },
      /**
       * 是否显示任务状态
       * */
      isIcon: {
        type: Boolean,
        default: true
      }
    },
    methods: {},
    computed: {
      score() {
        const that = this;
        return Math.round(that.data.score * 100) / 100;
      },
      score2() {
        const that = this;
        return Math.round(that.data.review_rate * 100);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .task-list {
    border-bottom: 1px solid @default-divider-color;
    .default-flex();
    padding: 0 0 5px 0;

    .task-list-content {
      width: calc(100% - 60px);

      .task-list-content-tile, .task-list-content-detail {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .task-list-content-tile {
        color: @default-content-color;
        font-size: @default-font-size-16;
      }

      .task-list-content-detail {
        color: @default-sub-color;
        font-size: @default-font-size-12;
      }
    }

    .task-status {
      display: flex;
    }

    .task-next {
      font-size: 0;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }


</style>
