<template>
    <section class="fromComponent">
        <div>
            <span>姓名*</span>
            <b class="fromComponent-name">
                <input @blur="onBlur" type="text" name="name" v-model="name">
            </b>
            <span>性别*</span>
            <b class="fromComponent-sex">
                <!--<input @blur="onBlur" type="text" name="sex" v-model="sex">-->
                <select name="sex" v-model="sex">
                    <option value=""></option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </b>
        </div>
        <div>
            <span>公司名称*</span>
            <b class="fromComponent-company">
                <input @blur="onBlur" type="text" name="company" v-model="company">
            </b>
        </div>
        <div>
            <span>所属行业*</span>
            <b class="fromComponent-industry">
                <!--<input @blur="onBlur" type="text" name="industry" v-model="industry">-->
                <select name="industry" v-model="industry">
                    <option value=""></option>
                    <option value="教育">教育</option>
                    <option value="科技">科技</option>
                    <option value="医疗">医疗</option>
                    <option value="金融">金融</option>
                    <option value="餐饮">餐饮</option>
                    <option value="零售">零售</option>
                    <option value="文娱">文娱</option>
                    <option value="消费">消费</option>
                    <option value="农业">农业</option>
                    <option value="互联网">互联网</option>
                    <option value="企业服务">企业服务</option>
                    <option value="其他">其他</option>
                </select>
            </b>
        </div>
        <div>
            <span>所属轮次*</span>
            <b class="fromComponent-financing">
                <!--<input @blur="onBlur" type="text" name="financing" v-model="financing">-->
                <select name="financing" v-model="financing">
                    <option value=""></option>
                    <option value="无融资">无融资</option>
                    <option value="种子轮">种子轮</option>
                    <option value="天使轮">天使轮</option>
                    <option value="A-B轮">A-B轮</option>
                    <option value="B轮以后">B轮以后</option>
                    <option value="不清楚">不清楚</option>
                </select>
            </b>
        </div>
        <div>
            <span>公司职务*</span>
            <b class="fromComponent-character">
                <input @blur="onBlur" type="text" name="character" v-model="character">
            </b>
        </div>
        <div>
            <span>手机号码*</span>
            <b class="fromComponent-phone">
                <input @blur="onBlur" type="text" name="phone" v-model="phone">
            </b>

            <!-- -&#45;&#45;-->

            <span class="fromComponent-phone-code" @click="getPhoneCode" v-show="isGetPhonNumbershow">
                获取验证码
            </span>

            <span v-show="!isGetPhonNumbershow" class="fromComponent-phone-code">{{timer}}s</span>

            <!-- -&#45;&#45;-->

            <b class="fromComponent-phoneCode">
                <input @blur="onBlur" type="text" name="phoneCode" v-model="phoneCode">
            </b>
        </div>
        <div>
            <p>您希望在课程中解决的问题：</p>
            <textarea @blur="onBlur" class="fromComponent-question" name="question" v-model="questionVal"></textarea>
        </div>
    </section>
</template>

