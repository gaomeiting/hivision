<template>
  <section>
  		<div class="banner"></div>
      <div class="normal">
        <div class="head">
          <div class="img-wrap">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528777045825&di=8b1d1eeef012643e7f07b55a2acb829d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014cc858cbabdfa801219c77116a63.jpg%401280w_1l_2o_100sh.jpg">
          </div>
          <h3>测试姓名</h3>
          <p>
            <em>个性标签</em>
            <em>个性标签</em>
            <em>个性标签</em>
          </p>
          <p>10年配音经验，曾为央视发现之旅频道、IBM、中国移动、中国联通、中国平安、联合利华、中石化、海尔、创维等著名品牌配音。广告，专题，记录片，工程课件等</p>
        </div>
        <div class="list-wrap">
          <voice-list></voice-list>
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
      audios: []
    }
  },
  created() {
    this.userId = this.$route.params.id;
    this._getUserInfo('/api/getUserInfo/081e3967-f916-4ccf-9878-f2a0173d4083');
  },
  methods: {
    _getUserInfo(url) {
      GetData(url).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
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
