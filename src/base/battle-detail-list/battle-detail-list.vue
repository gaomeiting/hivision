<template>
<div>
<h2 class="title">PK赛</h2>
<div class="pk-wrap-wrap">
<div class="pk-wrap">
		<div v-if="item.redPlayer">
			<figure @click.stop="settingCurrentSong(0)">
	  			<img :src="item.redPlayer.avatar">
	  			<p class="voice-icon-wrap" :class="song && 0 === currentSongIndex && flag ? 'active' : ''">
	  				<i class="iconfont" v-if="0 != currentSongIndex || 0 === currentSongIndex && !song " :class="0 === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
	  			</p>
	  		</figure>
	  		<p>{{item.redPlayer.nickname}}</p>
	  		<div class="zan-wrap" :class="{'active' : currentIndex === 0}" @click.stop="decideByLove(item, 0)">
	  			<p><i class="iconfont icon-zan"></i></p>
	  			<p>{{item.redPlayer.likenum}}</p>
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
	  		<p>{{item.bluePlayer.nickname}}</p>
	  		<div class="zan-wrap" :class="{'active' : currentIndex === 1}" @click.stop="decideByLove(item, 1)">
	  			<p><i class="iconfont icon-zan"></i></p>
	  			<p>{{item.bluePlayer.likenum}}</p>
	  		</div>
		</div>
</div>
</div>
<h2 class="title">参赛作品</h2>
<div class="list-wrap">
	<ul class="vote">
		<li class="vote-item" v-for="(item, index) in list " :key="index" v-if="index > 1 &&  item.story">
		  	<div class="head" :style="'background-image: url('+item.story.coverImg+');'" @click.stop="settingCurrentSong(index)">
		  		<div :class="song && index === currentSongIndex && flag ? 'active' : ''">
		  			<i class="iconfont"  v-if="index != currentSongIndex || index === currentSongIndex && !song " :class="index === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  			<!-- <i class="iconfont icon-bofangqi-zanting"></i> -->
		  		</div>
		  	</div>
		  	<div class="text">
		  		<h3>{{item.story.title}}</h3>
		  		<!-- <p>20人录制</p> -->
		  	</div>
		  	<div class="icon" :class="{'active' : currentIndexs.includes(index)}"  @click.stop="decideByBallot(item, index)">
		  		<p>
		  			<i class="iconfont icon-zan"></i>
		  		</p>
		  		<p>{{item.likeNum}}</p>
		  	</div>
		</li>
	</ul>
	<div class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length <= 2"></no-result>
		<p v-if="list.length>10 && !more">我是有底线的</p>
	</div>
</div>
<audio :src="list[currentSongIndex] && list[currentSongIndex].voiceUrl" ref="audio" @timeupdate="updateTime" @play="ready" @ended="end"></audio>  
</div>
</template>

<script type="text/ecmascript-6">
import NoResult from "base/no-result/no-result"
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
		currentIndexs: {
			type: Array,
			default() {
				return []
			}
		},
		list: {
			type: Array,
			default() {
				return [1]
			}
		},
		more: {
			type: Boolean,
			default: true
		}
	},
	
	methods: {
		selectItem(index) {
			this.$emit('selectItem', index)
		},
		decideByBallot(item, index) {
			this.$emit('decideByBallot', item, index)
		},
		goByName(item) {
			this.$emit('goByName', item)
		},
		goByBook(bookId, pkGroupId) {
			this.$emit('goByBook', bookId, pkGroupId)
		},
		decideByLove(item, index) {
			this.$emit('decideByLove', item, index)
		}
		
	},
	components: {
		NoResult
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.title {
	font-size: $font-size-medium-x;
	color: $color-theme;
	padding-left: 16px;
	line-height: 44px;
	@include border-1px($color-background)
}
.pk-wrap-wrap {
	padding: 16px;
}
.pk-wrap {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 16px;
	border-radius: 4px;
	box-shadow: 1px 0 4px rgba(0,0,0,0.2);
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
					background-image: url('/st/loading.gif');
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
				padding: 4px;
				&.active {
					color: $color-theme;
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
.result-wrap {
	padding-top: 16px;
	p {
		text-align: center;
		line-height: 2;
	}
}
.vote {
	padding: 0 16px;
	.vote-item {
		display: flex;
		align-items: center;
		padding: 12px 0;
		@include border-type-1px($color-text-ll, dashed)
		&:last-child {
			@include border-type-1px($color-background-d, dashed)
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
			div{
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 28px;
				text-align: center;
				color: $color-theme;
				background: rgba(0,0,0,0.5);
				&.active {
					background-image: url('/st/loading.gif');
					background-size: 28px 28px;
					 background-repeat: no-repeat;
					  background-position: center center;
				}
				i {
					line-height: 56px;
					font-size: 30px;
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