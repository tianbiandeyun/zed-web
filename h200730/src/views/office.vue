<template>
    <section class="offic-container">

        <header class="header">岗位相关信息（非必填）</header>

        <div class="office-item">
            <Field
                    v-model="political"
                    label="政治面貌"
                    placeholder="请输入政治面貌"/>
        </div>

        <div class="office-item">
            <Field
                    v-model="office"
                    label="期望岗位"
                    placeholder="请输入期望岗位"/>
        </div>

        <div class="office-item">
            <Field
                    v-model="self_message"
                    rows="2"
                    autosize
                    label="自我介绍"
                    type="textarea"
                    maxlength="100"
                    placeholder="自我介绍"
                    show-word-limit/>
        </div>

        <div class="office-item">
            <Field
                    v-model="certificate"
                    rows="2"
                    autosize
                    label="资格证书"
                    type="textarea"
                    maxlength="100"
                    placeholder="资格证书"
                    show-word-limit/>
        </div>

        <div class="save-box">
            <button class="jump">跳过此信息</button>
            <button class="save">保存岗位信息</button>
        </div>

    </section>
</template>

<script>
    import {Field} from 'vant';

    export default {
        name: "office",
        components: {Field},
        data() {
            return {
                political: '',
                office: '',
                self_message: '',
                certificate: ''
            }
        }
    }
</script>

<style lang="less" scoped>

    .offic-container {

        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .office-item {
            padding: 10px;
            background-color: #fff;
        }

        .save-box {
            width: 100%;
            position: fixed;
            bottom: 80px;
            text-align: center;

            .jump {
                font-size: @default-font-size-30;
                border: 4px solid @default-font-color-sub;
                color: @default-font-color-sub;
                padding: 16px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                margin-right: 20px;
            }

            .save {
                font-size: @default-font-size-30;
                background-color: @default-app-color-primary;
                color: #fff;
                padding: 20px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
            }
        }
    }

</style>