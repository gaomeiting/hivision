<template>
    <nav>
        <div>
            <figure>
                <img src="~assets/img/logo.png">
            </figure>
            <ul>
                <li><nuxt-link to="/service">服务介绍</nuxt-link></li>
                <li>客户案例</li>
                <li><nuxt-link to="/searchVoice">寻找声音</nuxt-link></li>
                <li>价格估算</li>
            </ul>
            <ol>
                <li><nuxt-link to="/join">配音员入驻</nuxt-link></li>
                <li>注册</li>
                <li>登录</li>
            </ol>
        </div>
    </nav>
</template>

<style lang="scss">
nav { width: 100%; position: absolute; top: 0; }
nav > div { width: 1170px; margin:  0 auto; padding-top: 16px; display: flex; }
nav > div ol { width: 300px; }
nav > div ul { width: 760px; }
nav > div ol, nav > div ul { list-style: none; display: flex; }
nav > div li { line-height: 40px; color: #fff; font-size: 14px; margin-right: 30px; }
nav > div li a { color: #fff;}
nav > div ol li, nav > div ol li a, nav > div ol li a:hover { color: #ff9900; }
nav > div ol li:first-child { border: 1px solid #ff9900; padding:  0 0.5em; line-height: 24px; height: 24px; border-radius: 2px; margin-top: 6px; }
nav > div figure { width: 128px; height: 40px; margin-right: 30px; }
nav > div figure img { width: 100%; height: 100%; }
</style>
