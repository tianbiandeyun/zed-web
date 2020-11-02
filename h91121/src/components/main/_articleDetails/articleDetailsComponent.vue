<template>
    <section class="articleDetailsComponent">
        <div class="articleDetails-box">

            <div class="articleDetails-content">

                <!--关闭-->
                <img @click="close" class="articleDetails-close" src="../../../assets/images/article/close.png" alt="">

                <!--文章标题-->
                <div class="articleDetails-content-header">
                    <p>
                        ({{articleStatus[getContentInfo.status]}}){{getContentInfo.title}}
                        <button
                                class="tag-read"
                                :data-clipboard-text="getContentInfo.title"
                                @click="copyTitle">复制标题
                        </button>
                    </p>
                    <p>文章发布时间：<span>{{getContentInfo.date}}</span></p>
                    <p>责任编辑：<span>{{getContentInfo.editor}}</span></p>
                    <p>关键词：<span>{{getContentInfo.key_word}}</span></p>
                    <p>抓取链接：<a :href="getContentInfo.url" target="_blank">{{getContentInfo.url}}</a></p>
                    <p>来源站点：<span>{{getContentInfo.source}}</span></p>
                    <p>抓取站点：<span>{{getContentInfo.target_name}}</span></p>
                </div>

                <!--操作按钮 3 设置已用 2 设置审阅 4 设置禁止 -->
                <div class="articleDetails-content-operating">
                    <input v-if="menuLeftIndex === 2" type="button" @click="openArticleSet(3)" value="设置已用"
                           :disabled="+getContentInfo.status === 1 || +getContentInfo.status === 3 || +getContentInfo.status === 4"
                           :class="+getContentInfo.status === 1 || +getContentInfo.status === 3 || +getContentInfo.status === 4 ? 'inputDisabled' : ''">

                    <input type="button" value="上一篇" @click="prop()">
                    <input type="button" value="下一篇" @click="next()">

                    <div style="float: right">
                        <!--<input type="button" value="段落设置">-->

                        <input v-if="menuLeftIndex === 1" type="button" @click="openArticleSet(2)" value="审阅"
                               :disabled="+getContentInfo.status === 2 || +getContentInfo.status === 3"
                               :class="+getContentInfo.status === 2 || +getContentInfo.status === 3 ? 'inputDisabled' : ''">
                        <input v-if="menuLeftIndex === 1" type="button" class="articleDetails-content-operating-forbid"
                               @click="openArticleSet(4)"
                               value="禁用"
                               :disabled="+getContentInfo.status === 4"
                               :class="+getContentInfo.status === 4 ? 'inputDisabled' : ''">
                    </div>
                </div>

                <!--禁用理由-->
                <div class="forbidMsg animated fadeIn" v-if="isForbidMsg">
                    <input type="text" placeholder="请输入禁用理由，请仔细填写，以方便开发人员改进程序" v-model="forbidMsg">
                    <button @click="setForbidMsg">提交禁止原因</button>
                </div>

                <!--文章-->
                <div class="articleDetails-content-message" id="articleDetails-content-message">
                    <div class="articleDetails-content-message-border">
                        <div v-for="(item,index) in getContentInfo.content" :key="index">
                            <br/>
                            <img v-if="getRegx(item)" :src="item" alt="">
                            <p v-else>{{item}}</p>
                        </div>
                    </div>
                </div>

                <Spin size="large" fix v-if="spinShow"></Spin>

                <!--弹框-->
                <Modal v-model="modal"
                       title="提示"
                       @on-ok="asyncOK">
                    <p>{{modalMsg}}</p>
                </Modal>

            </div>
        </div>
    </section>
</template>

