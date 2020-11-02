<template>
    <section class="filterComponent">

        <!--关键字筛选-->
        <div class="filter-btn" v-if="filterIsShow">

            <button
                    v-for="(item,index) in [...[{'key_word': '全部','count':calculation(getKeyWordCountInfo)}],...getKeyWordCountInfo]"
                    :key="index"
                    :class="filterIndex === index ? 'filter-btn-avtive' : ''"
                    @click="selectFilter(item.key_word,index)">
                {{item.key_word}}({{item.count}})
            </button>

        </div>

        <Spin size="large" fix v-if="spinShow"></Spin>

    </section>
</template>

<script>

    import filter from './filter'

    export default {
        name: "filterComponent",
        props: {
            statusJson: {
                type: Object
            }
        },
        data() {
            return {
                spinShow: true,
                filterIndex: 0, // 选择的第几个操作按钮
                filterIsShow: false // 防止开始之后 calculation 函数无法获得参数导致报错
            }
        },
        mixins: [filter],
        async created() {
            const that = this;
            /**
             * 初始状态下默认显示全部筛选的关键字和关键字数量
             * */
            await that.getCrucialNumber('');
            that.spinShow = false;
            that.filterIsShow = true;
        },
        methods: {
            /**
             * 控制筛选关键字的点击的高亮状态
             * 并且把选择的状态发送至 table 组件
             * */
            selectFilter(type, index) {
                const that = this;
                that.filterIndex = index;
                that.$emit('selectFilter', {'filterType': type});
            },
            /**
             * 计算筛选关键子的文章总和
             * */
            calculation(o) {
                let sum = 0;
                o.forEach((item) => {
                    sum += parseInt(item.count);
                });
                return sum;
            }
        },
        watch: {
            /**
             * 监听点击的是第几个状态栏，分别获取不同状态栏下，筛选关键字
             * */
            statusJson: {
                async handler() {
                    const that = this;
                    that.spinShow = true;
                    that.filterIndex = 0; // 切换状态之后初始化筛选关键字,选中状态
                    if (that.statusJson.form === 1 && that.statusJson.index === 0) {
                        await that.getCrucialNumber('');
                        that.spinShow = false;
                    } else if (that.statusJson.form === 2 && that.statusJson.index === 0) {
                        await that.getCrucialNumber('');
                        that.spinShow = false;
                    } else {
                        await that.getCrucialNumber(that.statusJson.index);
                        that.spinShow = false;
                    }
                },
                deep: true,
                immediate: false,
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

    .filterComponent {
        margin-bottom: 10px;
        padding: 10px;

        #boxSizing;
        .filter-btn {
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
            .filter-btn-avtive {
                background-color: #2d8cf0;
                border: 1px solid #2d8cf0;
                color: #fff;
            }
        }
    }
</style>