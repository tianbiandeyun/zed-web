<template>
    <section class="info-container">

        <div class="banner">
            <img src="../assets/images/banner.png" alt="">
        </div>
        <div class="content">

            <div class="item">
                <span class="item-caption">姓名</span>：
                <input class="item-message auto-width" v-model="name" type="text" placeholder="请输入姓名"/>
            </div>

            <div class="item">
                <span class="item-caption">性别</span>：

                <input type="radio" id="one" value="1" v-model="picked">
                <label for="one">男</label>

                <input type="radio" id="two" value="2" v-model="picked">
                <label for="two">女</label>

            </div>

            <div class="item">
                <span class="item-caption">年龄</span>：
                <select class="auto-width" v-model="age_active">
                    <option
                            v-for="(item,index) in age_list"
                            :key="index"
                            :value='item'>
                        {{item}}
                    </option>
                </select>
            </div>

            <div class="item">
                <span class="item-caption">手机</span>：
                <input class="item-message auto-width" v-model="photo" type="number" placeholder="请输入手机号码"/>
            </div>

            <div class="item">
                <span class="item-caption">验证码</span>：
                <input class="item-message code-width" v-model="photo_code" type="number" placeholder="请输入验证码"/>
                <span class="photo-code" @click="getCode">{{message}}</span>
            </div>

        </div>
        <div class="button">
            <button @click="submit">立即参与</button>
        </div>

    </section>
</template>

<script>
    import share from '../utils/share'
    import {mapGetters} from 'vuex'

    export default {
        name: "info",
        mixins: [share],
        data() {
            return {
                name: '',
                picked: '1',
                age_active: 2010,
                photo: '',
                photo_code: '',
                message: '获取验证码',
                timer: null
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');

            // 设置 PV
            this.$store.dispatch('_setPv', {
                im: this.$config.PROJECT_INTERFACE.set_pv_statistics,
                fps: {
                    info_key: '用户组册',
                },
                url: this.$config.REQUEST_URL
            });

        },
        methods: {
            /**
             * 提交
             * */
            submit() {
                if (this.name === '') {
                    alert('请填写姓名');
                    return false;
                }

                if (this.photo === '') {
                    alert('请填写手机');
                    return false;
                }

                if (this.photo_code === '') {
                    alert('请填写验证码');
                    return false;
                }

                this.$store.dispatch('_setUserInfo', {
                    im: this.$config.PROJECT_INTERFACE.set_user_info,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                        name: this.name,
                        sex: this.picked,
                        age: this.age_active,
                        phone: this.photo,
                        code: this.photo_code
                    },
                    url: this.$config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        this.$router.push('/')
                    }
                })
            },
            /**
             * 点击获取验证码
             * */
            async getCode() {
                if (this.photo === '') {
                    alert('请填写手机');
                    return false;
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                    let code = TIME_COUNT;
                    this.message = `${TIME_COUNT}s后获取`;
                    this.timer = setInterval(() => {
                        if (code > 0 && code <= TIME_COUNT) {
                            code--;
                            this.message = `${code--}s后获取`;
                        } else {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.message = '获取验证码';
                        }
                    }, 1000);
                    let code_result = await this._getPhotoCode(this.photo);
                    if (code_result.back_value) {
                        alert('发送成功')
                    }
                }
            },
            /**
             * 发送短信
             * */
            _getPhotoCode(photo) {
                return this.$store.dispatch('_getPhotoCode', {
                    im: this.$config.PROJECT_INTERFACE.send_phone_identifying_code,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                        phonenum: photo
                    },
                    url: this.$config.REQUEST_URL
                })
            }
        },
        computed: {
            ...mapGetters([
                'getOpenid_info'
            ]),
            age_list() {
                let _age = [];
                for (let i = 1960; i <= 2010; i++) {
                    _age.push(i);
                }
                return _age;
            }
        }
    }
</script>

<style lang="less" scoped>

    .info-container {
        height: 100%;
        display: grid;
        grid-template-rows: 2fr 4fr 2fr;
        justify-items: center;
        align-items: center;

        .banner {
            font-size: 0;

            img {
                height: 300px;
            }
        }

        .content {
            padding: 0 40px;
            width: 100%;

            .item {
                font-size: @default-font-size-36;
                color: @default-font-color-content;
                margin-bottom: 20px;

                .item-caption {
                    width: 120px;
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                    line-height: 60px;
                }

                .item-message {
                    font-size: @default-font-size-30;
                    height: 60px;
                    border: 1px solid @default-font-color-sub;
                    padding-left: 10px;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                }

                label {
                    color: @default-font-color-content;
                    line-height: 30px;
                    display: inline-block;
                    margin-left: 6px;
                    margin-right: 60px;
                    position: relative;
                    top: -4px;
                }

                input[type='radio'] {
                    width: 30px;
                    height: 30px;
                }

                select {
                    width: 100%;
                    background-color: #fff;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    height: 60px;
                    padding-left: 10px;
                    font-size: @default-font-size-30;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                }

                .photo-code {
                    display: inline-block;
                    width: 180px;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    background-color: #e70012;
                    color: #fff;
                    font-size: @default-font-size-28;
                    float: right;
                }

                .auto-width {
                    width: calc(100% - 170px);
                }

                .code-width {
                    width: calc(100% - 360px);
                }
            }

        }

        .button {
            button {
                width: 290px;
                height: 80px;
                background-color: #e70012;
                color: #fff;
                font-size: @default-font-size-30;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
            }
        }
    }
</style>