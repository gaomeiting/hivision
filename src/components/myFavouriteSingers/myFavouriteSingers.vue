<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	
	<h3 class="title">我关注的选手</h3>
	
	<div class="vote-list">
		<vote-list :more="more" :list="list" :load = "load" @goByName="goByName"></vote-list>
	</div>
	
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import VoteList from 'base/singer-list/singer-list'
import ErrorTip from 'base/error-tip/error-tip'
import { mapGetters } from 'vuex'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData } from 'api/init'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			
			error: '',
			currentPage: 0,
			size: 10,
			load: false,
			more: true,
			pullUp: true,
			beforeScroll: true,
			list: []
		}
	},
	
	created() {
		if(this.token) {
			this._getSingerList('/api/user/current/vote/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		}
	},
	watch: {
		token() {
			this._getSingerList('/api/user/current/vote/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		}
	},
	computed: {
		...mapGetters(['token'])
	},
	methods: {
		
		goByNav(index) {
			this.$router.push(this.slider[index].url)
		},
		goByName(item) {
			//console.log(item.id)
			this.$router.push({
				path: '/singer',
				query: {
					id : item.id
				}
			})
		},
		hasMoreData() {
			if(!this.more) return;
			this.currentPage+=1;
			this._getSingerList('/api/user/current/vote/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		},
		_getSingerList(url, params) {
			console.log('_getSingerList');
			this.load = true;
			console.log(url, params)
			getData(url, params).then(res => {
				console.log('getData成功')
				this.load = false;
				if(res.status===200) {
					this.list= [...this.list, ...res.data.data]
					this._hasMore(res.data.total)
				}
			}).catch(err => {
				this.load = false;
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		},
		_hasMore(total) {
			this.more = (this.currentPage+1) * this.size < total
		},
		
		
	},
	components: {
		Scroll,
		ErrorTip,
		VoteList
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.slider-wrapper {
	position: relative;
	width: 100%;
	overflow: hidden;	
}
.row-wrap {
	padding: 16px 16px 0;
}

.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.title {
		line-height: 2.5;
		font-size: $font-size-medium-x;
		padding: 0 16px;
		color: $color-text-l;
		margin-bottom: 8px;
		@include border-1px($color-background)
	}
	
}

</style>