<script>
    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "fromComponent",
        data() {
            return {
                name: null, // 名字
                sex: null, // 性别
                company: null, // 公司名称
                industry: null, // 行业
                financing: null, // 轮次
                character: null, // 职务
                phone: null, // 号码
                phoneCode: null, // 验证码
                questionVal: null, // 问题
                isGetPhonNumbershow: true, //通过v-show控制显示获取还是倒计时
                timer: 60 //定义初始时间为60s

            }
        },
        created() {
            let that = this;
        },
        methods: {
            /**
             * 解决 ios 键盘顶起页面无法复位
             * */
            onBlur() {
                let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            },
            /**
             * 获取验证码
             * */
            getPhoneCode() {
                let that = this;

                /**
                 * 验证手机号码
                 * 17344421920
                 * */
                if (that.phone === null || that.phone === '' || !(/^1[3456789]\d{9}$/.test(that.phone))) {
                    that.$tip(`手机号码有误，请重填`);
                    return;
                }

                let p = new Promise((resolve, reject) => {
                    that.isGetPhonNumbershow = false;
                    let auth_timer = setInterval(() => {
                        that.timer--;
                        if (that.timer <= 0) {
                            that.isGetPhonNumbershow = true;
                            clearInterval(auth_timer);
                            resolve(60);
                        }
                    }, 1000);
                });

                /**
                 * 发送验证码
                 * */
                that.$store.dispatch('_getPhoneCodeNum', {
                    im: config.requestInterface.sendphoneidentifyingcode,
                    fps: {
                        'open_id': that.openidInfo.open_id,
                        'phonenum': that.phone
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                }).then(res => {
                    if (res.back_value) {
                        return p
                    }
                }).then(res => {
                    console.log('倒计时完毕');
                    that.timer = res;
                });

            },
            /**
             * 验证是否填写完成
             * */
            verification() {
                let that = this;
                that.isNull({
                    name: that.name,
                    sex: that.sex,
                    company: that.company,
                    industry: that.industry,
                    financing: that.financing,
                    character: that.character,
                    phone: that.phone,
                    phoneCode: that.phoneCode
                }, res => {
                    if (that.phone === null || that.phone === '' || !(/^1[3456789]\d{9}$/.test(that.phone))) {
                        that.$tip(`手机号码有误，请重填`);
                        return;
                    }
                    /**
                     * 填写完成之后，发送 填写完成事件
                     * */
                    that.$emit('fromVerification', {
                        name: that.name,
                        sex: that.sex,
                        company: that.company,
                        industry: that.industry,
                        financing: that.financing,
                        character: that.character,
                        phone: that.phone,
                        phoneCode: that.phoneCode,
                        questionVal: that.questionVal
                    })
                });
            },
            /**
             * 判断信息是否为空
             * */
            isNull(data, callback) {
                let that = this;
                let nulName = {
                    name: '姓名',
                    sex: '性别',
                    company: '公司名称',
                    industry: '所属行业',
                    financing: '所属轮次',
                    character: '公司职务',
                    phone: '手机号码',
                    phoneCode: '验证码'
                };
                for (let k in data) {
                    if (data[k] === null || data[k] === '') {
                        that.$tip(`${nulName[k]}不能为空`);
                        return
                    }
                }
                callback(true)
            }
        },
        computed: {
            ...mapGetters([
                'openidInfo'
            ])
        }
    }
</script>

<style lang="less">

    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .fromComponent {
        #boxSizing;
        width: 100%;
        padding: 80px 40px 20px 40px;
        background: url("../../assets/images/fromBg2.png") no-repeat;
        background-size: 100%;
        background-position: 0px -4px;
        margin-bottom: 40px;

        div {
            #boxSizing;
            padding: 20px 0px;
            /*border: 1px solid black;*/

            &:last-child {
                line-height: normal;
                height: auto;

                p {
                    margin-bottom: 20px;
                }
            }

            b {
                display: inline-block;
                border-bottom: 2px solid #fff;

                input {
                    #boxSizing;
                    width: 100%;
                    font-size: 28px;
                    background-color: transparent;
                    padding-left: 20px;
                }

                select {
                    width: 100%;
                    background-color: transparent;
                    font-size: 28px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding-left: 20px;
                }
            }

            span, p {
                color: #fff;
                font-size: 30px;
                font-weight: bold;
                margin-right: 10px;
            }

            .fromComponent-name {
                width: 340px !important;
                margin-right: 10px;
            }

            .fromComponent-sex {
                width: 120px !important;
            }

            .fromComponent-company, .fromComponent-industry, .fromComponent-financing, .fromComponent-character {
                width: calc(100% - 180px) !important;
            }

            .fromComponent-phone {
                width: 210px !important;
                margin-right: 10px;
            }

            .fromComponent-phoneCode {
                width: 120px !important;
            }

            .fromComponent-phone-code {
                border: 1px solid #ff5f68;
                padding: 14px 0px;
                display: inline-block;
                width: 140px;
                font-size: 24px;
                text-align: center;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                -moz-box-shadow: 2px 2px 5px #cc3744;
                -webkit-box-shad2w: 2px 0px 5px #cc3744;
                box-shadow: 2px 2px 5px #cc3744;
                background-image: linear-gradient(to right, #ff5f68, #ffd69f);
            }

            .fromComponent-question {
                #boxSizing;
                margin: 0 auto;
                display: block;
                width: 98%;
                height: 400px;
                padding: 20px;
                -moz-box-shadow: 2px 5px 10px #ff5f68;
                -webkit-box-shadow: 2px 5px 10px #ff5f68;
                box-shadow: 2px 5px 10px #ff5f68;
                font-size: 30px;
            }

        }

    }

</style>
