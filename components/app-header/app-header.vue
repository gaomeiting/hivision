<template>
    <nav>
        <div>
            <figure>
                <img src="~assets/img/logo.png">
            </figure>
            <ul>
                <li><nuxt-link to="/service">服务介绍</nuxt-link></li>
                <li><nuxt-link to="/customer"> 客户案例 </nuxt-link></li>
                <li><nuxt-link to="/searchVoice">寻找声音</nuxt-link></li>
                <li><nuxt-link to="/compute">价格估算</nuxt-link></li>
            </ul>
            <ol>
                <li><nuxt-link to="/join">配音员入驻</nuxt-link></li>
                <li><nuxt-link to="/regist">注册</nuxt-link></li>
                <li><nuxt-link to="/login">登录</nuxt-link></li>
            </ol>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav { 
    width: 100%;
    position: absolute;
    top: 0;

    > div { 
        width: 1170px;
        margin:  0 auto;
        padding-top: 16px;
        display: flex;
        figure { 
            width: 128px;
            height: 40px;
            margin-right: 30px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        ol, ul {
            display: flex;
        }
        ol { 
            width: 300px;
            li {
                &:first-child { 
                    border: 1px solid #ff9900;
                    padding:  0 0.5em;
                    line-height: 24px;
                    height: 24px;
                    border-radius: 2px;
                    margin-top: 6px;
                }
            }
        }
        ul { 
            width: 760px;
        }
        li {
            line-height: 40px;
            font-size: 14px;
            margin-right: 30px;
            
        }
    }
}


</style>
