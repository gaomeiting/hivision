<template>
    <nav>
        <div>
            <figure>
                <nuxt-link to="/">
                    <img src="~assets/img/logo.png">
                </nuxt-link>
            </figure>
            <ul>
                <li><nuxt-link to="/service">服务介绍</nuxt-link></li>
                <li><nuxt-link to="/building"> 客户案例 </nuxt-link></li>
                <li><nuxt-link to="/searchVoice">寻找声音</nuxt-link></li>
                <li><nuxt-link to="/computedPrice">价格估算</nuxt-link></li>
            </ul>
            <ol v-if="!loginData">
                <li><a href="/join">配音员入驻</a></li>
                <li><a href="/user/regist">注册</a></li>
                <li><a href="/user/login">登录</a></li>
            </ol>
            <ol v-if="loginData && loginData.userInfo.roles == 'client'">
                <li><nuxt-link to="/client/project">我的项目</nuxt-link></li>
                <li class="img-wrap">
                    <img :src="loginData.userInfo.avatar">
                    <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530005177154&di=5cd0779ea36dd2458e31dc42a7729ad4&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8718367adab44aed5b24056fbf1c8701a08bfbd7.jpg" alt=""> -->
                </li>
            </ol>
            <ol v-if="loginData && loginData.userInfo.roles == 'podcast'">
                <li><nuxt-link to="/podcast/">我的订单</nuxt-link></li>
                <li class="img-wrap">
                    <img :src="loginData.userInfo.avatar">
                </li>
            </ol>
            <!-- <ol>
                <li><nuxt-link to="/join">配音员入驻</nuxt-link></li>
                <li><nuxt-link to="/user/regist/">注册</nuxt-link></li>
                <li><nuxt-link to="/user/login/">登录</nuxt-link></li>
            </ol> -->
        </div>
    </nav>
</template>
<script type="text/ecmascript-6">
import { isLogin } from '~/assets/js/mixin'
    export default {
        mixins: [ isLogin ],
        data() {
            return {
                loginData: null
            }
        },
        mounted() {
            /*this.loginData = {
                "userInfo": {
                    "uid": "uid123456",
                    "nickname": "叮当娃1",
                    "avatar": "http://avatar.ddpei.cn/adb35665.png",
                    "userAgent": "pc",
                    "roles": "podcast"
                },
                "timestamp": 1529994646696,
                "token": "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJ1aWQxMjM0NTYiLCJzdWIiOiLlj67lvZPlqIMxIiwiaW1nIjoiaHR0cDovL2F2YXRhci5kZHBlaS5jbi9hZGIzNTY2NS5wbmciLCJhdWQiOiJwYyIsInJvbCI6ImNsaWVudCIsImV4cCI6MTUyOTk5NDU2MH0.5zwRSebJ8INDHtFAaP5PdCDOFqHWMcxa8KqZS5EoPt0"
            }*/
           this.loginData = this.hasLogin()
        }
    }
</script>
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
        aligin-items: center;
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
            font-size: 16px;
        }
        ol { 
            width: 300px;
            aligin-items: flex-start;
            a {
                font-size: 14px;
                line-height: 1em;
            }
            li {
                &:first-child { 
                    
                    a {
                        display: inline-block;
                        padding: 0.4em 0.5em;
                        border: 1px solid #ff9900;
                        border-radius: 2px;
                        &:hover {
                            background-color: rgb(255, 153, 0);
                            color: #eee;
                        }
                    }
                }
                &.img-wrap {
                    width: 32px;
                    height: 32px;
                    overflow: hidden;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        min-height: 100%;
                    }
                }
            }
        }
        ul { 
            width: 760px;
        }
        li {
            line-height: 40px;
            font-size: 16px;
            margin-right: 30px;
            
        }
    }
}


</style>
