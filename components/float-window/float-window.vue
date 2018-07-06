<template>
    <section class="float-window">
        <ul>
            <li>
                <i class="iconfont icon-shandian"></i>
                <p>快 速 <br>配 音</p>
            </li>
            <li>
                <i class="iconfont icon-kefu"></i>
                <p>在 线 <br>客 服</p>
            </li>
            <li>
                <a href="/computedPrice">
                <i class="iconfont icon-jisuanqi"></i>
                <p>价 格 <br>计 算</p>
                </a>
            </li>
            <transition name="fade" mode="out-in">
            <li v-if="flag" @click.stop.prevent="scrollTop" :key="0">
                <a href="/computedPrice">
                <i class="iconfont icon-huidaodingbu"></i>
                <p>回 到 <br>顶 部</p>
                </a>
            </li>
            <li v-else style="opacity: 0" :key="1">
                <p>回 到 <br>顶 部</p>
            </li>
            </transition>
        </ul>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                flag: false
            }
        },
        mounted() {
            //设置滚动
             window.addEventListener('scroll', () => {
                this.flag = document.documentElement.scrollTop > 400 ? true : false;
              });

        },
        methods: {
            scrollTop() {
                document.documentElement.scrollTop = 0;
            }
        }
    }
</script>
<style lang="scss">

.float-window ul  {}
.float-window li  { width: 60px; height: 60px; line-height: 60px; text-align: center; color: #ff9900; border: 1px solid rgba(255,153,0,.4); box-sizing: border-box; margin-bottom: 4px; background: rgb(255, 255, 255); overflow: hidden; }
.float-window li a { color: #f90; }
.float-window li p { opacity: 0; }
.float-window li:hover p {
    line-height: 1.2;
    font-size: 18px;
    width: 60px;
    height: 60px;
    background: #ff9900;
    color: #fff;
    box-sizing: border-box;
    padding-top: 8px;
    transition: 0.3s ease-in;
    opacity: 1;
}
.float-window li:hover i {
    display: none;
}
.float-window li:hover { 
    cursor: pointer;
}

.float-window li i {
    display: block;
     font-size: 40px;
}
.float-window li:last-child {
    margin-bottom: 0;
}
</style>
