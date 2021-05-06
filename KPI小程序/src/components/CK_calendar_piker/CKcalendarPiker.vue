<template>
  <section class="calendarPikerContainer">

    <div class="calendarPiker">
      <!--周几-->
      <div class="calendarPikerWeek" v-for="(item,week) in weekList" :key="week">
        {{item}}
      </div>

      <!--日历盘-->
      <div class="calendarPikerRow" v-for="(item,row) in 6" :key="row">
        <div v-for="(item,col) in 7" :key="col" class="calendarPikerCol"
             @click="chooseDate(visibeDays[(row)*7+(col)].year,visibeDays[(row)*7+(col)].month,visibeDays[(row)*7+(col)].day)">

          <p
            :class="[
                      {isMonth:visibeDays[(row)*7+(col)].nowMonth === visibeDays[(row)*7+(col)].month && visibeDays[(row)*7+(col)].nowYear === visibeDays[(row)*7+(col)].year},
                      {isTody:showDate[visibeDays[(row)*7+(col)].year+'-'+(visibeDays[(row)*7+(col)].month)+'-'+visibeDays[(row)*7+(col)].day]},
                      {today:onTheDay.day === visibeDays[(row)*7+(col)].day && onTheDay.month === visibeDays[(row)*7+(col)].month && onTheDay.year === visibeDays[(row)*7+(col)].year}
                     ]"
            v-if="visibeDays[(row)*7+(col)].nowMonth === visibeDays[(row)*7+(col)].month && visibeDays[(row)*7+(col)].nowYear === visibeDays[(row)*7+(col)].year">
            {{visibeDays[(row)*7+(col)].day}}</p>

          <p v-else class="notMonth">{{visibeDays[(row)*7+(col)].day}}</p>

        </div>
      </div>

    </div>

  </section>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "calendarPiker",
    props: {
      /**
       * 是否可以选择日期
       * */
      noclick: {
        type: Boolean,
        default: false
      },
      /**
       * 选择之后展示的日期
       * */
      showDate: {
        type: Object
      },
      /**
       * 日期表盘
       * */
      weekList: {
        type: []
      },
      /**
       * 当天的日期 比如：今天的日期
       * */
      onTheDay: {
        type: Object
      },
      /**
       * 需要展示的月份，比如：2020-06-01 2020-07-01 2020-08-01 等
       * */
      date: {
        type: String
      }
    },
    data() {
      return {};
    },
    methods: {
      /**
       * 选择日历之后（单个日期，比如：2020-06-01），发送至上一级，做处理
       * */
      chooseDate(y, m, d) {
        const that = this;
        console.log(that.noclick ? "无法选择" : "可以选择");
        if (that.noclick) {
          return;
        }
        // 选择的日期
        let date = `${y}-${m}-${d}`;
        // 今天的日期
        let day = `${that.onTheDay.year}-${that.onTheDay.month}-${that.onTheDay.day}`;
        if (Date.parse(date.replace(/\-/g, "/")) >= Date.parse(day.replace(/\-/g, "/"))) {
          that.$emit("changDate", date);
        } else {
          wx.showToast({
            title: "不可选择之前的日期",
            icon: "none",
            duration: 2000
          });
        }
      }
    },
    computed: {
      /**
       * 把当前月格式化42天
       * */
      visibeDays() {
        const that = this;
        // 需要展示的月份，比如：2020-06-01 2020-07-01 2020-08-01 等
        let { year, month, day } = that.$unit.getYearMonthDay(new Date(this.date));
        // 当前月份的第一天
        let currentFirstDay = that.$unit.getDate(year, month, day);
        // 当前月份的第一天是周几
        let week = currentFirstDay.getDay();
        // 往前推几天
        let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
        let arr = []; // 每周
        // 42是每个月份单元格都需要显示42天
        for (let i = 0; i < 42; i++) {
          let y = new Date(startDay + i * 60 * 60 * 1000 * 24).getFullYear();
          let m = parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1) < 10 ? "0" + parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1) : parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1);
          let d = new Date(startDay + i * 60 * 60 * 1000 * 24).getDate() < 10 ? "0" + new Date(startDay + i * 60 * 60 * 1000 * 24).getDate() : new Date(startDay + i * 60 * 60 * 1000 * 24).getDate();
          arr.push({
            nowYear: year,// 当前
            nowMonth: parseInt(month + 1) < 10 ? "0" + parseInt(month + 1) : parseInt(month + 1),// 当前
            year: y, // 每天
            month: m,// 每天
            day: d// 每天
          }); // 把日期放进去
        }
        return arr;
      },
      ...mapGetters([])
    }
  };
</script>

<style scoped>
  .calendarPiker {
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 0px;
  }

  .calendarPikerRow, .calendarPiker {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .calendarPikerWeek {
    font-weight: bold;
    color: #000 !important;
  }

  .calendarPikerCol, .calendarPikerWeek {
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    border-bottom: 1px solid #999;
    color: #909090;
  }

  .isMonth {
    color: #000;
    font-weight: normal;
  }

  .isTody {
    background-color: #19be6b !important;
    color: #fff;
  }

  .today {
    background-color: #909090;
  }

  .notMonth {
    background-color: transparent !important;
  }

  .dad {
    color: red;
  }
</style>