<script>
    import article from './article'
    import Clipboard from 'clipboard'

    export default {
        name: "articleDetailsComponent",
        props: {
            /**
             * 文章 ID
             * */
            id: {
                type: Number
            },
            /**
             * 表格的索引下表
             * */
            tableIndex: {
                type: Number
            },
            /**
             * 所有的表格数据
             * */
            tableList: {
                type: Array
            },
            /**
             * 选择的是第几个侧边栏
             * 1 是审核列表 2 是操作列表
             * */
            menuLeftIndex: {
                type: Number
            }
        },
        mixins: [article],
        data() {
            return {
                index: this.tableIndex, // 当前点击表格的索引，点击谁就是谁的索引
                articleStatus: {
                    '1': '待审阅',
                    '2': '待使用',
                    '3': '已用',
                    '4': '禁用'
                },
                spinShow: true, // 控制 loading 的显示
                modal: false, // 控制弹框的显示
                modalMsg: '', // modal 文字
                operatingBtn: '', // 操作的是第几个按钮
                isForbidMsg: false,// 控制 禁止原因是否显示
                forbidMsg: '', // 禁止原因
            }
        },
        async created() {
            const that = this;
            /**
             * 获取文章详情
             * */
            await that.getArticleDetails();
            /**
             * 判断是否用户是否具有审核权限
             * */
            await that._isJurisdiction();
        },
        methods: {
            /**
             * 全选文本
             * */
            copyText() {
            },
            /**
             * 复制标题
             * */
            copyTitle() {
                const clipboard = new Clipboard('.tag-read');
                clipboard.on('success', () => {
                    alert('复制成功');
                    // 释放内存
                    clipboard.destroy()
                });
                clipboard.on('error', () => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制');
                    // 释放内存
                    clipboard.destroy();
                })
            },
            /**
             * 关闭文章详情
             * */
            close() {
                const that = this;
                that.$emit('close')
            },
            /**
             * 设置禁止理由
             * */
            setForbidMsg() {
                const that = this;
                if (that.forbidMsg !== '') {
                    that.setArticleStatus(that.id, 4, that.forbidMsg);
                }
            },
            /**
             * 下一篇
             * */
            next() {
                const that = this;
                if (that.index + 1 >= that.tableList.length) {
                    return
                }
                that.spinShow = true;
                that.goNextArticleDetails()
            },
            /**
             * 上一篇
             * */
            prop() {
                const that = this;
                if (that.index <= 0) {
                    return
                }
                that.spinShow = true;
                that.goPropArticleDetails();
            },
            /**
             * 打开设置文章状态
             * */
            openArticleSet(type) {
                const that = this;

                switch (type) {
                    case 2:
                        that.modalMsg = '确定将表示该文章将进入待操作队列！';
                        that.modal = true;
                        that.operatingBtn = type;
                        break;
                    case 3:
                        that.modalMsg = '是否将文章设置为已用状态？';
                        that.modal = true;
                        that.operatingBtn = type;
                        break;
                    case 4:
                        that.isForbidMsg = !that.isForbidMsg;
                        break;
                    default:
                }
            },
            /**
             * 设置文章状态点击确定
             * */
            asyncOK() {
                const that = this;
                that.modal = false;
                switch (that.operatingBtn) {
                    case 2:
                        that.setArticleStatus(that.id, that.operatingBtn, '');
                        break;
                    case 3:
                        that.setArticleStatus(that.id, that.operatingBtn, '');
                        break;
                    default:
                }
            },
            /**
             * 正则匹配 网络地址
             * */
            getRegx(str) {
                const reg = /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
                return reg.test(str);
            }
        }
    }
</script>

<style lang="less">
    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .articleDetailsComponent {
        #boxSizing;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(000, 000, 000, .8);

        .articleDetails-box {
            #boxSizing;
            width: 100%;
            height: 100%;
            position: relative;
            padding-top: 40px;

            .articleDetails-content {
                #boxSizing;
                width: 60%;
                padding: 20px 40px;
                background-color: #fff;
                margin: 0 auto;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                overflow: hidden;

                .articleDetails-close {
                    width: 50px;
                    height: 50px;
                    cursor: pointer;
                    float: right;
                }

                .articleDetails-content-header {
                    margin-bottom: 10px;
                    p {
                        font-size: 20px;
                        color: #17233d;
                        line-height: 1.6;
                        &:nth-of-type(1) {
                            font-weight: bold;
                            font-size: 24px;
                        }
                        span {
                            font-size: 18px;
                            color: #515a6e;
                        }
                    }
                    .tag-read {
                        border-radius: 5px;
                        background-color: #2d8cf0;
                        border: 1px solid #2d8cf0;
                        margin-right: 20px;
                        color: #fff;
                        padding: 4px 20px;
                        font-size: 20px;
                        float: right;
                    }
                }
                .articleDetails-content-operating {
                    margin-bottom: 10px;
                    overflow: hidden;
                    input {
                        #boxSizing;
                        padding: 10px 20px;
                        font-size: 20px;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        background-color: #2d8cf0;
                        border: 1px solid #2d8cf0;
                        margin-right: 20px;
                        color: #fff;
                        text-align: center;
                        cursor: pointer;
                    }
                    .articleDetails-content-operating-forbid {
                        background-color: #ed4014;
                        border: #ed4014;
                    }
                    .inputDisabled {
                        background-color: #c5c8ce;
                        border: #c5c8ce;
                    }
                }
                .forbidMsg {
                    #boxSizing;
                    padding: 10px;
                    overflow: hidden;
                    input {
                        float: left;
                        #boxSizing;
                        border: 1px solid #E8E8E4;
                        width: 80%;
                        height: 50px;
                        padding-left: 20px;
                        font-size: 20px;
                    }
                    button {
                        #boxSizing;
                        float: right;
                        height: 50px;
                        padding: 0px 10px;
                        background-color: #ed4014;
                        border: #ed4014;
                        color: #fff;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
                .articleDetails-content-message {
                    #boxSizing;
                    border-top: 1px solid #E8E8E4;
                    height: 500px;
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                    padding: 0px 10px;
                    p {
                        font-size: 20px;
                        line-height: 1.6;
                        color: #17233d;
                    }
                }
            }
        }
    }
</style>