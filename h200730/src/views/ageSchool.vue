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
                    v-model="political"
                    label="政治面貌"
                    placeholder="请输入政治面貌"/>
        </div>

        <div class="ageSchool-item">
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
            <button class="save" @click="save">保存教育信息</button>
        </div>

    </section>
</template>

<script>
    import {Field, Button, Picker, Area, Popup} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: "ageSchool",
        components: {Field, Button, Picker, Area, Popup},
        data() {
            return {
                political: '',
                home_details: '',
                school: '',
                good_at: '',
                school_time: '',
                school_picker: false,
                school_columns: this.year(),
                education: '',
                education_picker: false,
                education_columns: ['初中', '高中', '大专', '本科']
            }
        },
        mounted() {
            let resume = this.resume_info.back_value;
            if (resume.length !== 0) {
                this.political = resume.political_status;
                this.school_time = resume.graduation_year;
                this.school = resume.graduate_institutions;
                this.good_at = resume.specialty;
                this.education = resume.education_level;
            }
        },
        methods: {
            /**
             * 保存信息
             * */
            save() {

                if (this.school === '') {
                    this.$Toast('毕业院校不能为空');
                    return false;
                }

                if (this.political === '') {
                    this.$Toast('政治面貌不能为空');
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
                        graduate_institutions: this.school,
                        political_status: this.political,
                        graduation_year: this.school_time,
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
            },
            getSchoolTime(res) {
                this.school_time = `${res}年`;
                this.school_picker = false;
            },
            year() {
                let a = [];
                for (let i = 1980; i <= 2020; i++) {
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