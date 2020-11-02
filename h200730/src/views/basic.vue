<template>
    <section class="basic-container">

        <header class="header">基本信息</header>

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
                    v-model="school"
                    label="毕业院校"
                    placeholder="请输入毕业院校"/>
        </div>

        <div class="basic-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="school_time"
                    label="毕业年份"
                    placeholder="点击选择毕业年份"
                    @click="school_picker = true"/>

            <Popup v-model="school_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="school_columns"
                        @confirm="getSchoolTime"
                        @cancel="school_picker = false"/>
            </Popup>
        </div>

        <div class="basic-item">
            <Field
                    required
                    v-model="good_at"
                    label="专业"
                    placeholder="请输入专业"/>
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
            <button class="save" @click="save">保存基本信息</button>
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
                school: '',
                school_time: '',
                school_picker: false,
                school_columns: this.schollYear(),
                good_at: '',
                sex_columns: ['男', '女'],
                sex_picker: false,
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
                photo: '',
                photo_code: '',
                message: '发送验证码', // 短信验证码按钮文字
                timer: null, // 定时器清除
                button_disabled: false, // 按钮禁用
            }
        },
        mounted() {
            let resume = this.resume_info.back_value;
            if (resume.length !== 0) {
                this.name = resume.name;
                this.sex = +resume.sex === 1 ? '男' : '女';
                this.school_time = resume.graduation_year;
                this.school = resume.graduate_institutions;
                this.good_at = resume.specialty;
                this.age = resume.date_of_birth;
                this.photo = +resume.phone;
            }
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
                    } else {
                        this.$Toast.clear();
                        if (res.error_code === 6180516006) {
                            this.$Toast(res.error_info);
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
             * 年龄
             * */
            getAge(res) {
                this.age = `${res[0]}-${res[1]}-${res[2]}`;
                this.age_picker = false;
            },
            getSchoolTime(res) {
                this.school_time = `${res}年`;
                this.school_picker = false;
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

                if (this.age === '') {
                    this.$Toast('出生日期不能为空');
                    return false;
                }

                if (this.school === '') {
                    this.$Toast('毕业院校不能为空');
                    return false;
                }

                if (this.school_time === '') {
                    this.$Toast('毕业年份');
                    return false;
                }

                if (this.good_at === '') {
                    this.$Toast('专业不能为空');
                    return false;
                }

                if (this.photo === '') {
                    this.$Toast('电话不能为空');
                    return false;
                }

                if (+this.resume_info.back_value.phone) {
                    if (+this.photo !== +this.resume_info.back_value.phone) {
                        if (this.photo_code === '') {
                            this.$Toast('验证码不能为空');
                            return false;
                        }
                    }
                } else {
                    if (this.photo_code === '') {
                        this.$Toast('验证码不能为空');
                        return false;
                    }
                }

                this.$Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                    overlay: true
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.add_user_resume,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        name: this.name,
                        sex: this.sex === '男' ? 1 : 2,
                        graduate_institutions: this.school,
                        date_of_birth: this.age,
                        graduation_year: this.school_time,
                        specialty: this.good_at,
                        phone: +this.photo === +this.resume_info.back_value.phone ? '' : this.photo,
                        code: this.photo_code
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.$Toast.clear();
                    if (res.back_value) {

                        // 如果有 职位ID 则表示是从 职位详情过来的
                        if (this.$route.query.jobid) {
                            this.$router.push(`/uploader?jobid=${this.$route.query.jobid}`);
                        } else {
                            this.$router.replace('/');
                        }

                    }
                })
            },
            year() {
                let a = [];
                for (let i = 1980; i < 2021; i++) {
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
            schollYear() {
                let a = [];
                for (let i = 1980; i <= 2023; i++) {
                    a.push(i)
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
            /*position: fixed;*/
            /*bottom: 80px;*/
            text-align: center;
            padding-top: 100px;

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