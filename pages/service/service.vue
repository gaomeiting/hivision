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
      	<div class="group-wrap">
      		<h3>购买优惠套餐</h3>
      		<p>根据你的情况，配置适用的主播，享受更优惠的价格</p>
      		<ul>
      			<li v-for="(item,index) in 4" :key="index">
      				<h4>限购一次</h4>
      				<h2>一万字</h2>
      				<p>¥200元</p>
      				<p>2.0元/百字</p>
      				<p class="btn">购买</p>
      			</li>
      		</ul>
      	</div>
      	<div class="group-wrap">
      		<h3>常见问题与解答</h3>
      		<p>根据你的情况，配置适用的主播，享受更优惠的价格</p>
      		<ol>
      			<li v-for="(item,index) in data" :key="index">
      				<h4>{{item.title}}</h4>
      				<p>{{item.content}}</p>
      			</li>
      		</ol>
      		<h4>有更多的疑问</h4>
      		<p>请联系我们</p>
      	</div>
        <div class="float-window-wrap">
              <float-window></float-window>
        </div>
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
import TopTip from '~/components/top-tip/top-tip'
import FloatWindow from '~/components/float-window/float-window'
export default {
  head: {
    title: '服务介绍'
  },
  data() {
    return {
      navFlag: true,
      data: [
        {title: 'Q1.升级版本和充值套餐的区别？', content: '在基础功能之外，版本升级为满足更高要求而设计，如：音频增加背景音乐，多账号管理，收藏及指定主播进行优先服务（每个主播每天的配合服务次数有限，合作资源配置为你的需求倾斜）；充值套餐是主播服务的酬劳，充值相应额度不仅价格较为优惠，并且将能够自动获得版本升级，越多越划算'},
        {title: 'Q2.如何与主播展开合作？', content: '在你需要服务的时候可以登录叮当配进行下单操作，实时待命的主播将匹配你的需求进行接单，且只有信用及历史评价最高的主播能成功为你服务；如果你需要稳定而且长期合作的主播服务，（高级版）可以收藏服务过的主播，（企业版）可以从主播库存里选择2-5名主播进行签约播报。'},
        {title: 'Q3.企业如何支付及开具发票？', content: '我们支持微信、支付宝扫码支付、对公转账多种付款方式，在订单生效后可开具发票并邮寄。购买高级版及企业版支持付款 30 天无理由全额退款，可放心购买。'},
        {title: 'Q4.音频的使用范围？', content: '这完全取决于你，你可以 查阅使用案例 ；下单后你可以直接分享至社交网络平台供收听，也可以下载用于在多个平台发布，包括APP及微信公众号等等。'},
      ]
    }
  },
  mounted() {
    //设置滚动
     window.addEventListener('scroll', () => {
        this.navFlag = document.documentElement.scrollTop > 100 ? false : true;
        console.log(!this.navFlag)
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
    TopTip,
    FloatWindow
  }
  
}
</script>

<style lang="scss" scoped>
.float-window-wrap {
    position: fixed;
    bottom: 100px;
    width: 60px;
    right: 10px;
}
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
    & > div {
        width: 1170px;
        margin:  0 auto;
    }
    .group-wrap {
    	text-align: center;
    	padding-top: 50px;
    	margin-bottom: 40px;
    	> h3 {
    		font-size: 28px;

    	}
    	> p {
    		font-size: 20px;
    		padding-top: 20px;
    		margin-bottom: 80px;
    		&:last-of-type {
    			font-size: 12px;
    		}
    	}
    	> ul {
    		display: flex;
    		justify-content:space-between;
    		li {
    			flex: 0 0 274px;
    			width: 274px;
    			border: 1px solid #f8f8f8;
    			padding: 0 20px 20px;
          cursor: pointer;
          &:hover h4 {
            background: #f90;
          }
    			h4 {
    				width: 70%;
    				height: 32px;
    				line-height: 32px;
    				border-radius: 0 0 8px 8px;
    				border: 1px solid #f8f8f8;
    				border-top: none;
    				background: #343434;
    				color: #fff;
    				margin-bottom: 34px;
    				margin-left: 15%;
    			}
    			h2 {
    				font-size: 26px;
    				padding-bottom: 8px;
    				margin-bottom: 8px;
    				border-bottom: 1px solid #f8f8f8;
    			}
    			p {
    				font-size: 16px;
    				&:first-of-type {
						font-size: 22px;
						padding-bottom: 68px;
    				}
    				&:nth-of-type(2) {
    					color: #c43b3a;
    					margin-bottom: 14px;
    				}
    				&.btn {
						line-height: 40px;
						height: 40px;
						width: 90%;
						border: 1px solid #f8f8f8;
						font-size: 18px;
						border-radius: 4px;
						margin-left: 5%;
    				}
    			}
    		}
    	}
    	> ol {
    		display: flex;
    		flex-wrap: wrap;
    		li {
    			flex: 0 0 585px;
    			border-bottom:  1px solid #f8f8f8;
    			padding-right: 78px;
    			margin-bottom: 30px;
    			h4 {
    				text-align: left;
    				font-size: 22px;
    				padding-bottom: 1em;
    			}
    			p {
    				text-align: left;
    				line-height: 1.8;
    				padding-bottom: 1.5em;
    			}
    		}
    	}
    }
}


</style>
