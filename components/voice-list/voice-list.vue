<template>
    <div class="voice-list">
      <ul>
        <li v-for="(item, index) in 18" :key="index">
          <h3>兼职-英飞腾-男1-003-中音-节奏-科技</h3>
          <p><strong>测试姓名</strong><em>个性标签</em></p>
          <div class="voice">
            <i class="iconfont icon-play_icon"></i>
            &nbsp;
            <!-- <i class="iconfont icon-bofang"></i> -->
            
            <p>123456789</p>
            <div class="progress-bar">
              <progress-bar></progress-bar>
            </div>
            
            <i class="iconfont icon-shoucang"></i>
            <i style="font-weight: bolder" class="iconfont icon-iconfontadd"></i>
          </div>
          <p class="pos">更多样音</p>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
import ProgressBar from '~/components/progress-bar/progress-bar'
export default {
  components: {
    ProgressBar
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.voice-list {
  ul {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 376px;
      width: 376px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: 1px solid #f8f8f8;
      padding: 15px 10px 50px;
      position: relative;
      &:nth-child(3n) {
        margin-right: 0;
      }
      h3 {
        font-size: 16px;
        line-height: 1.8;
        padding-bottom: 10px;
      }
      p {
        &:first-of-type {
          margin-bottom: 20px;
          em {
            display: inline-block;
            background: #ffa302;
            color: #fff;
            padding: 2px 5px;
          }
        }

      }
      .voice {
        display: flex;
        align-items: center;
        background: #f8f8f8;
        padding: 2px 15px;
          > p {
              position: relative;
              top: 10px;
          }
          .progress-bar { 
            flex: 1;
            display: flex;
            margin-right: 4px;
            margin-left: 4px;
           
          }
      }
      .pos {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #41464c;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>

