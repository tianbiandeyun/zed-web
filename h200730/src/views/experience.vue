<template>
    <section class="experience-container">
        <header class="header">添加工作经历（非必填）</header>

        <div class="experience-item">
            <Field
                    v-model="unit"
                    label="工作单位"
                    placeholder="请输入工作单位"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="post"
                    label="岗位名称"
                    placeholder="请输入岗位名称"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="industry"
                    label="所属行业"
                    placeholder="请输入所属行业"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="word"
                    rows="2"
                    autosize
                    label="工作描述"
                    type="textarea"
                    maxlength="100"
                    placeholder="工作描述"
                    show-word-limit/>
        </div>

        <div class="save-box">
            <button class="jump">跳过此信息</button>
            <button class="save">保存工作经历</button>
        </div>
    </section>
</template>

<script>
    import {Field} from 'vant';

    export default {
        name: "experience",
        components: {Field},
        data() {
            return {
                unit: '',
                post: '',
                industry: '',
                word: ''
            }
        },
    }
</script>

<style lang="less" scoped>
    .experience-container {

        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .experience-item {
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