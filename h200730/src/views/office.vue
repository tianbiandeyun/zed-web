<template>
    <section class="offic-container">

        <header class="header">自我评价</header>

        <div class="office-item">
            <Field
                    v-model="self_message"
                    rows="2"
                    autosize
                    label="自我介绍"
                    type="textarea"
                    maxlength="150"
                    placeholder="自我介绍"
                    show-word-limit/>
        </div>

        <div class="save-box">
            <button class="save" @click="save">保存自我评价</button>
        </div>

    </section>
</template>

<script>
    import {Field} from 'vant';
    import {mapGetters} from 'vuex';

    export default {
        name: "office",
        components: {Field},
        data() {
            return {
                self_message: ''
            }
        },
        mounted() {
            let resume = this.resume_info.back_value;
            if (resume.length !== 0) {
                this.self_message = resume.self_introduction;
            }
        },
        methods: {
            /**
             * 保存信息
             * */
            save() {

                if (this.self_message === '') {
                    this.$Toast('自我介绍不能为空');
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
                        self_introduction: this.self_message
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.$Toast.clear();
                    if (res.back_value) {
                        this.$router.replace('/experience');
                    }
                })
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

    .offic-container {

        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .office-item {
            padding: 10px;
            background-color: #fff;
        }

        .save-box {
            width: 100%;
            position: fixed;
            bottom: 80px;
            text-align: center;

            .jump {
                font-size: @default-font-size-30;
                border: 4px solid @default-font-color-sub;
                color: @default-font-color-sub;
                padding: 16px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                margin-right: 20px;
            }

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