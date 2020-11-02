<template>
    <section class="main-container">

        <menu-left
                @selectMenu="lister_selectMenu"
                :menu-list="menu_list">
        </menu-left>

        <main-content
                :keyWord="key_word">
        </main-content>

    </section>
</template>

<script>
    import menuLeft from '../components/menu_left/menu_left'
    import mainContent from '../components/content/content'

    export default {
        name: "main-container",
        components: {menuLeft, mainContent},
        data() {
            return {
                menu_list: [],
                key_word: ''
            }
        },
        created() {
            this.refreshMenu()
        },
        methods: {
            /**
             * 查询点击的关键字
             * */
            lister_selectMenu(res) {
                if (this.$unit.typeOf(res) === 'string') {
                    this.key_word = res
                } else {
                    let k = [];
                    for (let i = 0; i < res.length; i++) {
                        k.push(res[i].name)
                    }
                    this.key_word = k.join('|')
                }
            },
            refreshMenu() {
                this.$store.dispatch("_getKeyword", {
                    im: this.$config.requestInterface.get_keyword,
                    fps: {},
                    url: this.$config.CONST_FETCH_REQUEST_URI
                }).then(res => {
                    this.menu_list = res.data.back_value;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .main-container {
        // main 高度
        height: calc(100% - @main-height);
    }
</style>