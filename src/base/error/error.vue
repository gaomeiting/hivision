<template>
  <div class="error-wrap">
    <div class="content">
      <i class="iconfont icon-error"></i>
      <p class="desc">{{error}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      error: {
        type: String,
        default: '接口报错正在调试中'
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/scss/variable";
.error-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    i {
      font-size: 100px;
    }
    p {
      line-height: 2.5;
    }
  }
}

    
</style>
