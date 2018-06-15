<template>
    <div class="voice-list">
      <ul>
        <li v-for="(item, index) in 4" :key="index">
          <h3>兼职-英飞腾-男1-003-中音-节奏-科技</h3>
          <p><strong>测试姓名</strong><em>个性标签</em></p>
          <div class="voice">
            <i class="iconfont" :class="playing ? 'icon-bofang' : 'icon-play_icon'" @click.stop="togglePlaying"></i>
            &nbsp;
            <!-- <i class="iconfont icon-bofang"></i> -->
            <p>123456</p>
            <div class="progress-bar">
              <progress-bar  :percent="percent" @triggerPercent="setSongProgress"></progress-bar>
            </div>
            
            <i class="iconfont icon-shoucang"></i>
            <i style="font-weight: bolder" class="iconfont icon-iconfontadd"></i>
          </div>
        </li>
      </ul>

      <audio src="http://dl.stream.qqmusic.qq.com/C400003zt5jO0Rm8rW.m4a?vkey=BF4386018D32707F3A80B123AA969E868D8F5BF385CE4977F7FAF1DAC2AE7491CCDF0EEAD080ED02DE33EA06F74DDFB77031F42ECDC406F5&guid=8182525974&uin=2856584467&fromtag=66" @timeupdate="updateTime" ref="audio"></audio>
    </div>
</template>
<script type="text/ecmascript-6">
import ProgressBar from '~/components/progress-bar/progress-bar'
export default {
  data() {
    return {
      percent: 0,
      playing: false,
      currentSong: {
        duration: 240000
      }

    }
  },
  watch: {
    playing(newPlaying) {
      this.$nextTick(()=> {
        const audio=this.$refs.audio;
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    setSongProgress(percent, flag) {
      //console.log(this.$refs.audio.duration, "duration")
      const audio = this.$refs.audio;
      if(audio.currentTime==percent*audio.duration){
        return;
      }
      audio.currentTime=percent*audio.duration
      this.percent = percent;
      if(!flag) {
        this.setPlaying(flag)
      }
      else{
        if(!this.playing) {
          this.togglePlaying()
        }
      }
    },
    togglePlaying() {
      this.playing = !this.playing;
     
    },
    updateTime(e) {
      let currentTime=e.target.currentTime | 0;
      let totalTime=this.$refs.audio.duration;
      this.currentTime= this.format(currentTime);
      this.percent= currentTime / totalTime ;
    },
    format(n) {
      let m=0;
      let s=0;
      m= n / 60 | 0;
      s= n % 60;
      let padS=this._pad(s)
      return `${m}:${padS}`
    },
    setPlaying(flag) {
      this.playing = flag
    },
    _pad(num,n=2){
      let len=num.toString().length
      while(len<n) {
        num='0' +num
        len++
      }
      return num
    }
  },
  components: {
    ProgressBar
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.voice-list {
  ul {
    width: 100%;
    padding-top: 30px;
    li {
      margin-bottom: 20px;
      border: 1px solid #f8f8f8;
      padding: 15px 10px;
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
            margin-right: 8px;
            margin-left: 4px;
          }
      }
    }
  }
}
</style>

