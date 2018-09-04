<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	<div class="top-wrap" v-if="story">
		<div class="img-wrap">
			<img :src="story.coverImg">
		</div>
		<p class="title">{{story.title}}</p>
		<transition name="fade" mode="out-in">
			<p :class="isShow ? '' : 'ellipsis'">{{story.content}}</p>
		</transition>
		<p style="text-align: center;" @click.stop="toggleText">
			<span>{{isShow ? '收起内容' : '展开全部'}}</span>
			<i class="iconfont" :class="isShow ? 'icon-jiantoushang' : 'icon-jiantouxia'"></i>
		</p>
	</div>
	<div class="switches-wrap">
		<switches :switches="switches" :currentIndex="switchIndex" @switchItem="switchItem"></switches>
	</div>
	<div class="vote-list">
		<vote-list :more="more" :list="list" :load = "load" :switch="switchFlag" @goByName="goByName" @decideByBallot="decideByBallot" :currentIndexs="voteCurrentIndexs"></vote-list>
	</div>
	

</div>
<p class="btn" @click.stop="goRecord" v-if="hasWx">
	<i class="iconfont icon-maikefeng"></i>
	<span>我要录制</span>
</p>
<error-tip ref="errorTip" :error="error"></error-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import ErrorTip from 'components/error-tip/error-tip'
import Switches from 'components/switches/switches'
import VoteList from 'components/vote-list/vote-list'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData } from 'api/init'
import { putData } from 'api/api'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			error: '',
			switches: [{ name: '最佳人气作品' }, { name: '最新参赛作品' }],
			isShow: false,
			story: {},
			more: true,
			currentPage: 0,
			size: 10,
			list: [],
			load: true,
			pullUp: true,
			beforeScroll: true,
			url: '',
			switchIndex: 0,
			hasWx: false,
			voteCurrentIndexs: [],
			switchFlag: false
		}
	},
	
	created() {
		this.$nextTick(() => {
			this.hasWx =  this.versions()
		})
	},
	beforeMount() {
		let id = this.$route.params.id;
		this._getSingerDetails(id)
	},
	watch: {
		switchIndex(newVal, oldVal) {
			//console.log(newVal, oldVal)
			this.currentPage = 0;
			this.more = true;
			this.switchFlag = !this.switchFlag;
			this.list = []
			this._getStories(this.url, {page: this.currentPage, size: this.size, sort: this.sort})
		}
	},
	computed: {
		sort() {
			return this.switchIndex ? 'id,desc' : 'likeNum,desc'
		}
	},
	methods: {
		decideByBallot(item, index) {
			//点赞排序
			putData(`/api/contestant/updatelikenum/${item.id}/`).then(res => {
				if(res.status === 200) {
					if(this.voteCurrentIndexs.indexOf(index) === -1) {
						this.voteCurrentIndexs.push(index);
					}
					this.list[index].likeNum = res.data
					this.$nextTick(() => {
						let list = this.list;
						this.list = list.sort((a, b) => {
							return b.likeNum - a.likeNum
						})
					})
				}
			}).catch(err => {
				if(err && err.data) {
					this.error = `${err.data.message}`
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		},
		switchItem(index) {
			console.log(index)
			this.switchIndex = index;
		}, 
		goByName(item) {
			console.log('goByName')
			let id = item.contestant.id;
			this.$router.push({
				path: '/singer',
				query: {
					id
				}
			})
		},
		goRecord() {
			let id = this.$route.params.id;
			this.$router.push({
				path: '/record',
				query: {
					id: id
				}
			})
		},
		toggleText() {
			this.isShow = !this.isShow;
			this.$nextTick(()=>{
				this.$refs.scroll.refresh()
			})
		},
		hasMoreData() {
			if(!this.more) return;
			this.currentPage+=1;
			this._getStories(this.url, {page: this.currentPage, size: this.size, sort: this.sort})
		},
		
		_getStories(url, params) {
			this.load = true;
			getData(url, params).then(res => {
				this.load = false;
				if(res.status===200) {
					this.list= [...this.list, ...res.data]
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
		_getSingerDetails(id) {
			getData(`/api/audition_story/${id}`).then(res=> {
				if(res.status===200) {
					this.story = res.data
					let id = this.$route.params.id;
					this.url = `/api/audition_story/${id}/players`
					this._getStories(this.url, {page: this.currentPage, size: this.size, sort: this.sort})
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		},
		_hasMore(total) {
			this.more = (this.currentPage+1) * this.size < total

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
	color: $color-theme;
	font-size: $font-size-large;
	i {
		padding-right: 4px;
		font-size: $font-size-large;
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
		.title {
			text-align: center;
			padding-bottom: 16px;
			@include border-1px($color-background)
		}
		p {
			line-height: 1.5;
			padding-top: 12px;
			&.ellipsis {
				@include ellipsis(3);
			}
			i {
				font-size: $font-size-medium;
				padding-left: 6px;
			}	
		}
	}
	
	.switches-wrap {
		padding-top: 22px;
	}
}

</style>