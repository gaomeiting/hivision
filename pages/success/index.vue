<template>
	<scroll class="page" ref="scroll">
		<div class="success">
			<p class="icon-wrap"><i class="iconfont icon-shuaxin"></i></p>
			<h2>报名成功！</h2>
			<p>如果您的资料通过审核，我们会在3个工作日内及时通知你下一步的操作方式。请关注我们的微信公共号，及时获取通知。</p>
			<figure>
				<img src="~/~/assets/images/code.jpg">
			</figure>
			<a href="javascript:;" class="btn">生成分享页面炫一下</a>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
		},
		methods: {
			
		},
		components: {
			Scroll
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