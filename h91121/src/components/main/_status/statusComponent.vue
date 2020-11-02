<template>
    <section class="statusComponent">

        <!--操作栏-->
        <div class="status-btn">
            <button
                    :class="statusIndex === 0 ? 'status-btn-avtive' : ''"
                    @click="selectStatus(0,menuLeftIndex)"
            >
                全部({{getDisplayCountInfo}})
            </button>
            <button
                    :class="statusIndex === 1 ? 'status-btn-avtive' : ''"
                    v-if="menuLeftIndex !== 2"
                    @click="selectStatus(1,menuLeftIndex)"
            >
                待审阅({{waitView}})
            </button>
            <button
                    :class="statusIndex === 2 ? 'status-btn-avtive' : ''"
                    @click="selectStatus(2,menuLeftIndex)"
            >
                待使用({{waitUsed}})
            </button>
            <button
                    :class="statusIndex === 3 ? 'status-btn-avtive' : ''"
                    @click="selectStatus(3,menuLeftIndex)"
            >
                已用({{used}})
            </button>
            <button
                    :class="statusIndex === 4 ? 'status-btn-avtive' : ''"
                    v-if="menuLeftIndex !== 2"
                    @click="selectStatus(4,menuLeftIndex)"
            >
                禁用({{forbid}})
            </button>
        </div>

        <Spin size="large" fix v-if="spinShow"></Spin>

    </section>
</template>

<script>
    import status from './status.js'

    export default {
        name: "statusComponent",
        props: {
            /**
             * 选择的是第几个侧边栏
             * 1 是审核列表 2 是操作列表
             * */
            menuLeftIndex: {
                type: Number
            }
        },
        mixins: [status],
        data() {
            return {
                spinShow: true,
                statusIndex: 0, // 选择的第几个操作按钮
                waitView: '', // 待审阅
                waitUsed: '', // 待使用
                used: '', // 已用
                forbid: '', // 禁用
            }
        },
        created() {
            const that = this;
            /**
             * 获取-状态栏-各文章的数量
             * */
            that.statusInit();
        },
        methods: {
            /**
             * 控制选择第几个按钮高亮
             * 并且把选择的第几个状态按钮的索引发送到父级
             * */
            selectStatus(index, menuleftIndex) {
                const that = this;
                that.statusIndex = index;
                that.$emit('selectStatus', {'index': index, 'form': menuleftIndex});
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

    .statusComponent {
        margin-bottom: 10px;
        padding: 10px;

        #boxSizing;
        .status-btn {
            button {
                #boxSizing;
                padding: 10px 20px;
                font-size: 18px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                background-color: #f8f8f9;
                border: 1px solid #f8f8f9;
                margin-right: 20px;
                color: #000;
                text-align: center;
                cursor: pointer;
            }
            .status-btn-avtive {
                background-color: #2d8cf0;
                border: 1px solid #2d8cf0;
                color: #fff;
            }
        }
    }
</style>