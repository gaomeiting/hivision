<template>
<scroll class="page" ref="scroll" :data="list">
<div class="vote-wrap" ref="vote">
	<h2 class="title">选择您要录制的音频故事</h2>
	<div class="vote-list">
		<book-list :list="list" @goNext="goNext"></book-list>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import BookList from 'base/book-list/book-list'
import ErrorTip from 'base/error-tip/error-tip'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData } from 'api/api'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			error: '',
			list : []
		}
	},
	
	created() {
		this._getCurrentInfoWx()
		let url = '/api/audition_story/';
		this._getStoriesData(url);
	},
	
	methods: {
		goNext(item) {
			let id = item.id;
			this.$router.push(`/selectbook/${id}`);
		},
		
		_getStoriesData(url) {
			getData(url).then(res => {
				if(res.status == 200) {
					this.list = res.data
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`;
					this.$refs.errorTip.show();
				}
			})
		}
		
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