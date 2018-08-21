<template>
<scroll class="page" ref="scroll" :data="list">
	<div class="me-wrap" ref="me">
		<div class="top" v-if="singer">
			<div class="info">
				<div class="img" :style="'background-image: url('+singer.avatar+');'"> </div>
				<h3>{{ singer.nickname }}</h3>
				<p> {{ singer.title }} </p>
			</div>
			
			<ul>
				<li>
					<p>{{ singer.id }}</p>
					<p>参赛编号</p>
				</li>
				<li v-if="singer.popularNum">
					<p>{{ singer.popularNum }}</p>
					<p>人气排行</p>
				</li>
				<li v-if="singer.likeNum">
					<p>{{ singer.likeNum }}</p>
					<p>点赞数</p>
				</li>
			</ul>
		</div>
		<div class="music-wrap">
			<h2>参赛作品</h2>
			<div class="vote-list">
				<vote-list :list="list" @decideByBallot="decideByBallot" :currentIndexs="voteCurrentIndexs"></vote-list>
			</div>
		</div>
		
	</div>
	<p class="share-wrap" v-if="hasWxVer">
		<i @click.stop="showShareTip" class="iconfont icon-fenxiang"></i>
	</p>
	<error-tip ref="errorTip" :error="error"></error-tip>
	<share-tip ref="shareTip"></share-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import ErrorTip from '~/components/error-tip/error-tip'
import VoteList from '~/components/song-list/song-list'
import ShareTip from '~/components/share-tip/share-tip'
import { wxShare } from '~/assets/js/mixin'
import { getData, putData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			currentSong: {

				/*url: 'http://dl.stream.qqmusic.qq.com/C400001UynRM0Noiti.m4a?vkey=BAAFF1DE5DBAF8E041FA5DC7AA7C5492AD66CA8352A4EC0F1CFC34B248AC713A1CEBA739204FE121DAF88C26469A33328DE78E7B5BC07DB6&guid=8182525974&uin=0&fromtag=66',
				duration: 227*/
			},
			currentTime: '0:00',
			playing: false,
			percent: 0,
			songReady: false,
			error: '',
			singer: {},
			hasWxVer: false,
			list: [],
			voteCurrentIndexs: []
		}
	},
	head() {
		return {
			title: '声咖详情'
		}
	},
	created() {
		
	},
	beforeMount() {
		let url = this.$route.fullPath
		let id = this.$route.query.id
		this.hasWxVer=this.versions();
		this._getInfo(id)
	},
	
	
	methods: {
		decideByBallot(item, index) {
			putData(`/api/contestant/updatelikenum/${item.id}/`).then(res => {
				if(res.status === 200) {
					if(this.voteCurrentIndexs.indexOf(index) === -1) {
						this.voteCurrentIndexs.push(index);
					}
					this.list[index].likeNum = res.data
					//console.log(this.list[index].likeNum)
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
		showShareTip() {
			this.$refs.shareTip.show()
		},
		_getInfo(id) {
			getData(`/api/contestant/${id}`).then(res => {
				if(res.status == 200) {
					this.singer = res.data;
					this.list = res.data.entryWorks;
					let url = this.$route.fullPath
					let title = `我是${this.singer.nickname}，我参加了“嗨未来”与声俱来·声咖大赛，快来支持我吧！`
					this._getShareConfig(url, '', title)
				}
			}).catch(err => {
				//console.log(1123343)
				if(err && err.data) {
					this.error = `${err.data.message}`
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		},
		
	},
	components: {
		Scroll,
		ErrorTip,
		VoteList,
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
	right: 10px;
	top: 10px;
	z-index: 800;
	i {

	}
}
.me-wrap {
	min-height: 100vh;
	background: $color-background-d;
	
	.top {
		border-bottom: 8px solid $color-background;
		> .info {
			padding: 16px;
			background-image: url('~/assets/images/me_bg.png');
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
			color: $color-background-d;
			> .img {
				width: 78px;
				height: 78px;
				overflow: hidden;
				border-radius: 50%;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				margin: 0 auto;
			}
			> h3, > p {
				text-align: center;
				line-height: 1.5;
			}
			> h3 {
				font-size: $font-size-large;
				line-height: 2;
				padding-top: 12px;
			}
		}
		> ul {
			display: flex;
			padding: 16px;
			li {
				flex: 1;
				p {
					text-align: center;
					line-height: 1.5;
					&:first-child {
						color: $color-theme;
					}
				}
			}
		}
	}
	.music-wrap {
		/* background: $color-background; */
		padding: 16px 0;
		h2 {
			font-size: $font-size-medium-x;
			color: $color-theme;
			padding-left: 16px;
			padding-bottom: 16px;
			@include border-1px($color-background)
		}
	}
}

</style>