<template>
<scroll class="page" ref="scroll" :data="list">
<div class="vote-wrap" ref="vote">
	<div class="battle-current-wrap" v-if="list.length>0">
		<battle-item :item="list[0]" :list="audioList" :currentIndex="currentIndex" @goByName="goByName" @decideByLove="decideByLove" ></battle-item>
	</div>
	<div class="top-wrap" v-if="book">
		<div class="img-wrap">
			<img :src="book.cover">
		</div>
		<div class="book-content-wrap" v-if="book.content">
			<p class="title">{{book.name}}</p>
			<transition name="fade" mode="out-in">
				<p :class="isShow && book.content.length > 70 ? '' : 'ellipsis'">{{book.content}}</p>
			</transition>
			<p style="text-align: center;" @click.stop="toggleText" v-if="book.content.length>70">
				<span>{{isShow ? '收起内容' : '展开全部'}}</span>
				<i class="iconfont" :class="isShow ? 'icon-jiantoushang' : 'icon-jiantouxia'"></i>
			</p>
		</div>
	</div>
	<h3 class="battle-list-title">该书其他选手PK</h3>
	<div class="battle-list-wrap">
		<battle-list :list="list" :load="load" @goByName="goByName"></battle-list>
	</div>
	
</div>
<p class="share-wrap" v-if="hasWx">
	<i @click.stop="showShareTip" class="iconfont icon-fenxiang"></i>
</p>
<a :href="book.buyLink" class="btn">音频太短？点击这里听全本</a>
<share-tip ref="shareTip"></share-tip>
<error-tip ref="errorTip" :error="error"></error-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import ErrorTip from 'base/error-tip/error-tip'
import BattleItem from 'base/battle-item/battle-item'
import BattleList from 'base/battle-list-d/battle-list-d'
import ShareTip from 'base/share-tip/share-tip'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { CreatePKgroup } from 'assets/js/pkGroup'
import { CreateBook } from 'assets/js/book'
import { postData, putData, patchData } from 'api/api'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			error: '',
			isShow: false,
			list: [],
			load: true,
			url: '',
			hasWx: false,
			book: {},
			currentIndex: -1,
			audioList: []
		}
	},
	
	created() {
		this.hasWx =  this.versions()
		//id, storyId
		let id = this.$route.query.pkGroupId;
		let storyId = this.$route.params.id;
		this._getBookDetailsPK(id, storyId)
	},
	
	
	methods: {
		showShareTip() {
			this.$refs.shareTip.show()
		},
		decideByLove(item, index) {
			//点赞排序
			console.log(item)
			let groupid = item.pkGroupId;
			let player = index ? 'blue' : 'red';
			let bPlayer = `${player}Player`

			patchData(`/api/user/${groupid}/${player}/vote`).then(res => {
				if(res.status === 200) {
					this.currentIndex = index;
					item[bPlayer].likenum = res.data
					this.list[0] = item;
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
		
		goByName(item) {
			this.$router.push({
				path: '/singer',
				query: {
					id: item.id
				}
			})
		},
		toggleText() {
			this.isShow = !this.isShow;
			this.$nextTick(()=>{
				this.$refs.scroll.refresh()
			})
		},
		
		_getBookDetailsPK(id, storyId) {
			this.load = true;
			postData(`/api/pk/${id}/${storyId}`).then(res=> {
				if(res.status===200) {
					this.load= false
					let result = this._normalizeData(res.data);
					this.list = result.list;
					this.audioList.push(result.list[0].redPlayer) 
					this.audioList.push(result.list[0].bluePlayer) 
					this.book = result.book
					
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		},
		_normalizeData(data) {
			let res = []
			let list = data.pkGroup
			let id = data.id
			let name = data.title
			let content = data.content
			let cover = data.coverImage
			let buyLink = data.buyLink
			let book = CreateBook({
				id,
				name,
				content,
				cover,
				buyLink
			})
			list.forEach(item => {
				let bookId = data.id;
				let bookName = data.title;
				let pkGroupId = item.id;
				let redPlayer = item.redPlayer;
				let bluePlayer = item.bluePlayer;
				res.push(CreatePKgroup({bookId, bookName, pkGroupId, redPlayer, bluePlayer}))
			})
			return {
				book,
				list: res
			}
		}
	},
	components: {
		Scroll,
		ErrorTip,
		BattleItem,
		BattleList,
		ShareTip
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.share-wrap {
	position: fixed;
	right: 0;
	top: 10px;
	padding: 0 10px;
	z-index: 800;
	i {
		color: $color-text-l;
	}
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
	padding-top: 24px;
	/* background: $color-background-d; */
	.battle-current-wrap, .battle-list-wrap, .battle-list-title {
		padding: 16px;
	}
	.battle-list-title {
		border-top: 8px solid $color-background;
		color: $color-text-l;
		font-size: $font-size-medium-x;
	}
	.top-wrap {
		padding: 16px;
		display: flex;
		@include border-1px($color-background)
		.img-wrap {
			flex: 0 0 64px;
			width: 64px;
			height: 94px;
			overflow: hidden;
			margin-right: 8px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.book-content-wrap {
			flex: 1;
		}
		.title {
			color: $color-text-d;
			font-size: $font-size-medium-x;
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
	
}

</style>