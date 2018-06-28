<template>
  <section>
      <top-tip ref="topTip">
          <div class="nav-wrap">
            <app-header></app-header>
          </div>
      </top-tip>
  		<div class="nav-wrap" style="background: #edf0ef;">
  			<app-header></app-header>
  		</div>
      <div class="banner-wrap">
        <div class="normal-wrap">
          <div class="left">
              <h2>
                1分了解叮当配
              </h2>
              <p>
                专属顾问1 对1服务，全程沟通监理 ，提供专业配音策略建议，将配音需求进行标准化转译，全程质量监管
              </p>
          </div>
          <div class="right">
            <img src="~assets/img/cartoon.png" alt="">
          </div>
        </div>
      </div>
      <div class="normal-wrap">
        <sub-nav :currentIndex="currentIndex" @selectItem="selectItem"></sub-nav>
        <!-- <div class="sub-nav">
          <ul>
            <li class="active">流程介绍</li>
            <li>关于我们</li>
          </ul>
          <div class="t_arrow_top t_tab_arrow" :class="'active_'+currentIndex"></div>
        </div> -->
      </div>
      <div class="icons-wrap">
        <transition name="fade" mode="out-in">
          <div class="normal-wrapper"  v-if="currentIndex == 0" :key="0">
            <ul>
              <li>
                <div class="left">
                  <h2>发布需求</h2>
                  <p>依据内容原型，进行需求分析，定义用户，针对分析确定产品架构，表现形式等</p>
                </div>
                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/process/process_1.jpg">
                </div>
              </li>
              <li>

                <div class="right">
                  <img src="./process_2.jpg">
                </div>
                <div class="left">
                  <h2>配音员选择</h2>
                  <p>智能匹配合适的配音员，多种录制风格尝试，剪辑音乐音效精品制作</p>
                </div>
              </li>
              <li>
                <div class="left">
                  <h2>严格质量把关</h2>
                  <p>95%正确率远高于电台节目主持人标准</p>
                </div>
                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/process/process_3.jpg">
                </div>
              </li>
              <li>

                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/process/process_3.jpg">
                </div>
                <div class="left">
                  <h2>版权分发</h2>
                  <p>多家网络电台深度合作，联合主推，增加品牌曝光度</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="normal-wrapper me" v-if="currentIndex == 1" :key="1">
            <ul>
              <li>

                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/aboutus/about_platform0_1.jpg">
                </div>
                <div class="left">
                  <h2>互联网化的超级配音公司</h2>
                  <p>叮当配不断倾听和满足客户需求，用专业引导并超越用户需求，用声音为客户创造最大价值。通过不断发现好声音，创造好产品，推动有声行业的价值提升和健康发展，与合作伙伴共同创造好产品，提升产品价值。</p>
                </div>
              </li>
              <li>
                
                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/aboutus/about_platform0_1.jpg">
                </div>
                
                <div class="left">
                  <h2>拥有836+配音员和配音团队的超级组织</h2>
                  <p>叮当配长期合作的配音员和配音工作室等超过了800多人，在河北、辽宁、浙江、山西等地建立了分公司或合伙人，与多所高校建立了声咖社团，通过互联网将分散的配音团队组合起来，集录制、创作、发行、经纪于一体，已经为上万家客户提供过专业服务。</p>
                </div>
              </li>
              <li>
                
                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/aboutus/about_platform0_1.jpg">
                </div>
                
                <div class="left">
                  <h2>让人们听见更美好的声音</h2>
                  <p>充分发掘声音梦想者的声音价值，让人们听到这些美好的声音，提升声音梦想者的价值和社会地位。</p>
                  <p>使美好的声音和有声产业相关工作者，更快捷更容易的把产品输出给每个人，让每个美好的声音都有价值。</p>
                </div>
              </li>
              <li>
                
                <div class="right">
                  <img src="http://statics.techuangyi.com/statics/images/bootstrap/new_website_1/aboutus/about_platform0_1.jpg">
                </div>
                
                <div class="left">
                  <h2>让声音为内容赋能</h2>
                  <p>声音的价值是体现在内容之上的。叮当配依赖多年的行业经验以及对声音的热爱，对客户的需求不断研究探索，找出最适合的声音表达方式来为内容赋能。</p>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
import TopTip from '~/components/top-tip/top-tip'
import SubNav from '~/components/sub-nav/sub-nav'
export default {
  head: {
    title: '服务介绍'
  },
  data() {
    return {
      navFlag: true,
      currentIndex: 0
    }
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
    selectItem(index) {
      this.currentIndex = index;
    }
  },
  components: {
  	AppHeader,
    TopTip,
    SubNav
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
    	position: relative;
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
    }
    .banner-wrap {
      padding: 60px 0;
      background: #edf0ef;
      > div {
        display: flex;
        align-items: center;
        .left {
          flex: 0 0 1;
          h2 {
            font-size: 38px;
            line-height: 62px;
            letter-spacing: 3px;
            margin-bottom: 26px;
          }
          p {
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 40px;
            padding-right: 2em;
          }
          
        }
        .right {
          flex: 0 0 1;
          img {
            width: 585px;
          }
        }
      }
    }
    .icons-wrap {
      padding-bottom: 60px;
      background: #fff;
      .me {
        li {
          padding: 60px 0;
          border-bottom: 1px solid #f8f8f8;
          align-items: flex-start;
          .left {
            h2 {
              font-size: 32px;
            }
            p {
              font-size: 14px;
            }
          }
          
          &:last-child {
            border-bottom: none;
          }

        }
        .right {
          width: 300px;
          height: 200px;
          img {
            min-height: 200px;
          }
        }
      }
      ul {
        div:nth-of-type(2n-1) {
          h2, p {
            padding-right: 70px;
          }
        }
        div:nth-of-type(2n) {
          h2, p {
            padding-left: 70px;
          }
        }
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 0;

          .left {
            flex: 1;
            h2 {
              font-size: 38px;
              line-height: 54px;
              padding-bottom: 24px;
            }
            p {
              font-size: 16px;
              line-height: 1.8;
            }
          }
          .right {
              width: 536px;
              img {
                width: 100%;
              }
          }
        }
      }
      
    }
    .normal-wrap {
        width: 1170px;
        margin:  0 auto;
        overflow: hidden;
    }
    .normal-wrapper {
        width: 970px;
        margin:  0 auto;
        overflow: hidden;
    }
    
}


</style>
