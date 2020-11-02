<template>
    <div class="tipComponent animated fadeIn" v-if="show">
        <div class="prompt-box">
            <div class="prompt">
                <div class="prompt-title">
                    <span>{{title}}</span>
                </div>
                <div class="prompt-content">
                    {{content}}
                </div>
                <div class="prompt-btn">
                    <button @click="success">{{btn}}</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        name: 'tipComponent',
        components: {},
        data() {
            return {
                show: true,
                title: '提醒',
                content: '',
                btn: '确定'
            }
        },
        methods: {
            success() {
            }
        }
    }
</script>
<style lang="less">
    .prompt-box {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, .3);

        .prompt {
            position: absolute;
            width: 400px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fafafc;
            text-align: center;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 20px;
            overflow: hidden;

            .prompt-title {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 20px;
                font-size: 30px;
            }

            .prompt-content {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 20px 10px 40px 10px;
                font-size: 30px;
            }

            .prompt-btn {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;

                button {
                    width: 100%;
                    height: 50px;
                    color: #fff;
                    background-image: linear-gradient(to right, #ff5f68, #ffd69f);
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
    }
</style>

