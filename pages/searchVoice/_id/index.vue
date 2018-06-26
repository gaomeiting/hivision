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
import { audioHandles, handlePage } from '~/assets/js/mixin'
import { GetData } from '~/api/api'
export default {
  mixins: [ audioHandles, handlePage ],
  head: {
    title: '个人主页'
  },
  data() {
    return {
      userId: '',
      audioId: '',
      userInfo: '',
      
    }
  },
  created() {
    let res = [];
    //console.log()
    this.audioId = this.$route.query.id;
    this.userId = this.$route.params.id;
    this._getUserInfo(`/api/v1/client/voice/getUserInfo/${this.userId}`);
    this._getVoiceList(`/api/v1/client/voice/getVoiceList/${this.audioId}`)
  },
  computed: {
    tags() {
      let str = this.userInfo.tags+"";
      return str.split(";")
    }
  },
  methods: {
    handleCurrentChange(page) {
      this._handleCurrentChange(page, '/api/v1/client/voice/getVoiceList')
    },
     _getUserInfo(url) {
      GetData(url).then(res => {
        this.userInfo = res;
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
