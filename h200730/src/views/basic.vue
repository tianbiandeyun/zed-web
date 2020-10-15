<template>
    <section class="basic-container">

        <header class="header">联系方式</header>

        <div class="basic-item">
            <Field
                    required
                    v-model="name"
                    label="姓名"
                    placeholder="请输入姓名"/>
        </div>

        <div class="basic-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="sex"
                    label="性别"
                    placeholder="点击选择性别"
                    @click="sex_picker = true"/>

            <Popup v-model="sex_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="sex_columns"
                        @confirm="getSex"
                        @cancel="sex_picker = false"/>
            </Popup>

        </div>

        <div class="basic-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="home"
                    label="籍贯"
                    placeholder="点击选择籍贯"
                    @click="home_picker = true"/>

            <Popup v-model="home_picker" position="bottom">

                <Area
                        title="标题"
                        :area-list="home_columns"
                        @confirm="getHome"
                        @cancel="home_picker = false"/>

            </Popup>
        </div>

        <div class="basic-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="age"
                    label="出生日期"
                    placeholder="点击选择出生日期"
                    @click="age_picker = true"/>

            <Popup v-model="age_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="age_columns"
                        @confirm="getAge"
                        @cancel="age_picker = false"/>
            </Popup>
        </div>

        <div class="basic-item">
            <Field
                    required
                    v-model="email"
                    label="电子邮件"
                    placeholder="请输入电子邮件"/>
        </div>

        <div class="basic-item">
            <Field
                    required
                    v-model="photo"
                    center
                    clearable
                    type="tel"
                    label="联系电话"
                    placeholder="请输入联系电话">
                <template #button>
                    <Button
                            size="small"
                            type="primary"
                            color="#f7931e"
                            @click="getCode"
                            :disabled="button_disabled">
                        {{message}}
                    </Button>
                </template>
            </Field>
        </div>

        <div class="basic-item">
            <Field
                    required
                    v-model="photo_code"
                    type="number"
                    label="验证码"
                    placeholder="请输入验证码"/>
        </div>

        <div class="save-box">
            <button class="save" @click="save">保存联系方式</button>
        </div>

    </section>
</template>

<script>
    import alert from '../components/alert/alert'
    import {Field, Button, Area, Picker, Popup} from 'vant';
    import aera_json from '../utils/area'
    import {mapGetters} from 'vuex';

    export default {
        name: "basic",
        components: {Field, Button, Area, Picker, Popup, alert},
        data() {
            return {
                name: '',
                sex: '',
                sex_columns: ['男', '女'],
                sex_picker: false,
                home: '',
                home_picker: false,
                home_columns: aera_json,
                age: '',
                age_picker: false,
                age_columns: [
                    {
                        values: this.year(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.month(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.day(),
                        defaultIndex: 0,
                    }
                ],
                email: '',
                photo: '',
                photo_code: '',
                message: '发送验证码', // 短信验证码按钮文字
                timer: null, // 定时器清除
                button_disabled: false, // 按钮禁用
            }
        },
        mounted() {
            // let resume = this.resume_info.back_value;
            // if (resume.length !== 0) {
            //     this.name = resume.name;
            //     this.sex = +resume.sex === 1 ? '男' : '女';
            //     this.email = resume.mail;
            //     this.phone = resume.photo;
            // }
        },
        methods: {
            /**
             * 获取验证码
             * */
            getCode() {

                if (this.photo === '') {
                    this.$Toast('电话不能为空');
                    return false;
                }

                this.$Toast.loading({
                    message: '发送中...',
                    forbidClick: true,
                    duration: 0,
                    overlay: true
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.send_phone_identifying_code,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        phonenum: this.photo
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        this.$Toast.clear();
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            let code = TIME_COUNT;
                            this.button_disabled = true;
                            this.message = `${TIME_COUNT}s后获取`;
                            this.timer = setInterval(() => {
                                if (code > 0 && code <= TIME_COUNT) {
                                    code--;
                                    this.message = `${code}s后获取`;
                                } else {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.message = '发送验证码';
                                    this.button_disabled = false;
                                }
                            }, 1000);
                        }
                    }
                })


            },
            /**
             * 选择性别
             * */
            getSex(value) {
                this.sex = value;
                this.sex_picker = false;
            },
            /**
             * 籍贯
             * */
            getHome(res) {
                this.home = `${res[0].name}-${res[1].name}-${res[2].name}`;
                this.home_picker = false;
            },
            /**
             * 年龄
             * */
            getAge(res) {
                this.age = `${res[0]}-${res[1]}-${res[2]}`;
                this.age_picker = false;
            },
            /**
             * 保存信息
             * */
            save() {

                if (this.name === '') {
                    this.$Toast('姓名不能为空');
                    return false;
                }

                if (this.sex === '') {
                    this.$Toast('性别不能为空');
                    return false;
                }

                if (this.email === '') {
                    this.$Toast('邮件不能为空');
                    return false;
                }

                if (this.photo === '') {
                    this.$Toast('电话不能为空');
                    return false;
                }

                if (this.photo_code === '') {
                    this.$Toast('验证码不能为空');
                    return false;
                }

                this.$Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                    overlay: true
                });


                // this.$store.dispatch('fetchData', {
                //     im: this.$Config.PROJECT_INTERFACE.add_user_resume,
                //     fps: {
                //         open_id: this.openid_info.back_value.open_id,
                //         name: this.name,
                //         sex: this.sex === '男' ? 1 : 2,
                //         mail: this.email,
                //         phone: this.photo,
                //         code: this.photo_code
                //     },
                //     url: this.$Config.REQUEST_URL
                // }).then(res => {
                this.$Toast.clear();
                //     if (res.back_value) {
                //         this.$router.replace('/ageSchool');
                //     }
                // })
            },
            year() {
                let a = [];
                for (let i = 1980; i < 2020; i++) {
                    a.push(i)
                }
                return a;
            },
            month() {
                let a = [];
                for (let i = 1; i < 13; i++) {
                    a.push(i < 10 ? `0${i}` : i)
                }
                return a;
            },
            day() {
                let a = [];
                for (let i = 1; i < 32; i++) {
                    a.push(i < 10 ? `0${i}` : i)
                }
                return a;
            },
        },
        computed: {
            ...mapGetters([
                'openid_info',
                'resume_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .basic-container {
        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .basic-item {
            padding: 10px;
            background-color: #fff;
        }

        .save-box {
            width: 100%;
            position: fixed;
            bottom: 80px;
            text-align: center;

            .save {
                font-size: @default-font-size-30;
                background-color: @default-app-color-primary;
                color: #fff;
                padding: 20px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
            }
        }
    }
</style>