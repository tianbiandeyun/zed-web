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
                    @click="showPicker = true"/>

            <Popup v-model="showPicker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                />
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
                    placeholder="请输入联系电话"
            >
                <template #button>
                    <Button size="small" type="primary" color="#f7931e">发送验证码</Button>
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
            <button class="save">保存联系方式</button>
        </div>

    </section>
</template>

<script>
    import {Field, Button, Picker, Popup} from 'vant';

    export default {
        name: "basic",
        components: {Field, Button, Picker, Popup},
        data() {
            return {
                name: '',
                sex: '',
                columns: ['男', '女'],
                showPicker: false,
                email: '',
                photo: '',
                photo_code: ''
            }
        },
        methods: {
            onConfirm(value) {
                this.sex = value;
                this.showPicker = false;
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