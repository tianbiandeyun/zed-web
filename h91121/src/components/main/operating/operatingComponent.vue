<template>
    <section class="operatingComponent">

        <Divider orientation="left" class="operating-divider">状态栏</Divider>

        <!--操作栏-->
        <c-status ref="status" @selectStatus="listerSelectStatus"
                  :menuLeftIndex="$route.params.menuLeftIndex"></c-status>

        <Divider orientation="left" class="review-divider">关键字筛选</Divider>

        <!--筛选-->
        <c-filter ref="filter" :statusJson="statusJson" @selectFilter="listerSelectFilter"></c-filter>

        <!--表格区域-->
        <c-table
                :statusIndex="statusIndex"
                :filterType="filterType"
                :menuLeftIndex="$route.params.menuLeftIndex"
                @close="listerClose">
        </c-table>

    </section>
</template>

<script>
    import cStatus from '../_status/statusComponent'
    import cFilter from '../_filter/filterComponent'
    import cTable from '../_table/tableComponent'

    export default {
        name: "operatingComponent",
        components: {cStatus, cFilter, cTable},
        data() {
            return {
                /**
                 * 选择的状态栏信息
                 * */
                statusJson: null,
                /**
                 * 总共需要几个选项卡，根据有几个状态栏按钮来设置
                 * */
                statusSum: 5,
                /**
                 * 当前选择的是第几个状态栏按钮
                 * */
                statusIndex: 0,
                /**
                 * 第二级筛选关键字选择的状态
                 * */
                filterType: {
                    'filterType': "全部"
                }
            }
        },
        created() {
        },
        methods: {
            /**
             * 第一级状态栏的，选择状态
             * */
            listerSelectStatus(parmes) {
                const that = this;
                that.statusJson = parmes;
                that.statusIndex = parmes.index;
                that.filterType = {
                    'filterType': "全部"
                };
            },
            /**
             * 第二级筛选关键字选择的状态
             * */
            listerSelectFilter(parmes) {
                const that = this;
                that.filterType = parmes;
            },
            /**
             * 关闭文章详情
             * 并且更新状态栏文章数量 / 关键字文章数量
             * */
            async listerClose() {
                const that = this;
                const _status = that.$refs.status;
                const _filter = that.$refs.filter;
                _status.statusInit();
                if (that.statusJson === null) {
                    return
                }
                if (that.statusJson.form === 1 && that.statusJson.index === 0) {
                    await _filter.getCrucialNumber('');
                    that.spinShow = false;
                } else if (that.statusJson.form === 2 && that.statusJson.index === 0) {
                    await _filter.getCrucialNumber('');
                    that.spinShow = false;
                } else {
                    await _filter.getCrucialNumber(that.statusJson.index);
                    that.spinShow = false;
                }
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

    .operatingComponent {
        #boxSizing;
        .operating-divider {
            font-size: 24px;
        }
    }
</style>