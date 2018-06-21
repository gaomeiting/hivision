<template>
    <div class="voice-list">
      <ul v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index">
          <h3>{{ item.title }}</h3>
          <p><strong>{{ item.narrator.nickname }} </strong><em>{{ item.metaData.styles }}</em></p>
          <div class="voice">
            <i class="iconfont" :class=" !item.playing ? 'icon-play_icon' : 'icon-bofang' " @click.stop.prevent="switchAudio(index)"></i>
            &nbsp;
            <!-- <i class="iconfont icon-bofang"></i> -->
            
            <!-- <p>123456789</p> -->
            <div class="progress-bar">
              <progress-bar :percent="percents[index]" @triggerPercent="setSongProgress(arguments, index)"></progress-bar>
            </div>
            
           <!-- <i class="iconfont icon-shoucang"></i> -->
            <i style="font-weight: bolder" class="iconfont icon-iconfontadd"></i>
          </div>
          <p class="pos" @click.stop.prevent="more(item)">更多样音</p>
        </li>
      </ul>
      <div class="loading-wrap" v-if="list.length == 0">
        <loading v-if="loading"></loading>
        <no-result v-else title="空空如也~~"></no-result>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import ProgressBar from '~/components/progress-bar/progress-bar'
import Loading from '~/components/load/load'
import NoResult from '~/components/no-result/no-result'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    },
    currentSongIndex: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    },
    time: {
      type: String,
      default: '00:00'
    }
  }, 
  computed: {
    percents() {
      let res = [];
      let len = this.list.length;
      for(let i = 0; i < len; i++) {
        res.push(0)
      }
      console.log(this.percent, "voice-list")
      res[this.currentSongIndex] = this.percent;
      return res;
    }
  },
  methods: {
    switchAudio(index) {
      this.$emit('switchAudio', index)
    },
    setSongProgress() {
      let [percent, flag] = arguments[0]
      let index = arguments[1]
      this.$emit('setSongProgress', percent, flag, index)
    },
    more(item) {
      this.$emit('more', item)
    }
  },
  components: {
    ProgressBar,
    Loading,
    NoResult
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.voice-list {
  .loading-wrap {
    padding: 100px 0;
  }
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

