<template>
<scroll class="page" ref="scroll">
	
	<div class="target" ref="target"></div>
	<div class="me-wrap" ref="me">
		<div class="top">
			<div class="img" style="background-image: url('https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4a51c9cd7e8b4710d12ffbccf3ccc3b2/b64543a98226cffceee78e5eb5014a90f703ea09.jpg');">
			</div>
			<h3>太阳叔叔</h3>
			<p>湖北人民广播电台少儿频道主持人，金话筒获得者</p>
			<ul>
				<li>
					<p>8000023</p>
					<p>参赛编号</p>
				</li>
				<li>
					<p>1230</p>
					<p>人气排行</p>
				</li>
				<li>
					<p>34455</p>
					<p>点赞数</p>
				</li>
			</ul>
		</div>
		<div class="music-wrap">
			<h2>参赛作品</h2>
			<p>暂未提交参赛作品，请使用报名参赛的邮箱，发送作品名称及音频mp3到hvkid@ddpeiyin.com</p>
			<div class="music"></div>
		</div>
		<div class="handler-wrap">
			<ul>
				<li>
					<i class="iconfont icon-fenxiang"></i>
					<p>参赛报名信息</p>
					<i class="iconfont icon-fenxiang"></i>
				</li>
				<li>
					<i class="iconfont icon-fenxiang"></i>
					<p>参赛报名信息</p>
					<i class="iconfont icon-fenxiang"></i>
				</li>
				<li>
					<i class="iconfont icon-fenxiang"></i>
					<p>参赛报名信息</p>
					<i class="iconfont icon-fenxiang"></i>
				</li>
			</ul>
		</div>
	</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import html2canvas from 'html2canvas'

export default {

	data() {
		return {
		}
	},
	head() {
		return {
			title: '个人中心'
		}
	},
	mounted() {
		let el = this.$refs.me;
		let target = this.$refs.target;
		html2canvas(el).then(function(canvas) {
		    target.appendChild(canvas);
		});
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
.me-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.top {
		padding: 30px 16px 16px;
		@include border-type-1px($color-text-ll, dashed)
		> .img {
			width: 78px;
			height: 78px;
			overflow: hidden;
			border-radius: 50%;
			background-size: cover;
			background-position: center;
			margin: 0 auto;
		}
		> h3, > p {
			text-align: center;
			line-height: 1.5;
		}
		> h3 {
			color: $color-text-d;
			font-size: $font-size-large;
			line-height: 2;
			padding-top: 12px;
		}
		> ul {
			display: flex;
			padding-top: 16px;
			li {
				flex: 1;
				p {
					text-align: center;
					line-height: 1.5;
				}
			}
		}
	}
	.music-wrap {
		background: $color-background;
	}
	.handler-wrap {
		li {
			display: flex;
			padding: 0 16px;
			align-items: center;
			@include border-type-1px($color-text-ll, solid)
			i {
				@include extend-click()
			}
			p {
				flex: 1;
				line-height: 3.5;
				padding: 0 6px;
			}
		}
	}
}

</style>