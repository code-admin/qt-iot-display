<template>
<div class="wrap">
    <div class="content">
        <p> 降水量：53.6ml-气压：102kPa-PM 2.5:13（优）</p>
        <p> 风向：东南风-风速：21M/H（三级）</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'Weather',
    data() {

    }
}
</script>

<style lang="scss" scoped>
.wrap {
    height: 40px;
    overflow: hidden;
    position: absolute;
    top: 40;
    left: 5;
    width: 100%
}

p {
    margin: 0;
    height: 40px;
    width: 500px;
    overflow: hidden;
}

.content p {
    position: absolute;
}

@-webkit-keyframes anim1 {
    0% {
        top: 40px;
        opacity: 1
    }

    50% {
        top: -40px;
        opacity: 1
    }

    75% {
        top: -40px;
        opacity: 0
    }

    100% {
        top: 40px;
        opacity: 0
    }
}

@-webkit-keyframes anim2 {

    0% {
        top: -40px;
        opacity: 0
    }

    25% {
        top: 40px;
        opacity: 0
    }

    50% {
        top: 40px;
        opacity: 1
    }

    100% {
        top: -40px;
        opacity: 1
    }
}

/* .content p:nth-child(1) {
            background-color: red;
        }

        .content p:nth-child(2) {
            background-color: yellow;
        } */

.content p:nth-child(1) {

    -webkit-animation: anim1 10s linear infinite;
}

.content p:nth-child(2) {

    -webkit-animation: anim2 10s linear infinite;
}
</style>
