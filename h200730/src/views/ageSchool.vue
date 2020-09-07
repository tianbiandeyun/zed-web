<template>
    <section class="ageSchool-container">

        <header class="header">年龄及专业</header>

        <div class="ageSchool-item">

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
                        @cancel="age_picker = false"
                />
            </Popup>

        </div>

        <div class="ageSchool-item">
            <Field
                    required
                    v-model="school"
                    label="毕业院校"
                    placeholder="请输入毕业院校"/>
        </div>

        <div class="ageSchool-item">
            <Field
                    required
                    v-model="good_at"
                    label="专业"
                    placeholder="请输入专业"/>
        </div>

        <div class="ageSchool-item">
            <Field
                    required
                    readonly
                    clickable
                    name="picker"
                    :value="education"
                    label="学历"
                    placeholder="点击选择学历"
                    @click="education_picker = true"/>

            <Popup v-model="education_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="education_columns"
                        @confirm="getSchool"
                        @cancel="education_picker = false"
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
                school: '',
                good_at: '',
                age: '',
                age_picker: false,
                age_columns: [
                    {
                        values: ['周一', '周二', '周三', '周四', '周五'],
                        defaultIndex: 0,
                    },
                    {
                        values: ['上午', '下午', '晚上'],
                        defaultIndex: 0,
                    },
                    {
                        values: ['1', '2', '3'],
                        defaultIndex: 0,
                    }
                ],
                education: '',
                education_picker: false,
                education_columns: ['男', '女']
            }
        },
        methods: {
            getAge(res) {
                console.log(res);
                this.age_picker = false;
            },
            getSchool(value) {
                this.education = value;
                this.education_picker = false;
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