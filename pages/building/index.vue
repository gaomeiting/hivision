<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <h1 class="no-result-text">{{title}}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '页面正在建设中~~'
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/scss/variable";
  @import "~assets/scss/mixin";

.no-result {
  text-align: center;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate3d(-50%, 50%, 0);
  .no-result-icon {
    width: 270px;
    height: 187px;
    margin: 0 auto;
    background-image: url('~/assets/img/cartoon_err.png');
    background-size: 86px 90px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .no-result-text {
      height:50px;
      line-height:50px;
      color:#bbb;
  }
}
</style>