<template>
<scroll class="page" ref="scroll" :data="list">
	<div class="vote-wrap" ref="vote" v-if="list.length > 0">
		<h3 class="title">我的复赛作品</h3>
		<div class="vote-item">
		  	<div class="head" :style="'background-image: url('+list[0].avatar+');'" @click.stop="settingCurrentSong(0)">
		  		<p :class="song && 0 === currentSongIndex && flag ? 'active' : ''">
		  			<i class="iconfont" v-if="0 != currentSongIndex || 0 === currentSongIndex && !song " :class="0 === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  		</p>
		  	</div>
		  	<div class="text">
		  		<h3>{{ pkGroup.bookName }}<!-- {{item.contestant.nickname}} --><!-- <strong>13557 票</strong> --></h3>
		  	</div>
		  	<div class="icon">
		  		<p>
		  			<i class="iconfont icon-zan"></i>
		  		</p>
		  		<p>{{list[0]['likenum']}}<!-- {{item.likeNum}} --></p>
		  	</div>
		</div>
		<h3 class="title">我的复赛对手：<span v-if="list.length > 0" @click.stop="goSinger">{{list[1]['nickname']}}</span></h3>
		<div class="vote-item">
		  	<div class="head" :style="'background-image: url('+list[1].avatar+');'" @click.stop="settingCurrentSong(1)">
		  		<p :class="song && 1 === currentSongIndex && flag ? 'active' : ''">
		  			<i class="iconfont" v-if="1 != currentSongIndex || 1 === currentSongIndex && !song " :class="1 === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  		</p>
		  	</div>
		  	<div class="text">
		  		<h3>{{ pkGroup.bookName }}<!-- {{item.contestant.nickname}} --><!-- <strong>13557 票</strong> --></h3>
		  	</div>
		  	<div>
		  		<p>
		  			<i class="iconfont icon-zan"></i>
		  		</p>
		  		<p>{{list[1]['likenum']}}<!-- {{item.likeNum}} --></p>
		  	</div>
		</div>
	</div>
	<div class="result-wrap" v-else>
		<no-result title="空空如也~~" v-if="list.length === 0"></no-result>
	</div>
	<audio :src="list[currentSongIndex] && list[currentSongIndex].voiceUrl" ref="audio" @timeupdate="updateTime" @play="ready" @ended="end"></audio>
	<error-tip ref="errorTip" :error="error"></error-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import ErrorTip from 'components/error-tip/error-tip'
import NoResult from "components/no-result/no-result"
import { CreatePKgroup } from 'assets/js/pkGroup'
import { getData } from 'api/api'
import { audioHandler } from 'assets/js/mixin'
export default {
	mixins: [audioHandler],
	data() {
		return {
			error: '',
			list: [],
			pkGroup: {},
			id: ''
		}
	},
	
	created() {
		//console.log(this.$route.query)
		this.id = this.$route.query.id;
		this._getPkDome();
	},
	methods: {
		goSinger() {
			let id = this.list[1].id;
			this.$router.push({
				path: '/singer',
				query: {
					id
				}
			})
		},
		_getPkDome() {
			getData('/api/pk/status').then(res => {
				if(res.status === 200) {
					let data = res.data;
					this.pkGroup = CreatePKgroup({
						bookId: data.pkGroup.id,
						bookName: data.pkGroup.title,
						redPlayer: data.pkGroup.redPlayer,
						bluePlayer: data.pkGroup.bluePlayer
					})
					if(this.pkGroup.redPlayer.id === this.id) {
						this.list.push(this.pkGroup.redPlayer)
						this.list.push(this.pkGroup.bluePlayer)
					}
					else {
						this.list.push(this.pkGroup.bluePlayer)
						this.list.push(this.pkGroup.redPlayer)
					}
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
				else {
					this.error = `程序调试中`
					this.$refs.errorTip.show()
				}
			})
		}
		
	},
	components: {
		Scroll,
		ErrorTip,
		NoResult
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.result-wrap {
	padding-top: 30px;
}
.vote-wrap {
	min-height: 100vh;
	.title {
		line-height: 44px;
		text-indent: 16px;
		color: $color-text-l;
		span {
			color: #009a61;
			text-decoration: underline;
		}
		/* @include border-type-1px ($color-text-ll, solid) */
	}
	.vote-item {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		/* @include border-type-1px($color-text-ll, dashed) */
		&:first-of-type {
			/* border: 1px solid $color-background; */
			border-radius: 6px;
			box-shadow: 0 1px 2px rgba(0,0,0,0.1);
			margin: 16px;
		}
		&:last-child {
			padding: 12px 32px;
			@include border-type-1px($color-background, dashed)
		}

		.head {
			width: 56px;
			height: 56px;
			overflow: hidden;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
			background-color: $color-text-d;
			margin-right: 10px;
			p{
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 28px;
				background: rgba(0,0,0,0.5);
				text-align: center;
				color: $color-theme;
				&.active {
					background-image: url('/st/loading.gif');
					background-size: 28px 28px;
					 background-repeat: no-repeat;
					  background-position: center center;
				}
				i {
					line-height: 56px;
					font-size: 28px;
				}
			}
			
		}
		.text {
			flex: 1;
			h3 {
				line-height: 1.5;
				strong {
					color: $color-theme;
				}
			}
			p {
				padding-top: 6px;
			}
		}
		.icon {
			text-align: center;
			padding-left: 10px;
			&.active {
				color: $color-theme;
			}
			i {
				font-size: $font-size-large;

			}

			>p:last-child {
				padding-top: 10px;
			}
		}
	}
}

</style>