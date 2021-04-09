<template>
  <section class="line-container">

    <div class="line-header">

      <div class="line-header-photo">
        <img :src="item.wx_photo" alt="">
      </div>

      <div class="line-header-name">
        <p>{{item.name}}</p>
        <p>{{time}}</p>
      </div>

      <div class="line-header-options" @click="delGetCall">
        <p>全是别人说的（举报）</p>
      </div>

    </div>

    <div class="line-message" @click="getCall">{{item.content}}</div>

  </section>
</template>

<script>
  export default {
    name: "line",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      getCall() {
        this.$emit("getCall", {
          result: true
        });
      },
      delGetCall() {
        this.$emit("delGetCall", {
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
            return d_days + "天前，给你留言";
          } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前，给你留言";
          } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前，给你留言";
          } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
              return "刚刚发表";
            } else {
              return d_seconds + "秒前，给你留言";
            }
          } else if (d_days >= 3 && d_days < 30) {
            return M + "-" + D + " | " + H + ":" + m;
          } else if (d_days >= 30) {
            return Y + "-" + M + "-" + D + " | " + H + ":" + m;
          }

        }
      }
    }
  };

</script>

<style lang="less" scoped>
  .line-container {

    .line-header {
      display: grid;
      grid-template-columns: 50px 3fr 1fr;
      grid-template-rows: 50px;
      grid-column-gap: 10px;
      margin-bottom: 10px;

      .line-header-photo {
        font-size: 0;
        overflow: hidden;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .line-header-name {
        display: grid;
        align-items: center;

        p {

          &:nth-of-type(1) {
            color: #17233d;
            font-size: 18px;
          }

          &:nth-of-type(2) {
            color: #808695;
            font-size: 14px;
          }
        }
      }

      .line-header-options {
        display: grid;
        align-content: center;
        justify-content: center;

        p {
          color: #FF0000;
          font-size: 14px;
        }
      }

    }

    .line-message {
      color: #515a6e;
      font-size: 16px;
    }
  }

</style>
