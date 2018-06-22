<template>
  <section>
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
      			<li v-for="(item,index) in 4" :key="index">
      				<h4>Q1.升级版本和充值套餐的区别？</h4>
      				<p>在基础功能之外，版本升级为满足更高要求而设计，如：音频增加背景音乐，多账号管理，收藏及指定主播进行优先服务（每个主播每天的配合服务次数有限，合作资源配置为你的需求倾斜）；充值套餐是主播服务的酬劳，充值相应额度不仅价格较为优惠，并且将能够自动获得版本升级，越多越划算。</p>
      			</li>
      		</ol>
      		<h4>有更多的疑问</h4>
      		<p>请联系我们</p>
      	</div>
  </section>
  
</template>

<script>
import AppHeader from '~/components/app-header/app-header'
export default {
  head: {
    title: '服务介绍'
  },
  components: {
  	AppHeader
  }
  
}
</script>

<style lang="scss" scoped>

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
