<template>
    <section class="uploader">

        <Uploader v-model="fileList"
                  :max-count="1"
                  accept=".pdf,image/*,.docx,.doc,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            <div v-if="fileList.length === 0" class="uploader-img">
                <img src="../assets/images/shangchuan.png" alt="">
            </div>
        </Uploader>

        <button class="save" @click="send">上传简历</button>

    </section>
</template>

<script>
    import {Uploader, Button} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: "uploader",
        components: {Uploader, Button},
        data() {
            return {
                fileList: []
            }
        },
        mounted() {
            this.$Utils.setDocumentTitle('上传简历');
        },
        methods: {
            send() {

                const that = this;

                if (that.fileList.length === 0) {
                    that.$Toast('请选择简历');
                    return false;
                }

                this.$Alert.show({
                    title: '提示',
                    alertContent: '确认投递此份简历',
                    async yes() {

                        that.$Toast.loading({
                            message: '正在上传，请稍后...',
                            forbidClick: true,
                            duration: 0,
                            overlay: true
                        });

                        let fileName = await that.getFileName(that.fileList[0].file.name);

                        let data = new FormData();
                        data.append('fps[open_id]', that.openid_info.back_value.open_id);
                        data.append('fps[img]', that.fileList[0].content);
                        data.append('fps[suffix]', fileName);

                        that.$store.dispatch('fetchData', {
                            im: that.$Config.PROJECT_INTERFACE.make_img_route,
                            fps: data,
                            url: that.$Config.REQUEST_URL,
                            method: 'post'
                        }).then(res => {

                            if (res.back_value) {
                                return that.$store.dispatch('fetchData', {
                                    im: that.$Config.PROJECT_INTERFACE.set_application_record,
                                    fps: {
                                        open_id: that.openid_info.back_value.open_id,
                                        company_id: '',
                                        job_info_id: that.$route.query.jobid,
                                        storage_path: res.back_value
                                    },
                                    url: that.$Config.REQUEST_URL
                                });
                            }

                        }).then((res) => {
                            if (res.back_value) {
                                that.$Toast.clear();
                                that.$Toast('上传完毕');
                                setTimeout(() => {
                                    that.$router.replace(`/officeDetails?id=${that.$route.query.jobid}&openid=${that.openid_info.back_value.open_id}`);
                                }, 2000)
                            }
                        })

                    }
                });

            },
            getFileName(file) {
                let first = file.lastIndexOf(".");//取到文件名开始到最后一个点的长度
                let namelength = file.length;//取到文件名长度
                return file.substring(first + 1, namelength);//截取获得后缀名
            }
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .uploader {
        height: 100%;
        display: grid;
        align-content: center;
        justify-items: center;

        .uploader-img {
            margin-bottom: 40px;
            font-size: 0;

            img {
                width: 300px;
            }
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
</style>