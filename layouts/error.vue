<template>
  <div class="container">
    <!-- <img src="~/assets/img/cartoon_err.png">
    <h1 v-if="error.statusCode === 404">叮当不小心把页面搞丢了……T_T</h1>
    <h1 v-else>叮当服务器出错了，工程师正在抢修中……(ง •̀_•́)ง</h1>
    <p><a href="javascript:history.go(-1)" class="link-blue">返回前一个页面</a><a href="/" class="link-blue">返回叮当配首页</a></p> -->
  </div>
</template>

<style scoped>
html,body {
    height:100%;
}
.container {
    position:absolute;
    top:45%;
    left:0;
    right:0;
    height:350px;
    margin-top:-175px;
    text-align: center;
}
.container h1 {
    height:50px;
    line-height:50px;
    color:#bbb;
}
.container p {
    height:40px;
    line-height:40px;
    font-size:14px;
}
.container p a {
    margin:0 30px;
}
</style>

<script>
export default {
    props: ['error'],
    layout: 'clear'
}
</script>
