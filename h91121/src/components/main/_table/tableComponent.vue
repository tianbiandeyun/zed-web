<template>
    <section class="tableComponent">

        <!--表格-->
        <div class="table">
            <table>
                <tr>
                    <th v-for="(item,index) in tableHeaderList" :key="index">{{item.tableHeader}}</th>
                </tr>
                <tr v-for="(item,index) in tableList" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.release_time === 'None' ? 'null' : item.release_time}}</td>
                    <td @click="articleDetails(item.id,index)" class="tableTitle">{{item.title}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.key_word}}</td>
                    <td>{{item.target_name}}</td>
                    <td>{{articleStatus[item.status]}}</td>
                </tr>
            </table>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>

        <!--加载更多-->
        <button class="table-more" @click="getMore">加载更多</button>

        <!--文章详情-->
        <c-articleDetails
                :id="articleId"
                :tableIndex="tableIndex"
                :tableList="tableList"
                :menuLeftIndex="menuLeftIndex"
                v-if="isShow"
                @close="listerClose">
        </c-articleDetails>

    </section>
</template>

<script>
    import table from './table'
    import cArticleDetails from '../_articleDetails/articleDetailsComponent'

    export default {
        name: "tableComponent",
        data() {
            return {
                isShow: false,
                /**
                 * 文章状态
                 * */
                articleStatus: {
                    '1': '待审阅',
                    '2': '待使用',
                    '3': '已用',
                    '4': '禁用'
                },
                /**
                 * _table-表格的表头
                 * */
                tableHeaderList: [
                    {'tableHeader': '数据库ID'},
                    {'tableHeader': '发布时间'},
                    {'tableHeader': '文章标题（点击标题预览）'},
                    {'tableHeader': '来源名称'},
                    {'tableHeader': '关键字'},
                    {'tableHeader': '抓取地址'},
                    {'tableHeader': '文章状态'},
                ],
                spinShow: true, // 控制loading
                start: 0, // 第几页
                count: 40, // 每次多少条
                tableList: null, // 表格数据
                articleId: null, // 文章ID
                tableIndex: 0, // 当前选择的是第几个 操作栏的按钮
            }
        },
        props: {
            /**
             * 第一级状态栏的，选择状态
             * */
            statusIndex: {
                type: Number
            },
            /**
             * 第二级筛选关键字选择的状态
             * */
            filterType: {
                type: Object
            },
            /**
             * 选择的是第几个侧边栏
             * 1 是审核列表 2 是操作列表
             * */
            menuLeftIndex: {
                type: Number
            }
        },
        mixins: [table],
        components: {cArticleDetails},
        async created() {
            const that = this;
            /**
             * 初始状态下默认显示全部状态下table数据
             * */
            await that.getAllTableList(that.start, that.count, '', '', '');
            that.spinShow = false;
        },
        methods: {
            /**
             * 获取更多数据
             * 全部 教育 财经
             * */
            getMore() {
                const that = this;

                switch (that.statusIndex) {
                    case 0:
                        that.start += 40;
                        that._typeOf(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        break;
                    case 1:
                        that.start += 40;
                        that._typeOf(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        break;
                    case 2:
                        that.start += 40;
                        that._typeOf(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        break;
                    case 3:
                        that.start += 40;
                        that._typeOf(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        break;
                    case 4:
                        that.start += 40;
                        that._typeOf(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        break;
                    default:
                }
            },
            _typeOf(start, count, status, sort, filterType) {
                const that = this;
                if (filterType === '全部') {
                    if (status === 0) {
                        that.getMoreTableData(start, count, '', sort, '')
                    } else {
                        that.getMoreTableData(start, count, status, sort, '')
                    }
                }
                if (filterType === '教育') {
                    if (status === 0) {
                        that.getMoreTableData(start, count, '', '', filterType)
                    } else {
                        that.getMoreTableData(start, count, status, sort, filterType)
                    }
                }
                if (filterType === '财经') {
                    if (status === 0) {
                        that.getMoreTableData(start, count, '', '', filterType)
                    } else {
                        that.getMoreTableData(start, count, status, sort, filterType)
                    }
                }
                if (filterType === '财经-金融') {
                    if (status === 0) {
                        that.getMoreTableData(start, count, '', '', filterType)
                    } else {
                        that.getMoreTableData(start, count, status, sort, filterType)
                    }
                }
            },
            /**
             * 打开文章详情
             * */
            articleDetails(articleId, tableIndex) {
                const that = this;
                that.tableIndex = tableIndex;
                that.articleId = +articleId;
                that.isShow = true;
            },
            /**
             * 关闭文章详情
             * */
            listerClose() {
                const that = this;
                that.isShow = false;
                that.$emit('close')
            }
        },
        watch: {
            /**
             * 监听状态栏点击的状态，来请求不同的数据
             * 0 全部 1 待审阅 2 待使用 3 已用 4 禁用
             * */
            statusIndex: {
                async handler() {
                    const that = this;
                    that.start = 0; // 初始化 分页加载
                    that.count = 40; // 初始化 分页加载
                    that.filter = []; // 初始化 筛选关键字 数组
                    that.spinShow = true;
                    if (that.statusIndex === 0) {
                        await that.getAllTableList(that.start, that.count, '', '', '');
                    }
                    if (that.statusIndex === 1) {
                        await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                    }
                    if (that.statusIndex === 2) {
                        await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                    }
                    if (that.statusIndex === 3) {
                        await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                    }
                    if (that.statusIndex === 4) {
                        await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                    }
                    that.spinShow = false;
                },
                deep: true,
                immediate: false
            },
            /**
             * 监听筛选关键字点击的状态，来请求不同的数据
             * '' 全部 其余参数是关键字
             * */
            filterType: {
                async handler() {
                    const that = this;
                    that.spinShow = true;
                    that.start = 0; // 初始化 分页加载
                    that.count = 40; // 初始化 分页加载

                    if (that.statusIndex === 0) {
                        if (that.filterType.filterType === '全部') {
                            await that.getAllTableList(that.start, that.count, '', '', '');
                        } else {
                            await that.getAllTableList(that.start, that.count, '', '', that.filterType.filterType);
                        }
                    }
                    if (that.statusIndex === 1) {
                        if (that.filterType.filterType === '全部') {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                        } else {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        }
                    }
                    if (that.statusIndex === 2) {
                        if (that.filterType.filterType === '全部') {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                        } else {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        }
                    }
                    if (that.statusIndex === 3) {
                        if (that.filterType.filterType === '全部') {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                        } else {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        }
                    }
                    if (that.statusIndex === 4) {
                        if (that.filterType.filterType === '全部') {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', '');
                        } else {
                            await that.getAllTableList(that.start, that.count, that.statusIndex, '', that.filterType.filterType);
                        }
                    }
                    that.spinShow = false;
                },
                deep: true,
                immediate: false
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

    .tableComponent {
        #boxSizing;

        .table {
            position: relative;
            table {
                width: 100%;
                text-align: center;
                .tableTitle {
                    cursor: pointer;
                    text-decoration: underline;
                    -webkit-transition: all .5s;
                    -moz-transition: all .5s;
                    -ms-transition: all .5s;
                    -o-transition: all .5s;
                    transition: all .5s;

                    &:hover {
                        background-color: #2d8cf0;
                        color: #fff;
                    }
                }
            }
            table, tr, th, td {
                border: 1px solid #dcdee2;
                padding: 20px;
            }

            th {
                font-size: 20px;
                font-weight: bold;
                color: #17233d;
            }
            margin-bottom: 20px;
        }
        .table-more {
            padding: 10px 20px;
            font-size: 18px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            background-color: #2d8cf0;
            border: 1px solid #2d8cf0;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
    }
</style>