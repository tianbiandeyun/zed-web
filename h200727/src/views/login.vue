<template>
    <section class="login-container">

        <div class="logo">
            <img src="../assets/images/log.png" alt="">
        </div>

        <div class="content">
            <div class="first">
                <p>一级团组织</p>
                <label class="option">
                    <select v-model="first_active" @change="changFirst($event)">
                        <option
                                v-for="(item,index) in first_list"
                                :key="index"
                                :value='item'>
                            {{item}}
                        </option>
                    </select>
                </label>
            </div>
            <div class="second">
                <p>二级团组织</p>
                <label class="option">
                    <select v-model="second_active">
                        <option
                                v-for="(item,index) in second"
                                :key="index"
                                :value='item'>
                            {{item}}
                        </option>
                    </select>
                </label>
            </div>
        </div>

        <div class="button">
            <button @click="submit">立即参与</button>
        </div>

        <loading :show="show"></loading>

    </section>
</template>

<script>
    import share from '../utils/share'
    import {mapGetters} from 'vuex'

    export default {
        name: "login",
        mixins: [share],
        data() {
            return {
                show: false,
                first_list: ["A", "B", "C"],
                first_active: "A",
                second_list: {
                    'A': ['a1', 'a2', 'a3', 'a4'],
                    'B': ['b1', 'b2', 'b3', 'b4'],
                    'C': ['c1', 'c2', 'c3', 'c4'],
                },
                second_active: 'a1'
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('创新创业大讲堂');

            // 设置 PV
            this.$store.dispatch('_setPv', {
                im: this.$config.PROJECT_INTERFACE.set_pv_statistics,
                fps: {
                    info_key: '组织组册',
                },
                url: this.$config.REQUEST_URL
            });

        },
        methods: {
            changFirst(event) {
                let optionVal = event.target.value;
                this.first_active = optionVal;
                this.second_active = this.second_list[optionVal][0];
            },
            submit() {
                this.show = true;
                this.$store.dispatch('_setOrganization', {
                    im: this.$config.PROJECT_INTERFACE.set_user_organization,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                        level_1_organization: this.first_active,
                        level_2_organization: this.second_active
                    },
                    url: this.$config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        this.show = false;
                        this.$router.push('/info')
                    } else {
                        this.show = false;
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'getOpenid_info'
            ]),
            second() {
                return this.second_list[this.first_active]
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        height: 100%;
        display: grid;
        grid-template-rows: 3fr 2fr 2fr;
        justify-items: center;
        align-items: center;

        .logo {

            img {
                height: 300px;
            }
        }

        .content {
            padding: 0 40px;
            width: 100%;

            p {
                font-size: @default-font-size-36;
                line-height: 2;
            }

            select {
                width: 100%;
                background-color: #fff;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                height: 60px;
                padding-left: 10px;
                font-size: @default-font-size-36;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
            }

            .first {
                margin-bottom: 40px;
            }

        }

        .button {

            button {
                width: 290px;
                height: 80px;
                background-color: #e70012;
                color: #fff;
                font-size: @default-font-size-30;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
            }
        }
    }
</style>