<template>
<div class="list-wrap">
	<ul>
		
		<li v-for="(item, index) in list" :key="index">
			<figure>
				<img :src="item.narrator.avatar" alt="">
			</figure>
			<div class="content">
				<p>
					<strong>{{item.narrator.nickname}}</strong>
					<i v-if="item.narrator.gender==='男'" class="iconfont icon-nan"></i>
					<i v-if="item.narrator.gender==='女'" class="iconfont icon-nv"></i>
					<!-- <i class="iconfont icon-nan"></i> -->
					<i v-if="item.narrator.grade" class="iconfont icon-nan"></i>
					<small v-if="item.narrator.grade">{{item.narrator.grade}}</small>
				</p>
				 <p class="dialog" v-if="!type" @click.stop.prevent="settingCurrentSong(index)">
					<i class="iconfont icon-shengyin" :class="{'active': index === currentSongIndex && flag}"></i>
					<strong>{{ currentSongIndex >= 0 && index === currentSongIndex ? currentTime : totalTime}}</strong>
					<span class="triangle-left"></span>
				</p>
				<p class="tags" v-if="type">
					<span>新闻播报</span>
					<span>新闻播报</span>
					<span>新闻播报</span>
				</p>
			</div>
		</li>
	</ul>
	<audio :src="list[currentSongIndex] && list[currentSongIndex].url" ref="audio" @timeupdate="updateTime" @play="ready"></audio> 
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default() {
			return []
		}
	},
	type: {
		type: Number,
		default: 0
	}
},
data() {
	return {
		currentSongIndex: -1,
		flag: false,
		currentTime: '',
		totalTime: '- 00:00',
		songReady: false
	}
},
watch: {
	/*currentSongIndex(newIndex, oldIndex) {
		
		setTimeout(() => {
			this.$refs.audio.play();
			window.alert(this.$refs.audio.paused+","+this.songReady)
			this.flag = true;
		}, 30)
	}*/
},
methods: {
	settingCurrentSong(index) {
		if(index === this.currentSongIndex) {
			//歌曲切换
			this.flag = !this.flag;
			this.flag ?  this.$refs.audio.play() :  this.$refs.audio.pause()
		}
		else {
			this.currentSongIndex = index
			setTimeout(() => {
				this.$refs.audio.play();
			}, 30)
			this.flag = true;

		}
		console.log(this.list[this.currentSongIndex].url)
	},
	ready() {
		this.songReady= true;
	},
	updateTime(e) {
		//window.alert(e.target.currentTime)
		let currentTime = e.target.currentTime | 0;
		let totalTime = this.$refs.audio.duration | 0;
		let diff = totalTime*1-currentTime*1
		this.currentTime = "- " + this.format(diff);
		//console.log(this.percent, e.target.currentTime, totalTime, "updateTime")
	},
	format(n) {
		let m = 0;
		let s = 0;
		m = n / 60 | 0;
		s = n % 60;
		let padS = this._pad(s)
		return `${m}:${padS}`
	},
	_pad(num, n = 2) {
		let len = num.toString().length
		while (len < n) {
			num = '0' + num
			len++
		}
		return num
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.list-wrap {
	ul {
		li {
			background: $color-background-d;
			padding: 10px;
			margin-bottom: 10px;
			display: flex;
			flex-wrap: wrap;
			@include border-1px($color-text-ll);
			&:last-child {
				margin-bottom: 0;
				@include border-1px($color-background-d);
			}
			figure {
				flex: 0 0 44px;
				width: 44px;
				height: 44px;
				overflow: hidden;
				border-radius: 25px;
				img {
					width: 100%;
					min-height: 100%;
				}
			}
			.content {
				flex: 1;
				p {
					display: flex;
					align-items: flex-start;
					&.tags {
						flex-wrap: wrap;
						margin-top: 10px;
						span {
							background: $color-theme-d;
							color: $color-text-l;
							padding: 0.2em 0.4em;
							border-radius: 4px;
							margin: 0 4px 8px;
						}
					}
					&.dialog {
						width: 140px;
						height: 30px;
						background: $color-theme;
						border-radius: 4px;
						color: $color-background-d;
						margin-left: 0.4em;
						margin-top: 8px;
						position: relative;
						.triangle-left {
							position: absolute;
							top: 50%;
							@include triangle( 12px, 6px, $color-theme, -90deg)
						}
						strong {
							display: block;
							width: 100%;
							height: 100%;
							line-height: 30px;
							text-align: center;
							padding-right: 0;
						}
						i {
							position: absolute;
							line-height: 30px;
							padding-left: 0.4em;
							padding-right: 0;
							color: $color-dialog-background;
							&.active {
								color: $color-background-d;
							}
						}
					}
					strong {
						padding-right: 0.4em;
					}
					small {
						
					}
					i {
						&:first-of-type {
							padding-right: 0.4em;
						}
					}
				}
			}
			
		}
	}
}

</style>