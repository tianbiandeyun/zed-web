<template>
    <section class="office-item-container" @click="officeDetails">
        <div class="office-item-title">
            <p class="office">{{office.job_title}}</p>
            <p class="money">{{office.salary_cap}} /
                <span v-if="+office.type === 1">次</span>
                <span v-if="+office.type === 2">小时</span>
                <span v-if="+office.type === 3">天</span>
                <span v-if="+office.type === 4">月</span>
                <span v-if="+office.type === 5">面议</span>
            </p>
        </div>
        <div class="office-item-details">
            <p class="details">
                <span>{{office.location_area}} | {{office.job_nature}} | {{office.job_type}}</span>
            </p>
            <slot>
                <p class="position">没有传入任何东西</p>
            </slot>
        </div>
        <slot name="hot"></slot>
    </section>
</template>

<script>

    export default {
        name: "office_item",
        props: {
            office: {
                type: Object
            }
        },
        methods: {
            officeDetails() {
                this.$emit('details')
            }
        }
    }
</script>

<style lang="less" scoped>
    .office-item-container {
        background-color: #fff;
        padding: 10px 40px;
        margin-bottom: 20px;
        position: relative;

        .office-item-title {
            display: grid;
            grid-template-columns: 3fr 1fr;
            font-size: @default-font-size-34;
            color: @default-font-color-content;
            line-height: 2;

            .office {
            }

            .money {
                color: @default-app-color-primary;
                text-align: right;
            }
        }

        .office-item-details {
            font-size: @default-font-size-26;
            color: @default-font-color-sub;
            line-height: 2;

            .details {

                span {

                }
            }
        }

        .hot {
            width: 20px;
            position: absolute;
            top: 30px;
            left: 14px;
        }
    }
</style>