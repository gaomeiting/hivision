<template>
<div class="pk-wrap">
		<div class="pk-content">
			<div v-if="item.redPlayer">
				<figure @click.stop="settingCurrentSong(0)">
		  			<img :src="item.redPlayer.avatar">
		  			<p class="voice-icon-wrap" :class="song && 0 === currentSongIndex && flag ? 'active' : ''">
		  				<i class="iconfont" v-if="0 != currentSongIndex || 0 === currentSongIndex && !song " :class="0 === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  				<!-- <i class="iconfont icon-bofangqi-zanting"></i> -->
		  			</p>
		  		</figure>
		  		<!-- <p>{{item.redPlayer.nickname}}</p> -->
		  		<div class="zan-wrap" :class="{'active-red' : currentIndex === 0}" @click.stop="decideByLove(item, 0)">
		  			<p><i class="iconfont icon-zan"></i></p>
		  			<p>为{{item.redPlayer.nickname}}点赞</p>
		  		</div>
			</div>
			<div>
				<figure>
		  			<img src="./pk_icon.jpg">
		  		</figure>
			</div>
			<div @click.stop="goByName(item.bluePlayer)" v-if="item.bluePlayer">
				<figure @click.stop="settingCurrentSong(1)">
		  			<img :src="item.bluePlayer.avatar">
		  			<p class="voice-icon-wrap" :class="song && 1 === currentSongIndex && flag ? 'active' : ''">
		  				<i class="iconfont" v-if="1 != currentSongIndex || 1 === currentSongIndex && !song " :class="1 === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  			</p>
		  		</figure>
		  		<!-- <p>{{item.bluePlayer.nickname}}</p> -->
		  		<div class="zan-wrap" :class="{'active-blue' : currentIndex === 1}" @click.stop="decideByLove(item, 1)">
		  			<p><i class="iconfont icon-zan"></i></p>
		  			<p>为{{item.bluePlayer.nickname}}点赞</p>
		  		</div>
			</div>
		</div>
		<div class="bar-wrap">
			<p class="bar" :style="'width: '+percent(item)+ '%'">
				{{item.redPlayer.likenum}}票&nbsp;&nbsp;
			</p>
			<p v-if="item.bluePlayer.likenum || !item.bluePlayer.likenum&&!item.redPlayer.likenum">&nbsp;&nbsp;{{item.bluePlayer.likenum}}票</p>
	  	</div>
		<audio :src="list[currentSongIndex] && list[currentSongIndex].voiceUrl" ref="audio" @timeupdate="updateTime" @play="ready" @ended="end"></audio>
</div>
  
</template>

<script type="text/ecmascript-6">
import { audioHandler } from 'assets/js/mixin'
export default {
	mixins: [audioHandler],
	props: {
		currentIndex: {
			type: Number,
			default: -1
		},
		item: {
			type: Object,
			default() {
				return {}
			}
		},
		list: {
			type: Array,
			default() {
				return []
			}
		}
	},
	created() {
		console.log(this.list)
	},
	methods: {
		goByName(item) {
			this.$emit('goByName', item)
		},
		goByBook(bookId, pkGroupId) {
			this.$emit('goByBook', bookId, pkGroupId)
		},
		decideByLove(item, index) {
			this.$emit('decideByLove', item, index)
		},
		total(item) {
			return item.redPlayer.likenum*1+item.bluePlayer.likenum*1
		},
		percent(item) {
			if(item.redPlayer.likenum === item.bluePlayer.likenum) {
				return 50;
			}
			return Math.round(item.redPlayer.likenum / this.total(item) * 100)
		}
		
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.pk-wrap {
	/* padding: 16px;
	border-radius: 4px;
	box-shadow: 1px 0 4px rgba(0,0,0,0.2); */
	padding-bottom: 30px;
	@include border-type-1px($color-text-ll, dashed)
	position: relative;
}
.bar-wrap {
	width: 100%;
	background: #00CCFF;
	display: flex;
	font-size: $font-size-small;
	color: $color-background-d;
	border-radius: 6px;
	overflow: hidden;
	white-space: nowrap;
	position: absolute;
	bottom: 74px;
	.bar {
		height: 100%;
		background: #FF3333;
		text-align: right;
	}
}
.pk-content {
	width: 100%;
	display: flex;
	justify-content: space-between;
	
	> div {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		> figure, .voice-icon-wrap {
			width: 72px;
			height: 72px;
			overflow: hidden;
			border-radius: 50%;
			position: relative;
			.voice-icon-wrap {
				text-align: center;
				line-height: 72px;
				position: absolute;
				top: 0;
				left: 0;
				background: rgba(0,0,0,0.4);
				&.active {
					background-image: url('/loading.gif');
					background-size: 28px 28px;
					 background-repeat: no-repeat;
					  background-position: center center;
				}
				i {
					color: $color-theme;
					font-size: 28px;
				}
			}
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		&:nth-child(2) {
			figure {
				border-radius: 0;
			}
		}
		.zan-wrap {
				text-align: center;
				padding: 24px 4px 4px;
				&.active {
					color: $color-theme;
				}
				&.active-blue {
					color: #00CCFF;
				}
				&.active-red {
					color: #FF3333;
				}
				.icon-zan {
					font-size: $font-size-large-x;
				}
			}

		&:nth-child(1), &:nth-child(3) {
			
			> p {
				padding-top: 8px;
				line-height: 1.5;
			}
			
		}
	}
}

</style>