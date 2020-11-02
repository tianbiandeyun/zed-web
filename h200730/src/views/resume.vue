<template>
    <section class="resume-container">

        <div class="header">
            <div class="user-photo"><img :src="user_photo" alt=""></div>
            <div class="user-name">{{user_name}}</div>
        </div>

        <div class="user-info">
            <h1>基本信息</h1>
            <p>
                <span>姓名：</span>
                <span>{{resume.name}}</span>
            </p>
            <p>
                <span>性别：</span>
                <span>{{+resume.sex === 1 ? '男' : '女'}}</span>
            </p>
            <p>
                <span>出生日期：</span>
                <span>{{resume.date_of_birth}}</span>
            </p>
            <p>
                <span>联系电话：</span>
                <span>{{resume.phone}}</span>
            </p>
            <p>
                <span>毕业学校：</span>
                <span>{{resume.graduate_institutions}}</span>
            </p>
            <p>
                <span>毕业时间：</span>
                <span>{{resume.graduation_year}}</span>
            </p>
            <p>
                <span>所学专业：</span>
                <span>{{resume.specialty}}</span>
            </p>
        </div>

        <div class="save-box">
            <button class="save" @click="modify">修改个人信息</button>
        </div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "resume",
        data() {
            return {
                resume: {},
                user_name: '',
                user_photo: ''
            }
        },
        async mounted() {

            const that = this;

            this.$Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });

            if (this.resume_info.back_value.length === 0) {

                this.$Alert.show({
                    title: '提示',
                    alertContent: '暂无个人信息，是否添加？',
                    yesText: '添加',
                    noText: '取消',
                    yes() {
                        that.$router.push('/basic');
                    },
                    no() {
                        that.$router.replace('/');
                    }
                });

                this.$Toast.clear();
                return false;
            }

            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.getplayerinfo,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.user_name = res.back_value.nickname;
                this.user_photo = res.back_value.userphoto;
                this.resume = this.resume_info.back_value;
                this.$Toast.clear();
            });

        },
        methods: {
            modify() {
                this.$router.replace('/basic')
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
    .resume-container {

        .header {
            height: 360px;
            background-image: url("../assets/images/userinfo.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: grid;
            align-content: center;
            justify-content: center;
            justify-items: center;
            grid-row-gap: 20px;

            .user-name {
                font-size: 40px;
            }

            .user-photo {
                font-size: 0;
                width: 180px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                overflow: hidden;
                border: 10px solid #f8bb75;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .user-info {
            width: 660px;
            margin: 0 auto;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            padding: 20px;
            position: relative;
            top: -40px;
            background-color: #fff;

            p {
                line-height: 2;
                font-size: 34px;
                display: grid;
                grid-template-columns: .3fr .7fr;

                span {

                    &:nth-of-type(1) {
                    }

                    &:nth-of-type(2) {
                        padding-left: 20px;
                    }
                }
            }
        }

        .save-box {
            width: 100%;
            text-align: center;
            margin-bottom: 40px;

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