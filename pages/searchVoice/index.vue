<template>
  <section>
      <top-tip ref="topTip">
        
        <div class="nav-wrap">
          <app-header></app-header>
        </div>
      </top-tip>
  		<div class="nav-wrap" v-show="navFlag">
        <app-header></app-header>
      </div>
      <div class="normal-wrap">
        <div class="search-wrap">
          <search-box placeholder="请输入关键字搜索"></search-box>
        </div>
        <label-panel></label-panel>
        <voice-list></voice-list>
      </div>
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
import SearchBox from '~/components/search-box/search-box'
import LabelPanel from '~/components/label-panel/label-panel'
import VoiceList from '~/components/voice-list/voice-list'
import TopTip from '~/components/top-tip/top-tip'
export default {
  head: {
    title: '服务介绍'
  },
  data() {
    return {
      navFlag: true
    }
  },
  mounted() {
    //设置滚动
     window.addEventListener('scroll', () => {
        this.navFlag = document.documentElement.scrollTop > 60 ? false : true;
        if(!this.navFlag) {
          this.$refs.topTip.show()
        }
        else {
          this.$refs.topTip.hide()
        }
     });

  },
  methods: {

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
    .nav-wrap {
    	width: 100%;
    	height: 66px;
    	background: #fff;
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
