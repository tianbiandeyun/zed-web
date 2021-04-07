<template>
  <section class="sign-container" @click="getUserId">

    <div class="sign-header-photo">
      <img :src="item.wx_photo" alt="">
    </div>

    <div class="sign-plo-details">
      <p>
        <span>{{item.name}}</span>
        <span>（{{item.company}}）</span>
      </p>
      <p v-if="item.display == 2 && item.status == 1">已报名</p>
      <p v-else-if="item.display == 2 && item.status == 2">{{time}}</p>
      <p v-else>审核中</p>
    </div>

    <div v-if="item.display == 2 && item.status == 2" class="sign-is-sign">
      <span>已签到</span>
    </div>

  </section>
</template>

<script>
  export default {
    name: "sign",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      getUserId() {
        this.$emit("getUserId", this.item.u_key);
      }
    },
    computed: {
      time() {
        let time = this.item.check_in_time;

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
      }
    }
  };

</script>

<style lang="less" scoped>
  .sign-container {
    border-bottom: 1px solid #dcdee2;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    justify-content: center;
    grid-column-gap: 10px;
    padding-bottom: 10px;

    .sign-header-photo {
      display: grid;
      justify-content: center;

      img {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid #dcdee2;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
      }
    }

    .sign-plo-details {
      display: grid;
      grid-template-rows: repeat(2, 1fr);

      >p {
        font-size: 14px;
        color: #c5c8ce;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-of-type(1) {

          span {

            &:nth-of-type(1) {
              color: #515a6e;
              font-weight: bold;
            }
          }
        }
      }
    }

    .sign-is-sign {
      text-align: center;
      font-size: 14px;
      color: #19be6b;
    }
  }

</style>
