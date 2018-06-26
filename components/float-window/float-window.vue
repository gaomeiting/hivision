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
                <i class="iconfont icon-jisuanqi"></i>
                <p>价 格 <br>计 算</p>
            </li>
        </ul>
    </section>
</template>

<style lang="scss">

.float-window ul  {}
.float-window li  { width: 60px; height: 60px; line-height: 60px; text-align: center; color: #ff9900; border: 1px solid #f9f9f9; box-sizing: border-box; margin-bottom: 4px; background: rgba(255, 255, 255, 0.4); overflow: hidden; }
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
