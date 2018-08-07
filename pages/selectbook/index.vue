<template>
<scroll class="page" ref="scroll">
<div class="vote-wrap" ref="vote">
	<h2 class="title">选择您要录制的音频故事</h2>
	<div class="vote-list">
		<book-list></book-list>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import BookList from '~/components/book-list/book-list'
import ErrorTip from '~/components/error-tip/error-tip'
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			error: ''
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
	/* background: $color-background-d; */
	.title {
		line-height: 1.5;
		padding: 12px 16px;
		background: $color-background;
	}
	.switches-wrap {
		padding-top: 16px;
	}
}

</style>