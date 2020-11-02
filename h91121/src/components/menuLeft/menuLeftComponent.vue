<template>
    <section class="menuLeftComponent">

        <!--menu-logo-->
        <div class="menuLeft">
            <h1>管理员控制台</h1>
        </div>

        <!--menu-list-->
        <div class="menuList">
            <div class="menuList-item" :class="menuListItemStatus === index ? 'menuListActive' : ''"
                 v-for="(item,index) in menuList" :key="index" @click="menuListItem(index)">
                <img :src='item.icon' :alt="item.title"/>
                <span>{{item.title}}</span>
            </div>
        </div>

    </section>
</template>

<script>
    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "menuLeftComponent",
        data() {
            return {
                /**
                 * 侧边栏内容
                 * */
                menuList: [
                    {'icon': require('../../../src/assets/images/menuList/summary.png'), 'title': '信息概要'},
                    {'icon': require('../../../src/assets/images/menuList/review.png'), 'title': '审核列表'},
                    {'icon': require('../../../src/assets/images/menuList/operating.png'), 'title': '操作列表'}
                ],
                /**
                 * 控制侧边栏选中的是第几个
                 * */
                menuListItemStatus: 0
            }
        },
        created() {
        },
        methods: {
            /**
             * 侧边栏选择，并且发送选择的是第几个栏目到 start
             *  type = 2 审核 3操作
             * */
            async menuListItem(i) {
                const that = this;

                if (i === 1) {
                    // await that.isJurisdiction();
                    console.log(that.getUserInfoInfo.type);
                    if (+that.getUserInfoInfo.type === 2) {
                        that.menuListItemStatus = i;
                        that.$emit('menuLeftIndex', {'menuLeftIndex': i})
                    } else {
                        alert('您暂时没有审核权限！')
                    }
                } else {
                    that.menuListItemStatus = i;
                    that.$emit('menuLeftIndex', {'menuLeftIndex': i})
                }

            },
            /**
             * 点击审核按钮，判断是否用户是否具有审核权限
             * */
            async isJurisdiction() {
                const that = this;
                await that.$store.dispatch('_isHasAuditRight', {
                    im: config.requestInterface.hasAuditRight,
                    fps: {},
                    url: config.CONST_FETCH_REQUEST_URI
                });
            }
        },
        computed: {
            ...mapGetters([
                // 'isHasAuditRightInfo',
                'getUserInfoInfo'
            ])
        }
    }
</script>

<style lang="less">
    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .menuLeftComponent {
        background-color: #f8f8f9;
        #boxSizing;
        width: 340px;
        height: calc(100% - 100px);
        float: left;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 10px 30px;

        .menuLeft {
            #boxSizing;
            text-align: center;
            line-height: 2;
            border-bottom: 1px solid #dcdee2;
            margin-bottom: 20px;
            h1 {
                font-size: 24px;
                color: #17233d;
            }
        }

        .menuList {
            #boxSizing;
            padding: 5px 0px;
            .menuList-item {
                border-bottom: 1px solid #dcdee2;
                padding: 6px 0;
                margin-bottom: 0px;
                cursor: pointer;
                -webkit-transition: all .5s;
                -moz-transition: all .5s;
                -ms-transition: all .5s;
                -o-transition: all .5s;
                transition: all .5s;

                span {
                    line-height: 40px;
                    vertical-align: top;
                    margin-left: 30px;
                    font-size: 20px;
                }

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-left: 20px;
                }

                &:hover {
                    background-color: #2d8cf0;
                    color: #fff;
                }
            }
            .menuListActive {
                background-color: #2d8cf0;
                color: #fff;
            }
        }
    }
</style>