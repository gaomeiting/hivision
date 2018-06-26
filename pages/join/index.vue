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
      <div class="banner-wrap">
        <div class="normal-wrap">
          <div class="left">
              <h2>
                让每个美好声音 <br>
                都有价值
              </h2>
              <p>海边、露营、沙发里、咖啡馆，想更自由的做设计？ <br>
                 现在就可以！ <br>
                 在特赞，安心做设计， <br>
                 把其他的麻烦事交给我们。
              </p>
              <a href="/user/login" class="btn">配音员入驻</a>
          </div>
          <div class="right">
            <img src="~assets/img/coverstory.png" alt="">
          </div>
        </div>
      </div>	
      <div class="icons-wrap">
        <div class="normal-wrap">
          <ul>
            <li>
              <figure>
                <img src="~assets/img/icon-onboard-customer.png" alt="">
              </figure>
              <p>
                与你信赖和喜欢的品牌合作<br>
                已有超过 2000 品牌选择了特赞
              </p>
            </li>
            <li>
              <figure>
                <img src="~assets/img/icon-onboard-handshake.png" alt="">
              </figure>
              <p>
                不仅能接到自己适合的项目<br>
                更能找到自己喜欢的项目
              </p>
            </li>
            <li>
              <figure>
                <img src="~assets/img/icon-onboard-pay.png" alt="">
              </figure>
              <p>
                项目准时结款率 100%<br>
                你不敢想的，我们真的做到了
              </p>
            </li>
          </ul>
          <h2>按下这个按钮，重启一下生活</h2>
          <a href="/user/login" class="btn">配音员入驻</a>
        </div>
      </div>
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
import TopTip from '~/components/top-tip/top-tip'
export default {
  head: {
    title: '服务介绍'
  },
  data() {
    return {
      navFlag: true,
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
  components: {
  	AppHeader,
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
    .btn {
      display: block;
      width: 214px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f90;
      color: #fff;
    }
    .banner-wrap {
      padding: 60px 0;
      background: #f8f8f8;
      > div {
        display: flex;
        .left {
          flex: 0 0 1;
          h2 {
            font-size: 40px;
            line-height: 62px;
            margin-bottom: 30px;
          }
          p {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 40px;
            color: #f8f8f8;
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
      padding-top: 60px;
      padding-bottom: 60px;
      background: #fff;
      ul {
        width: 100%;
        display: flex;
        li {
          flex: 1;
          text-align: center;
          padding-right: 100px;
          border-bottom: 1px solid #f8f8f8;
          &:last-of-type {
            padding-right: 0;
          }
          figure {
            width: 60px;
            height: 60px;
            margin: 0 auto 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
              line-height: 1.8;
              margin-bottom: 60px;
          }
        }
      }
      h2 {
        padding-top: 60px;
        font-size: 32px;
        text-align: center;
        margin-bottom: 60px;
      }
      .btn {
        margin: 0 auto;
      }
    }
    .normal-wrap {
        width: 1170px;
        margin:  0 auto;
        overflow: hidden;
    }
}


</style>
