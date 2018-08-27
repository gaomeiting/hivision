<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	<div class="search-box-wrap">
		<search-box @queryChange="queryChange"></search-box>
	</div>
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
import SearchBox from 'base/search-box/search-box'
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
			list: [],
			keyword: ''
		}
	},
	
	created() {
		//this._getSingerList('/api/contestant/search', {page: this.currentPage, size: this.size, keyword: this.keyword})
	},
	
	methods: {
		queryChange(query) {
			if(!query) return;
			this.currentPage = 0;
			this.keyword = query;
			this.list = [];
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, keyword: this.keyword})
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
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, keyword: this.keyword})
		},
		_getSingerList(url, params) {
			console.log('_getSingerList');
			this.load = true;
			console.log(url, params)
			getData(url, params).then(res => {
				this.load = false;
				if(res.status===200) {
					this.list= [...this.list, ...res.data]
					console.log(this.list)
					this._hasMore(res.total)
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
		VoteList,
		SearchBox
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
.search-box-wrap {
	padding: 16px;
}
.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	
	
}

</style>