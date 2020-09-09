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
    import {Field, Button, Picker, Popup} from 'vant';

    export default {
        name: "basic",
        components: {Field, Button, Picker, Popup, alert},
        data() {
            return {
                name: '',
                sex: '',
                sex_columns: ['男', '女'],
                sex_picker: false,
                email: '',
                photo: '',
                photo_code: '',
                message: '发送验证码', // 短信验证码按钮文字
                timer: null, // 定时器清除
                button_disabled: false, // 按钮禁用
            }
        },
        methods: {
            /**
             * 获取验证码
             * */
            getCode() {
                const TIME_COUNT = 10;
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
            },
            /**
             * 选择性别
             * */
            getSex(value) {
                this.sex = value;
                this.sex_picker = false;
            },
            /**
             * 保存信息
             * */
            save() {
                this.$router.push('/ageSchool');
            }
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