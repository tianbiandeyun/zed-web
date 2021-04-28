<template>
    <section class="text-container">
        {{name}}
        <button @click="sendName">emit</button>
    </section>
</template>
<script>
    import {
        ref
    } from 'vue'
    export default {
        name: 'test',
        props: {
            name: {
                type: String,
                default: 'name'
            }
        },
        setup(props, c) {
            let n = ref(props.name)

            const sendName = () => {
                c.emit('sendName', {
                    name: n.value.split('')
                })
            }

            return {
                n,
                sendName
            }
        }
    }
</script>
<style lang="less">

</style>