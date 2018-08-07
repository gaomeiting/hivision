<template>
<!-- <scroll class="page" ref="scroll"> -->
<div class="vote-wrap" ref="vote">
	<h2 class="title">请录制下面的演播内容</h2>
	<p class="text">
		所有的动物都可以说是明星，它们拥有可以让自己生存下去的技能。有些动物经常有令人炫目的出色表演。野生动物需要奔跑，是因为它们需要逃离捕食者，或者需要捕食。地球上跑得最快的哺乳动物是非洲猎豹。它可以以每小时110千米左右的速度捕获猎物，这个速度甚至超过了很多高速公路的限速标准。象龟是世界上运动最慢的动物之一，最快速度是每小时400米。象龟的防御机制是把头和脚缩进龟壳里，什么也不做。所以它没有跑的必要。
		所有的动物都可以说是明星，它们拥有可以让自己生存下去的技能。有些动物经常有令人炫目的出色表演。野生动物需要奔跑，是因为它们需要逃离捕食者，或者需要捕食。地球上跑得最快的哺乳动物是非洲猎豹。它可以以每小时110千米左右的速度捕获猎物，这个速度甚至超过了很多高速公路的限速标准。象龟是世界上运动最慢的动物之一，最快速度是每小时400米。象龟的防御机制是把头和脚缩进龟壳里，什么也不做。所以它没有跑的必要。所有的动物都可以说是明星，它们拥有可以让自己生存下去的技能。有些动物经常有令人炫目的出色表演。野生动物需要奔跑，是因为它们需要逃离捕食者，或者需要捕食。地球上跑得最快的哺乳动物是非洲猎豹。它可以以每小时110千米左右的速度捕获猎物，这个速度甚至超过了很多高速公路的限速标准。象龟是世界上运动最慢的动物之一，最快速度是每小时400米。象龟的防御机制是把头和脚缩进龟壳里，什么也不做。所以它没有跑的必要。
	</p>
	<div class="btn-wrap">
		<submit-btns></submit-btns>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>

<!-- </scroll> -->
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import ErrorTip from '~/components/error-tip/error-tip'
import SubmitBtns  from '~/components/submit-dome-btns/submit-dome-btns'
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
		this._getShareConfig('', true)
	},
	methods: {
	},
	components: {
		Scroll,
		ErrorTip,
		SubmitBtns
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.btn-wrap {
	width: 100%;
	padding: 16px 16px 0;
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
	.title {
		line-height: 1.5;
		padding: 12px 16px;
		background: $color-background;
	}
	.text {
		line-height: 2;
		padding: 16px;
	}
	
}

</style>