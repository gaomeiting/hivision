<template>
<div class="list-wrap">
	<ul class="vote">
		<li class="vote-item" v-for="(item, index) in list " :key="index">
		  	<div class="head" style="background-image: url('https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e28f94a74fa98226a7c12d27ba83b97a/54fbb2fb43166d22460103464a2309f79152d2e9.jpg');">
		  		<p>
		  			<i class="iconfont" :class="index === currentSongIndex && flag ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'"></i>
		  			 <!-- :class="{'active': index === currentSongIndex && flag}" -->
		  			<!-- <i class="iconfont icon-bofangqi-zanting"></i> -->
		  		</p>
		  	</div>
		  	<div class="text">
		  		<h3>太阳叔叔<!-- <strong>13557 票</strong> --></h3>
		  		<p>个人简介个人简介个人简介个人简介</p>
		  	</div>
		  	<div class="icon active">
		  		<p>
		  			<i class="iconfont icon-zan"></i>
		  		</p>
		  		<p>112</p>
		  	</div>
		</li>
	</ul>
	<div class="result-wrap" v-if="load">
		<loading></loading>
	</div>
	<div v-else class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length === 0"></no-result>
		<p v-if="list.length>0 && !more">我是有底线的</p>
	</div>
	<audio :src="list[currentSongIndex] && list[currentSongIndex].url" ref="audio" @timeupdate="updateTime" @play="ready"></audio>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "~/components/no-result/no-result"
import Loading from '~/components/loading/loading';
export default {
	props: {
		currentIndex: {
			type: Number,
			default: 0
		},
		list: {
			type: Array,
			default() {
				return []
			}
		},
		more: {
			type: Boolean,
			default: true
		},
		load: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentSongIndex: -1,
			flag: false,
			currentTime: '',
			totalTime: '',
			songReady: false
		}
	},
	methods: {
		selectItem(index) {
			this.$emit('selectItem', index)
		},
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
	},
	components: {
		NoResult,
		Loading
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.result-wrap {
	padding-top: 20px;
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
			p{
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 28px;
				background: rgba(0,0,0,0.5);
				text-align: center;
				color: $color-theme;
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