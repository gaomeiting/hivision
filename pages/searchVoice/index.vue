<template>
  <section>
      <top-tip ref="topTip">
        <div class="nav-wrap">
          <app-header></app-header>
        </div>
      </top-tip>
      <div class="nav-wrap">
        <app-header></app-header>
      </div>
      <div class="normal-wrap">
        <div class="search-wrap">
          <search-box ref="searchBox" placeholder="请输入关键字搜索" @queryChange="queryChange"></search-box>
        </div>
        <div v-if="catagory">
          <label-panel :keywords="keywords" :catagory="catagory" @switchLabels="switchLabels" @clearLabels="clearLabels"></label-panel>
        </div>
        <div class="voice-list-wrap" v-if="list">
          <voice-list ref="voiceList" :loading="loading" :list="list" :currentSongIndex="currentSongIndex" @switchAudio="togglePlaying" @more="more" :percent="percent" @setSongProgress="setSongProgress"></voice-list>
          <audio :src="currentSong" ref="audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
        </div>
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
      
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
import SearchBox from '~/components/search-box/search-box'
import LabelPanel from '~/components/label-panel/label-panel'
import VoiceList from '~/components/voice-list/voice-list'
import TopTip from '~/components/top-tip/top-tip'
import { GetData } from '~/api/api'
import { audioHandles } from '~/assets/js/mixin'
export default {
  mixins: [ audioHandles ],
  head: {
    title: '寻找声音'
  },
  data() {
    return {
      songReady: false,
      navFlag: true,
      currentSize: 1,
      loading: false,
      currentPage: 1,
      list: [],
      size: 0,
      total: 14,
      currentSongIndex: 0,
      percent: 0,
      catagory: [],
      labels: {},
      keywords: ''
    }
  },
  computed: {
    currentSong() {
      return this.list[this.currentSongIndex] && this.list[this.currentSongIndex]['audioUrl']
    }
  },
  created() {
    this.loading = true;
    this.currentPage = 1;
    this._getData('/api/audio/search');
    GetData('/api/audio/filter').then(res => {
      this.catagory = res;
    }).catch(err => {
      console.log(err)
    })
    ///api/audio/search?gender=%E7%94%B7&styles=
  },
  mounted() {
    //设置滚动
     window.addEventListener('scroll', () => {
        this.navFlag = document.documentElement.scrollTop > 100 ? false : true;
        if(!this.navFlag) {
          this.$refs.topTip && this.$refs.topTip.show()
        }
        else {
          this.$refs.topTip && this.$refs.topTip.hide()
        }
        
        
     });

  },
  methods: {
    clearLabels() {
      this.labels = {
        languages: '',
        gender: '',
        styles: ''
      }
    },
    more(item) {
      let id = item.narrator.userId;
      this.$router.push(`/searchVoice/${id}`)
    },
    queryChange(val) {
      if(!val) return;
      this.loading = true;
      this.keywords = val;
      this.currentPage = 1;
      let keywords = val;
      console.log(this.keywords, "queryChange")
      this._getData('/api/audio/search', {keywords});
    },
    switchLabels(labels) {
      console.log("labels switchLabels")
      this.keywords = '';
      this.$refs.searchBox.clear()
      this.loading = true;
      this.labels = labels;
      this.currentPage = 1;
      let { languages, gender, styles } = labels;
      this._getData('/api/audio/search', {languages, gender, styles});
    },
    _getData(url, params) {
      GetData(url, {
        page: this.currentPage-1,
        size: this.currentSize,
        ...params
      }).then(res => {
        this.loading = false;
        this.list = this._normalData(res.data);
        this.total = res.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(page) {
      /*this.currentPage = page-1;
      let keywords = this.keywords;
      let { languages, gender, styles } = this.labels;
      this._getData('/api/audio/search', {languages, gender, styles, keywords});*/
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      let keywords = this.keywords;
      let { languages, gender, styles } = this.labels;
      this._getData('/api/audio/search', {languages, gender, styles, keywords});

    },
    
  },
  components: {
    AppHeader,
    SearchBox,
    LabelPanel,
    VoiceList,
    TopTip
  }
  
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variable";
section {
  
    width: 100%;
    nav {
        
        /deep/ .nuxt-link-exact-active {
            color: #f90;
        }
        /deep/ .nuxt-link-active {
            color: #f90;
        }
        /deep/ a {
            color: #555;
        }
        /deep/ a:hover {
            color: #f90;
        }
        /deep/ ol {
            a {
                color: #f90;
            }
        }
    }
    .pagination-wrap {
      text-align: center;
    }
    .nav-wrap {
      width: 100%;
      height: 66px;
      background: #fff;
      color: #555;
      /* box-shadow: 2px 2px 6px rgba(0,0,0,0.1); */
      position: relative;
    }
    .search-wrap {
      padding: 30px 0 30px 284px;
    }
    .btn {
      display: block;
      width: 214px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #3ccbb4;
      color: #f8f8f8;
    }
    .normal-wrap {
        width: 1170px;
        margin:  0 auto;
        overflow: hidden;
    }
}


</style>
