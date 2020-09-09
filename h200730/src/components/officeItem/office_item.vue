<template>
    <section class="office-item-container">
        <div class="office-item-title">
            <p class="office">{{office.job_title}}</p>
            <p class="money">{{office.salary_cap}}-{{office.salary_floor}}K</p>
        </div>
        <div class="office-item-details">
            <p class="details">
                <span>{{office.location_area}} | {{office.street}} | {{office.job_nature}} | {{office.job_type}}</span>
            </p>
            <slot>
                <p class="position">没有传入任何东西</p>
            </slot>
        </div>
    </section>
</template>

<script>

    export default {
        name: "office_item",
        props: {
            office: {
                type: Object
            }
        }
    }
</script>

<style lang="less" scoped>
    .office-item-container {
        background-color: #fff;
        padding: 10px 40px;
        margin-bottom: 20px;

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
    }
</style>