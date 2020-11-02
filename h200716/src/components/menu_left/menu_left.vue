<template>
    <section class="main-left-menu-container">
        <h1>关键词</h1>
        <div class="menu">

            <!--一级菜单-->
            <div v-for="(item,index) in first_menu_list" :key="index">

                <p
                        class="menu-item"
                        :class="first_menu_index === index ? 'menu-item-active' : '' "
                        @click="operShowSecondMenu(item,index)">
                    {{item}}
                </p>


                <!--二级菜单-->
                <div class="second-menu-list" v-if="first_menu_index === index">

                    <div class="second-menu-list-item"
                         :class="second_menu_index === second ? 'second-menu-list-active' : '' "
                         v-for="(item,second) in second_menu_list" :key="second"
                         @click="selectMenu(item.name,second)">
                        {{item.name}}（数量：{{item.count}}）
                    </div>

                </div>

            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "menu_left",
        props: {
            menuList: {
                type: Array
            }
        },
        data() {
            return {
                first_menu_index: '', // 选中的一级菜单的下标
                second_menu_index: '',// 选中的二级菜单的下标
                second_menu_list: [] // 二级菜单列表
            }
        },
        methods: {
            /**
             * 展开二级菜单
             * */
            operShowSecondMenu(res, index) {
                this.second_menu_index = '';
                this.first_menu_index = index;
                this.second_menu_list = this.menuList[index][res];
                this.$emit('selectMenu', this.menuList[index][res])
            },
            /**
             * 点击二级菜单前往查询
             * */
            selectMenu(name, index) {
                this.second_menu_index = index;
                this.$emit('selectMenu', name)
            }
        },
        computed: {
            /**
             * 一级菜单列表
             * */
            first_menu_list() {
                let _list = [];
                for (let i = 0; i < this.menuList.length; i++) {
                    for (let y in this.menuList[i]) {
                        _list.push(y);
                    }
                }
                return _list;
            }
        }
    }
</script>

<style lang="less" scoped>
    .main-left-menu-container {
        width: @default-menu-left-width;
        height: 100%;
        background-color: @default-app-color-background;
        float: left;
        overflow: scroll;
        text-align: center;

        h1 {
            font-size: @default-font-size-20;
            line-height: 2;
            color: @default-font-color-title;
        }

        .menu {
            font-size: @default-font-size-16;
            color: @default-font-color-content;
            cursor: pointer;

            .menu-item {
                font-size: @default-font-size-34;
                font-weight: bold;
                border-bottom: 1px solid @default-app-color-divider;
                line-height: 4;

                &:hover {
                    transition: all .3s;
                    background-color: @default-app-color-primary;
                    color: #fff;
                }
            }

            .second-menu-list {

                .second-menu-list-item {
                    line-height: 3;
                    border-bottom: 1px solid @default-app-color-divider;

                    &:hover {
                        transition: all .3s;
                        background-color: @default-app-color-primary;
                        color: #fff;
                    }

                }
            }

            .menu-item-active {
                background-color: @default-app-color-primary;
                color: #fff;
            }

            .second-menu-list-active {
                border-bottom: 1px solid @default-app-color-primary !important;
            }
        }
    }
</style>