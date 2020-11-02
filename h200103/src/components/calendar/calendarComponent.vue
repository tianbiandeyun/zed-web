<template>
    <section class="calendarComponent">
        <div class="calendar-date-header">
            <span v-for="(item,index) in  header" :key="index">{{item}}</span>
        </div>

<<<<<<< HEAD
        <!--6月份-->
        <div class="calendar-date-item" v-if="iss === 6">
            <div></div>
            <div v-for="(item,index) in liu" :key="index" @click="select(iss,item,index,getScheduledDateInfo[item])"
                 :class="ax === index && m === iss ? 'dActive' : ''" ref="D">
                <span>{{getDate(item)}}</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) !== 1 &&
                 parseInt(getScheduledDateInfo[item]) !== 2 &&
                 parseInt(getScheduledDateInfo[item]) !== 3"
                      class="calendar-status">{{cel(item)}}</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 1" class="calendar-status"
                      style="background-color: #5cb8c5;color: #fff;">可约</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 2" class="calendar-status"
                      style="background-color: #d60413;color: #fff;">已满</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 3" class="calendar-status"
                      style="background-color: #d60413;color: #fff;">休息</span>
            </div>
=======
        <!--8月份-->
        <div class="calendar-date-item" v-if="iss === 8">
>>>>>>> master
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
<<<<<<< HEAD
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <!--7月份-->
        <div class="calendar-date-item" v-if="iss === 7">
            <div></div>
            <div></div>
            <div></div>
            <div v-for="(item,index) in qi" :key="index" @click="select(item,index,getScheduledDateInfo[item])"
                 :class="ax === index && m === iss ? 'dActive' : ''" ref="D">
=======
            <div v-for="(item,index) in ba" :key="index" @click="select(item,index,getScheduledDateInfo[item])"
                 :class="ax === index ? 'dActive' : ''" ref="D">
>>>>>>> master
                <span>{{getDate(item)}}</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) !== 1 &&
                 parseInt(getScheduledDateInfo[item]) !== 2 &&
                 parseInt(getScheduledDateInfo[item]) !== 3"
                      class="calendar-status">{{cel(item)}}</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 1" class="calendar-status"
                      style="background-color: #5cb8c5;color: #fff;">可约</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 2" class="calendar-status"
                      style="background-color: #d60413;color: #fff;">已满</span>
                <span v-if="parseInt(getScheduledDateInfo[item]) === 3" class="calendar-status"
                      style="background-color: #d60413;color: #fff;">休息</span>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </section>
</template>

<script>
    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "calendarComponent",
        props: {
            iss: {
                type: Number
            }
        },
        data() {
            return {
                header: ['日', '一', '二', '三', '四', '五', '六'],
                ba: [
                    '2020-08-01', '2020-08-02', '2020-08-03', '2020-08-04',
                    '2020-08-05', '2020-08-06', '2020-08-07', '2020-08-08', '2020-08-09', '2020-08-10', '2020-08-11',
                    '2020-08-12', '2020-08-13', '2020-08-14', '2020-08-15', '2020-08-16', '2020-08-17', '2020-08-18',
                    '2020-08-19', '2020-08-20', '2020-08-21', '2020-08-22', '2020-08-23', '2020-08-24', '2020-08-25',
                    '2020-08-26', '2020-08-27', '2020-08-28', '2020-08-29', '2020-08-30','2020-08-31'
                ],
                ax: '',
                m: ''
            }
        },
        async created() {
            const that = this;
            const date = new Date();
            /**
             * 获取可以预约的日期
             * */
            await that.$store.dispatch('_getScheduledDate', {
                im: config.requestInterface.getScheduledDate,
                fps: {
                    'date': that.dateFormat("YYYY-mm-dd", date),
                },
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.getScheduledDateInfo);
        },
        mounted() {
        },
        methods: {
            select(iss, ite, index, status) {
                const that = this;
                if (status === 2 || status === 3) {
                    alert('无法预约')
                    return
                }
                const y = Array.from(Object.keys(that.getScheduledDateInfo));
                if (y.includes(ite)) {
                    that.ax = index;
                    that.m = iss;
                    // that.$refs.D[index].style.backgroundColor = "#E1E1E1"
                    // that.$refs.D.forEach((item, ind) => {
                    //     if (index === ind) {
                    //
                    //     } else {
                    //         item.style.backgroundColor = ""
                    //     }
                    // })
                    that.$emit('select', {date: ite});
                } else {
                    // alert('无法预约')
                }
            },
            cel(old) {
                const that = this;
                const date = new Date();
                const n = that.dateFormat("YYYY-mm-dd", date);

                const nn = new Date(n);
                const o = new Date(old);
                if (nn >= o) {
                    return '结束';
                }
                else {
                    return '待开';
                }

            },
            getDate(str) {
                var disLength = str.length;
                return str.substring(disLength - 2, disLength);
            },
            dateFormat(fmt, date) {
                let ret;
                const opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                }
                return fmt;
            }
        },
        computed: {
            ...mapGetters([
                'getScheduledDateInfo'
            ])
        }
    }
</script>

<style lang="less">
    .calendarComponent {

        padding: 20px;
        background-color: #fff;
        margin: 0 auto;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        -moz-box-shadow: 0px 5px 20px #E0E0E0;
        -webkit-box-shadow: 0px 5px 20px #E0E0E0;
        box-shadow: 0px 5px 20px #E0E0E0;
        margin-bottom: 40px;
        text-align: center;

        .calendar-date-header {
            display: flex;
            justify-content: space-between;
            span {
                width: 80px;
                height: 80px;
            }
        }
        .calendar-date-item {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            div {
                border: 1px solid black;
                width: 80px;
                height: 80px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding-top: 10px;
            }
            .dActive {
                background-color: #E1E1E1;
            }
        }

        .calendar-status {
            display: inline-block;
            font-size: 20px;
            margin: 6px auto 0px;
            background-color: #DADADA;
            width: 60px;
            height: 30px;
            line-height: 30px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
    }
</style>