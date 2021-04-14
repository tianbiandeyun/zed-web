<template>
  <!-- 我创建的对话 -->
  <section class="create_line-container">
    <div hover-class='b' class="created-line-header" @click.stop='sendCall'>
      <p>我</p>
      <p>{{time}}，给"{{item.name}}"留言</p>
      <p @click.stop="delCall">{{status}}</p>
    </div>
    <div hover-class='b' class="created-line-message" @click.stop='sendCall'>{{item.content}}</div>
  </section>
</template>

<script>
  export default {
    name: "create_lline",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      sendCall() {
        this.$emit('sendCall', {
          result: true
        });
      },
      delCall() {
        this.$emit("delCall", {
          result: true
        });
      }
    },
    computed: {
      time() {
        let time = this.item.creation_time;

        if (time) {

          let publishTime = Date.parse(time.replace(/-/gi, "/")) / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime() / 1000),
            d,

            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
          //小于10的在前面补0
          if (M < 10) {
            M = "0" + M;
          }
          if (D < 10) {
            D = "0" + D;
          }
          if (H < 10) {
            H = "0" + H;
          }
          if (m < 10) {
            m = "0" + m;
          }
          if (s < 10) {
            s = "0" + s;
          }

          d = timeNow - publishTime;
          d_days = parseInt(d / 86400);
          d_hours = parseInt(d / 3600);
          d_minutes = parseInt(d / 60);
          d_seconds = parseInt(d);

          if (d_days > 0 && d_days < 3) {
            return d_days + "天前";
          } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
          } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
          } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
              return "刚刚发表";
            } else {
              return d_seconds + "秒前";
            }
          } else if (d_days >= 3 && d_days < 30) {
            return M + "-" + D + " | " + H + ":" + m;
          } else if (d_days >= 30) {
            return Y + "-" + M + "-" + D + " | " + H + ":" + m;
          }

        }
      },
      status() {
        let _status = {
          1: '',
          2: '举报信息',
          3: '已经举报',
          4: '撤回',
          5: '删除'
        }
        return _status[this.item.operation_status];
      }
    }
  };

</script>

<style lang="less" scoped>
  .create_line-container {

    .created-line-header {
      display: grid;
      grid-template-columns: 30px 4fr 1fr;
      grid-column-gap: 6px;
      margin-bottom: 10px;
      align-items: center;

      p {

        &:nth-of-type(1),
        &:nth-of-type(3) {
          text-align: center;
        }

        &:nth-of-type(1) {
          color: #17233d;
          font-size: 18px;
        }

        &:nth-of-type(2) {
          color: #808695;
          font-size: 14px;
        }

        &:nth-of-type(3) {
          color: #FF0000;
          font-size: 14px;
        }
      }
    }

    .created-line-message {
      color: #515a6e;
      font-size: 16px;
    }

    .b {
      background-color: #e8eaec !important;
    }
  }

</style>
