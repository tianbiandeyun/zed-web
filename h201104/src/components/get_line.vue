<template>
  <!-- 我收到的对话 / 对话详情 -->
  <section class="line-container">

    <div class="line-header" @click.stop="getCall">

      <div class="line-header-photo">
        <img :src="item.wx_photo" alt="">
      </div>

      <div class="line-header-name">
        <p>{{item.name}}</p>
        <p>{{time}}</p>
      </div>

      <div class="line-header-options" @click.stop="delCall">
        <p>{{status}}</p>
      </div>

    </div>

    <div class="line-message" @click.stop="getCall">{{item.content}}</div>

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
          return this.$Utils.format(time);
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

    .b {
      background-color: #e8eaec !important;
    }
  }

</style>
