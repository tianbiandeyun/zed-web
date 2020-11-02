<template>
    <section class="calendarTipComponent" @click="closetTip">
        <div class="calendar-tip-msg">
            <div class="msg">
                <div class="msg-title" v-if="msg.type === 1">预约须知</div>
                <div class="msg-title" v-if="msg.type === 2">{{msg.title}}</div>
                <div class="msg-conent" v-if="msg.type === 1">
                    <p>{{msg.title}}</p>
                    <p>{{msg.conent}}</p>
                </div>
                <div class="msg-conent" v-if="msg.type === 2">
                    <p>{{msg.conent}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "calendarTipComponent",
        props: {
            closetTip: Function,
            msg: Object,
        }
    }
</script>

<style lang="less">
    .calendarTipComponent {
        position: fixed;
        z-index: 999;
        background: rgba(000, 000, 000, .6);
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        .calendar-tip-msg {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            position: relative;
            .msg {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 70%;
                height: 600px;
                margin-left: -35%;
                margin-top: -500px;
                background-color: #fff;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                overflow: hidden;

                .msg-title {
                    width: 100%;
                    height: 150px;
                    line-height: 150px;
                    text-align: center;
                    color: #fff;
                    font-size: 30px;
                    background: -webkit-linear-gradient(#0b46bd, #6dc8da); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(#0b46bd, #6dc8da); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(#0b46bd, #6dc8da); /* Firefox 3.6 - 15 */
                    background: linear-gradient(#0b46bd, #6dc8da); /* 标准的语法 */
                }
                .msg-conent {
                    width: 100%;
                    height: 450px;
                    font-size: 30px;
                    text-align: left;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 60px;
                    p {
                        line-height: 1.4;
                    }
                    p:nth-of-type(odd) {
                        color: #5cb8c5;
                    }
                    p:nth-of-type(2) {
                        margin-bottom: 40px;
                    }
                }
            }
        }
    }
</style>