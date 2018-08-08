<template>
<scroll class="page" ref="scroll">
<div class="vote-wrap" ref="vote">
	<div class="vote-list">
		<book-list></book-list>
		<div class="result-wrapper">
			<p ref="javascript:;" v-if="!more && list.length>0">继续录制其他故事></p>
			<p class="btn" v-else-if="list.length == 0">选择书目录制</p>
		</div>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import BookList from '~/components/books-me/books-me'
import ErrorTip from '~/components/error-tip/error-tip'
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			error: '',
			more: false,
			list: [1]
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
		BookList
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.vote-wrap {
	min-height: 100vh;
	
}
.result-wrapper {
	padding: 16px;
	p {
		text-align: center;
		line-height: 44px;
		color: $color-theme;
	}
	.btn {
		width: 100%;
		height: 44px;
		
		background: $color-theme;
		border-radius: 6px;
		color: $color-background-d;
		font-size: $font-size-medium-x;
	}
}
</style>