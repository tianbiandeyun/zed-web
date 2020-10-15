<template>
    <section class="ageSchool-container">

        <header class="header">教育信息</header>

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
                home_details: '',
                school: '',
                good_at: '',
                education: '',
                education_picker: false,
                education_columns: ['小学', '初中', '技工学校', '职业高中', '普通高中', '中等专业学校', '大学专科', '大学本科', '硕士研究生', '博士研究生']
            }
        },
        mounted() {
            // let resume = this.resume_info.back_value;
            // if (resume.length !== 0) {
            //     this.home = resume.native_place;
            //     this.home_details = resume.address;
            //     this.age = resume.date_of_birth;
            //     this.school = resume.graduate_institutions;
            //     this.good_at = resume.specialty;
            //     this.education = resume.education_level;
            // }
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
                        native_place: this.home,
                        address: this.home_details,
                        date_of_birth: this.age,
                        graduate_institutions: this.school,
                        specialty: this.good_at,
                        education_level: this.education
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.$Toast.clear();
                    if (res.back_value) {
                        this.$router.replace('/office');
                    }
                })
            },
            /**
             * 学校
             * */
            getSchool(res) {
                this.education = res;
                this.education_picker = false;
            }
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