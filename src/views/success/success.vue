<template>
	<scroll class="page" ref="scroll">
		<div class="success">
			<p class="icon-wrap"><i class="iconfont icon-chenggong1"></i></p>
			<h2>报名成功！</h2>
			<p v-if="!isWx">我们会在3个工作日内审核您的参赛资料，关注“嗨未来”微信公众号，及时获取比赛通知。长按识别二维码 关注“嗨未来”微信公共号</p>
			<p v-else>长按识别下方二维码，添加“嗨未来”大赛官方客服微信号，如有问题，客服会第一时间为您解答。</p>
			<figure>
				<img v-if="!isWx" src="/code.jpg">
				<img v-else src="/code_2.jpg">
			</figure>
			<a v-if="!isWx" href="javascript:;" class="btn" @click.stop="toggleShare">生成分享页面炫一下</a>
			<a v-else href="javascript:;" class="btn" @click.stop="goNext">继续录制您的海选音频</a>
		</div>
		<div class="share-icons-wrap">
			<share-icons ref="share" @cancle="cancle" @selectShare="selectShare"></share-icons>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import ShareIcons from 'components/share-icons/share-icons'
import { share, wxShare } from 'assets/js/mixin'
	export default {
		mixins: [share, wxShare],
		data() {
			return {
				
			}
		},
		
		methods: {
			goNext() {
				this.$router.push('/selectbook')
			}
		},
		components: {
			Scroll,
			ShareIcons
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";



.success {
	padding: 30px 16px 0;
	.icon-wrap {
		text-align: center;
		i {
			font-size: 92px;
			color: $color-theme;
		}
	}
	h2 {
		text-align: center;
		font-size: $font-size-large-x;
		color: $color-text-d;
		line-height: 2.5;
	}
	p {
		padding: 0 16px;
		line-height: 1.5;
	}
	figure {
		width: 120px;
		height: 120px;
		overflow: hidden;
		margin: 30px auto;
		img {
			width: 100%;
			min-height: 100%;
		}
	}
	.btn {
		display: block;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background: $color-theme;
		color: $color-background;
		font-size: $font-size-medium-x;
		border-radius: 6px;
		
	}
}
</style>