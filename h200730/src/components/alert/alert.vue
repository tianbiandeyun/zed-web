<template>
    <section class="alert-container" v-if="alert_show">
        <div class="alert">
            <h2>{{title}}</h2>
            <p>{{alertContent}}</p>

            <div class="alert-button">
                <button class="alert-end" @click="end">{{noText}}</button>
                <button class="alert-save" @click="save">{{yesText}}</button>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        name: "alert",
        props: {
            title: {
                type: String,
                default: '标题'
            },
            alertContent: {
                type: String,
                default: '标题内容'
            },
            yesText: {
                type: String,
                default: '确认'
            },
            noText: {
                type: String,
                default: '取消'
            },
            yes: {
                type: Function
            },
            no: {
                type: Function
            }
        },
        data() {
            return {
                alert_show: false
            }
        },
        methods: {
            show() {
                this.alert_show = true;
            },
            save() {
                this.alert_show = false;
                this.yes();
            },
            end() {
                this.alert_show = false;
                this.no();
            }
        }
    }
</script>

<style lang="less" scoped>
    .alert-container {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 999;
        display: grid;
        justify-items: center;
        align-items: center;

        .alert {
            background-color: #fff;
            width: 600px;
            padding: 20px;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            text-align: center;

            h2 {
                font-size: @default-font-size-34;
                line-height: 2;
                margin-bottom: 20px;
                color: @default-font-color-title
            }

            p {
                font-size: @default-font-size-26;
                line-height: 1.4;
                margin-bottom: 20px;
                color: @default-font-color-content
            }

            .alert-button {
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-items: center;
                align-items: center;

                button {
                    width: 260px;
                    font-size: @default-font-size-30;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                    padding: 20px 0;

                    &:nth-of-type(1) {
                        border: 4px solid @default-font-color-sub;
                        color: @default-font-color-sub;
                        background-color: transparent;
                    }

                    &:nth-of-type(2) {
                        background-color: @default-app-color-primary;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>