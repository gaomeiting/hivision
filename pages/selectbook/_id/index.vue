<template>
<scroll class="page" ref="scroll">
<div class="vote-wrap" ref="vote">
	<div class="top-wrap">
		<div class="img-wrap">
			<img src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e28f94a74fa98226a7c12d27ba83b97a/54fbb2fb43166d22460103464a2309f79152d2e9.jpg">
		</div>
		<p :class="isShow ? '' : 'ellipsis'">{{text}}</p>
		<p style="text-align: center;" @click.stop="toggleText">
			<span>{{isShow ? '收起内容' : '展开全部'}}</span>
			<i class="iconfont icon-fenxiang"></i>
		</p>
	</div>
	<div class="switches-wrap">
		<switches :switches="switches"></switches>
	</div>
	<div class="vote-list">
		<vote-list></vote-list>
	</div>
	
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
<p class="btn">
	<i class="iconfont icon-fenxiang"></i>
	<span>我要录制</span>
</p>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import ErrorTip from '~/components/error-tip/error-tip'
import Switches from '~/components/switches/switches'
import VoteList from '~/components/vote-list/vote-list'
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			error: '',
			switches: [{ name: '最佳人气作品' }, { name: '最新参赛作品' }],
			isShow: false,
			text: '二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二百字的二'
		}
	},
	head() {
		return {
			title: '与声俱来·声咖大赛'
		}
	},
	created() {
	},
	beforeMount() {
		/*this._getShareConfig('', true)*/
	},
	methods: {
		toggleText() {
			this.isShow = !this.isShow;
			console.log(123)
		}
	},
	components: {
		Scroll,
		ErrorTip,
		Switches,
		VoteList
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.btn {
	width: 100%;
	height: 44px;
	text-align: center;
	line-height: 44px;
	background: $color-background-d;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 800;
	box-shadow: 0 2px 6px rgba(0,0,0,0.1);
	i {
		padding-right: 8px;
	}
}
.vote-wrap {
	min-height: 100vh;
	padding-bottom: 44px;
	/* background: $color-background-d; */
	
	.top-wrap {
		padding: 16px;
		@include border-1px($color-background)
		.img-wrap {
			width: 100px;
			height: 150px;
			overflow: hidden;
			margin: 0 auto;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		p {
			line-height: 1.5;
			padding-top: 12px;
			&.ellipsis {
				@include ellipsis(3);
			}	
		}
	}
	
	.switches-wrap {
		padding-top: 22px;
	}
}

</style>