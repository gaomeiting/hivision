<template>
<div class="list-wrap">
	<ul class="vote">
		<li class="vote-item" v-for="(item, index) in list " :key="index">
		  	<div class="head" v-if="item.story"> <img :src="item.story.coverImg" alt=""></div>
		  	<div class="text">
		  		<h3 v-if="item.story">{{item.story.title}}<!-- <strong>20人录制</strong> --></h3>
		  		<div class="icon-wrap">
		  			<p class="icon" :class="song && index === currentSongIndex && flag ? 'active' : ''" @click.stop="settingCurrentSong(index)">
		  				<span v-if="index != currentSongIndex || index === currentSongIndex && !song ">
				  			{{ index === currentSongIndex && flag ? '暂停' : '播放' }}
				  		</span>
				  	</p>
				  	<p class="icon" @click.stop="record(item)">重录</p>
				  	<p class="icon" @click.stop="deleteOne(item, index)">删除</p>
		  		</div>
		  	</div>
		  	
		</li>
	</ul>
	<div class="result-wrap">
		<div class="no-result-wrap" v-if="list.length === 0">
			<no-result title="空空如也~~"></no-result>
		</div>
		<p v-if="list.length>0 && !more">我是有底线的</p>
	</div>
	<audio :src="list[currentSongIndex] && list[currentSongIndex].voiceUrl" ref="audio" @timeupdate="updateTime" @play="ready" @ended="end"></audio>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "base/no-result/no-result"
import { audioHandler } from "assets/js/mixin"
export default {
	mixins: [ audioHandler ],
	props: {
		currentIndex: {
			type: Number,
			default: 0
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
		record(item) {
			this.$emit('record', item)
		}, 
		deleteOne(item, index) {
			this.$emit('deleteOne', item, index)
		},
		selectItem(index) {
			this.$emit('selectItem', index)
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
.result-wrap {
	.no-result-wrap {
		padding-top: 100px;
	}
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
			width: 64px;
			height: 94px;
			overflow: hidden;
			background-color: $color-text-d;
			margin-right: 10px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.text {
			flex: 1;
			h3 {
				line-height: 1.5;
				padding-bottom: 16px;
				strong {
					color: $color-theme;
					padding-left: 1em;
				}
			}
			p {
				line-height: 1.5;
				@include ellipsis(2);
			}
		}
		.icon-wrap {
			display: flex;
			.icon {
				width: 66px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				color: $color-theme;
				border: 1px solid $color-theme;
				border-radius: 16px;
				background: $color-theme;
				color: $color-background;
				margin-right: 6px;
				&.active {
					background-image: url('/st/loading.gif');
					background-size: 20px 20px;
					background-repeat: no-repeat;
					background-position: center center;
				}
				&:last-of-type {
					border: 1px solid $color-background;
					background: none;
					color: $color-text;
				}
			}
		}
		
	}

}
</style>