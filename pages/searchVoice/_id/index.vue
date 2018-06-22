<template>
  <section>
  		<div class="banner"></div>
      <div class="normal">
        <div class="head">
          <div class="img-wrap">
            <img :src="userInfo.avatar">
          </div>
          <h3>{{userInfo.nickname}}</h3>
          <p v-if="userInfo.tags">
            <em v-for="(item, index) in tags" :key="index">{{item}}</em>
          </p>
          <p>{{userInfo.intro}}</p>
        </div>
        <div class="list-wrap">
          <voice-list :list="list" :loading="loading" :currentSongIndex="currentSongIndex" @switchAudio="togglePlaying" :percent="percent" @setSongProgress="setSongProgress"></voice-list>
          <audio :src="currentSong" ref="audiome" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
          <div class="pagination-wrap">
              <div class="page-wrap" v-if="list.length != 0">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="currentSize"
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
          </div>
        </div>
        
      </div>
  </section>
  
</template>

<script>
import VoiceList from '~/components/voice-list-l/voice-list-l'
import { GetData } from '~/api/api'
export default {
  head: {
    title: '个人主页'
  },
  data() {
    return {
      userId: '',
      userInfo: '',
      list: [],
      size: 0,
      total: 14,
      currentSongIndex: 0,
      percent: 0,
      currentSize: 2,
      loading: false,
      currentPage: 1
    }
  },
  created() {
    let res = [];
    console.log(res.length)
    this.userId = this.$route.params.id;
    this._getUserInfo('/api/v1/client/voice/getUserInfo/f8b41ede-3fb0-4355-b69f-9bd567f17cc1');
    this._getVoiceList('/api/v1/client/voice/getVoiceList')
  },
  computed: {
    tags() {
      let str = this.userInfo.tags+"";
      return str.split(";")
    },
    currentSong() {
      return this.list[this.currentSongIndex] && this.list[this.currentSongIndex]['url']
    }
  },
  methods: {
    ready() {
      this.songReady= true;
    },
    error() {
      this.songReady= true;
    },
    end() {
      console.log("end")
      this.list[this.currentSongIndex].playing = false;
      this.percent = 0;
    },
    togglePlaying(index=this.currentSongIndex) {
      this.currentSongIndex = index;
      if(!this.list[index].playing)  {
         this._normalData(this.list);
         setTimeout(()=> {
          this.$refs.audiome.play()
          //设置时间
         }, 30)
      }
      else {
        this.$refs.audiome.pause()
      }
      this.list[index].playing= !this.list[index].playing
    },
    setSongProgress(percent, flag, index) {
      this.currentSongIndex = index;
      //console.log(this.$refs.audiome.duration, "duration")
      const audio = this.$refs.audiome;
      if(audio.currentTime==percent*audio.duration){
        return;
      }
      console.log(percent)
      audio.currentTime= percent*audio.duration
      this.percent = percent;
      if(!flag) {
        this.setPlaying(flag)
      }
      else{

        if(!this.list[this.currentSongIndex]['playing']) {
          this.togglePlaying()
          console.log(audio.currentTime, audio.duration, this.percent, "setSongProgress")
        }
      }
    },
    updateTime(e) {
      if(!this.songReady) return;
      let currentTime=e.target.currentTime | 0;
      let totalTime=this.$refs.audiome.duration;
      this.currentTime= this.format(currentTime);
      this.percent= currentTime / totalTime ;
      console.log(this.percent,e.target.currentTime, totalTime, "updateTime")
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
      this.list[this.currentSongIndex]['playing'] = flag
    },
    
    handleSizeChange(page) {
      /*this.currentPage = page-1;
      let keywords = this.keywords;
      let { languages, gender, styles } = this.labels;
      this._getData('/api/audio/search', {languages, gender, styles, keywords});*/
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this._getVoiceList('/api/v1/client/voice/getVoiceList');

    },
    _getUserInfo(url) {
      GetData(url).then(res => {
        this.userInfo = res;
      }).catch(err => {
        console.log(err)
      })
    },
    _getVoiceList(url) {
      this.loading = true;
      GetData(url, {
        page: this.currentPage - 1,
        size: this.currentSize,
      }).then(res => {
        this.loading = false;
        this.list = this._normalize(res.list)
        this.total = res.total;
        console.log(this.list)
      }).catch(err => {
        console.log(err)
      })
    },
    _normalize(list) {
      let res = []
      list.forEach(item => {
        let json = {}
        json.title = item.title;
        json.url = item.url;
        json.tags = item.tags.split(";");
        json.playing = false;
        res.push(json)
      })
      console.log(res, "array")
      return res;
    },
    _pad(num,n=2){
      let len=num.toString().length
      while(len<n) {
        num='0' +num
        len++
      }
      return num
    },
    //设置播放歌曲
    _normalData(list) {
      let res= [];
      list.forEach(item => {
        item.playing = false;
        res.push(item)
      })
      return res;
    }
  },
  components: {
  	VoiceList
  }
  
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variable";
section {
	width: 100%;
  .pagination-wrap {
      text-align: center;
    }
  .nav-wrap {
    width: 100%;
    height: 66px;
    background: rgba(0,0,0,0.2);
    position: relative;
  }
  .normal {
        width: 1170px;
        margin:  0 auto;
        display: flex;
        .head {
          flex: 0 0 298px;
          width: 298px;
          padding-right: 30px;
          margin-top: -144px;
          .img-wrap {
            width: 200px;
            height: 200px;
            margin: 0 auto 30px;
            overflow: hidden;
            border: 4px solid #fff;
            box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
            img {
              width: 100%;
              min-height: 100%;
            }
          }
          h3 {
            font-size: 16px;
            padding-bottom: 10px;
            text-align: center;

          }
          p {
            font-size: 16px;
            line-height: 28px;
            &:first-of-type {
              margin-bottom: 20px;
              font-size: 12px;
              color: #fff;
              display: flex;
              justify-content: center;
              em {
                padding: 3px 5px;
                line-height: 1em;
                background: #ffa302;
                display: inline-block;
                margin-right: 10px;
              }
            }
          }
        }
        .list-wrap {
          width: 840px;

        }
    }
  .banner {
    width: 100%;
    height: 296px;
    background: url(~assets/img/banner.jpg) center center no-repeat;
    background-color: #d8b261;
  }

}


</style>
