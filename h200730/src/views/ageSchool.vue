<template>
    <section class="ageSchool-container">

        <header class="header">年龄及专业</header>

        <div class="ageSchool-item">

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

        <div class="ageSchool-item">

            <Field
                    required
                    v-model="home_details"
                    rows="1"
                    autosize
                    label="详细地址"
                    type="textarea"
                    placeholder="请输入详细地址"/>

        </div>

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
                        @cancel="age_picker = false"/>
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
                        @cancel="education_picker = false"/>
            </Popup>

        </div>

        <div class="save-box">
            <button class="save" @click="save">保存年龄及专业</button>
        </div>

    </section>
</template>

<script>
    import {Field, Button, Picker, Area, Popup} from 'vant';
    import aera_json from '../utils/area'
    import {mapGetters} from 'vuex'

    export default {
        name: "ageSchool",
        components: {Field, Button, Picker, Area, Popup},
        data() {
            return {
                home: '',
                home_details: '',
                age: '',
                school: '',
                good_at: '',
                education: '',
                home_picker: false,
                home_columns: aera_json,
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
                education_picker: false,
                education_columns: ['小学', '初中', '技工学校', '职业高中', '普通高中', '中等专业学校', '大学专科', '大学本科', '硕士研究生', '博士研究生']
            }
        },
        methods: {
            /**
             * 保存信息
             * */
            save() {

                if (this.home === '') {
                    this.$Toast('籍贯不能为空');
                    return false;
                }

                if (this.home_details === '') {
                    this.$Toast('详细地址不能为空');
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

                if (this.good_at === '') {
                    this.$Toast('专业不能为空');
                    return false;
                }

                if (this.education === '') {
                    this.$Toast('学历不能为空');
                    return false;
                }

                console.log(this.home)
                console.log(this.home_details)
                console.log(this.age)
                console.log(this.school)
                console.log(this.good_at)
                console.log(this.education)

                // this.$store.dispatch('fetchData', {
                //     im: this.$Config.PROJECT_INTERFACE.add_user_resume,
                //     fps: {
                //         open_id: this.openid_info.back_value.open_id,
                //         native_place: '',
                //         date_of_birth: '',
                //         graduate_institutions: '',
                //         specialty: '',
                //         education_level: ''
                //     },
                //     url: this.$Config.REQUEST_URL
                // }).then(res => {
                //     if (res.back_value) {
                //         this.$router.push('/ageSchool');
                //     }
                // })

                // this.$router.push('/office')
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
             * 学校
             * */
            getSchool(res) {
                this.education = res;
                this.education_picker = false;
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
                'openid_info'
            ])
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