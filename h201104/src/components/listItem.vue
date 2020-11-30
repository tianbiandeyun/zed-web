<template>
  <section class="listItem-container">
    <div class="list-item">
      <div class="list-item-left">
        <img :src="item.head_portrait" alt="">
      </div>
      <div class="list-item-right">
        <div class="list-item-right-top">
          <div>{{item.name}}</div>
          <div>
            <button open-type="getUserInfo"
                    :disabled="disabled"
                    @getuserinfo="info($event,item.name,item.status,item.head_portrait,item.id)"
                    :class="item.status == 1 ? '' : 'active_p'">
              {{item.status == 1 ?
              "签到" : "已签到"}}
            </button>
          </div>
        </div>
        <div class="list-item-right-bottom">
          {{item.company}} | {{item.job_description}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "listItem",
    data() {
      return {
        photo: "",
        disabled: false
      };
    },
    props: {
      item: {
        type: Object
      }
    },
    mounted() {
      if (this.item.status != 1) {
        this.disabled = true;
      }
    },
    methods: {
      info(e, ...res) {
        if (e.mp.detail.errMsg !== "getUserInfo:fail auth deny") {
          this.$emit("signIn", [...res, JSON.parse(e.mp.detail.rawData).avatarUrl]);
        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "请授权头像信息，否则无法签到",
            success(res) {
            }
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>

  .listItem-container {

    .list-item {
      background-color: #fff;
      padding: 10px 20px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 12px;
      margin-bottom: 10px;

      > div {
        height: 100px;

        &:nth-of-type(1) {
          border: 1px solid #dcdee2;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          font-size: 0;
        }
      }

      .list-item-left {

        img {
          width: 100%;
          height: 100%;
        }
      }

      .list-item-right {
        display: grid;
        grid-template-rows: 1fr 1.4fr;

        .list-item-right-top {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-items: center;

          div {

            &:nth-of-type(1) {
              font-weight: bold;
              color: #17233d;
              font-size: 18px;
            }

            &:nth-of-type(2) {

              button::after {
                border: none;
              }

              > button {
                font-size: 14px;
                text-align: center;
                width: 60px;
                height: 30px;
                line-height: 28px;
                border: 2px solid #19be6b;
                color: #19be6b;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                float: right;
              }

              .active_p {
                background-color: #c5c8ce;
                color: #808695;
                border: 2px solid #808695;
              }

            }
          }
        }

        .list-item-right-bottom {
          font-size: 13px;
          line-height: 1.6;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          color: #515a6e;

        }
      }
    }
  }

</style>
