<template>
    <div class="loading-wrapper-phone">
        <div class="toast toast-loading">
            <div class="toast-loading-wrap">
                <div class="toast-loading-leaf" v-for="(v, i) in 12"
                     :style="{transform: `rotate(${30*i}deg) translate(7.92px)`, animationDelay: i*0.1+'s'}"></div>
            </div>
            <p class="toast-loading-text">请稍后...</p>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .loading-wrapper-phone {
        position: fixed;
        z-index: 1000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);

        .toast {
            left: 50%;
            top: 50%;
            transition-duration: .2s;
            transform: scale(0.9);
            z-index: 100;
            position: fixed;
            width: 200px;
            min-height: 200px;
            margin-top: -160px;
            margin-left: -100px;
            background: rgba(0, 0, 0, .8);
            text-align: center;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 26px;
        }

        .toast-loading-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100px;
        }

        .toast-loading-leaf {
            top: -1px;
            opacity: .25;
            animation: toast-loading 1.2s linear infinite;
        }

        .toast-loading-leaf:before {
            content: " ";
            position: absolute;
            width: 20px;
            height: 5px;
            background: #d1d1d5;
            box-shadow: 0 0 1px rgba(0, 0, 0, .0980392);
            border-radius: 1px;
            -webkit-transform-origin: left 50% 0;
            transform-origin: left 50% 0
        }
    }

    @keyframes toast-loading {
        0%,
        16.6767% {
            opacity: .25;
        }
        16.6867% {
            opacity: 1;
        }
        76.6767%,
        100% {
            opacity: .25;
        }
    }
</style>
