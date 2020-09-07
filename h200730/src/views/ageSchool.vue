<template>
    <section class="ageSchool-container">

        <header class="header">年龄及专业</header>

        <div class="ageSchool-item">
            <Field
                    required
                    v-model="name"
                    label="毕业院校"
                    placeholder="请输入毕业院校"/>
        </div>

        <div class="ageSchool-item">
            <Field
                    required
                    v-model="name"
                    label="专业"
                    placeholder="请输入专业"/>
        </div>

        <div class="ageSchool-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="sex"
                    label="学历"
                    placeholder="点击选择学历"
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

    </section>
</template>

<script>
    import {Field, Button, Picker, Popup} from 'vant';

    export default {
        name: "ageSchool",
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
    .ageSchool-container {
        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .ageSchool-item {
            padding: 10px;
            background-color: #fff;
        }
    }
</style>