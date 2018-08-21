<template>
<scroll class="page" ref="scroll">
	<div class="me-wrap" ref="me">
		<div class="top" v-if="singer">
			<div class="singer-top">
				<div class="icon">
					<i class="iconfont icon-wxfriends"></i>
					<p>36001</p>
					<p>投票</p>
				</div>
				<div class="head-wrap">
					<div class="img" :style="'background-image: url('+singer.avatar+');'"> </div>
					<h3>{{ singer.nickname }}</h3>
					<!-- <p> {{ singer.title }} </p> -->
				</div>
				<div class="icon">
					<i class="iconfont icon-fenxiang"></i>
					<p>36001</p>
					<p>分享</p>
				</div>
			</div>
			
		</div>
		<div class="music-wrap">
			<h2>参赛作品</h2>
			<p v-if="singer.entryWork">{{singer.entryWork.voiceTitle}}</p>
			<p v-else>暂未提交参赛作品，请使用报名参赛的邮箱，发送作品名称及音频mp3到hvkid@ddpeiyin.com</p>
			<div class="music">
				<div class="operators">
					<div class="icon i-center" @click.stop.prevent="togglePlaying">
						<i class="iconfont" :class="playIcon"></i>
					</div>
				</div>
				<div class="progress-wrapper">
					<span class="time time-l">{{ currentTime }}</span>
					<div class="progress-bar-wrapper">
					  	<progress-bar :percent="percent" @triggerPercent="setSongProgress"></progress-bar>
					</div>
					<span class="time time-r">{{ format(currentSong.duration) }}</span>
				</div>
			</div>
		</div>
		<div class="music-wrap">
			<h2>参赛宣言</h2>
			<p>{{singer.slogan}}</p>
		</div>
		<audio :src="currentSong.url" ref="audio" @play="ready" @error="errorSong" @timeupdate="updateTime" @ended="end"></audio>
		<error-tip ref="errorTip" :error="error"></error-tip>
	</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import ProgressBar from '~/components/progress-bar/progress-bar';
import ErrorTip from '~/components/error-tip/error-tip';
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			currentSong: {
				duration: 270,
				url: 'http://dl.stream.qqmusic.qq.com/C400001VgbVT41jKg1.m4a?vkey=32A507AA1843EC3059FED697992107732347B57A6D7800CCC98221DB51DDEE967B007A76BB3C54E0E6495E1C362479A9F0C43AD297F237C0&guid=8182525974&uin=0&fromtag=66'
			},
			currentTime: '0:00',
			playing: false,
			percent: 0,
			songReady: false,
			error: '',
			singer: {
				avatar: 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=65d890b39422720e64cee4fa4bca0a3a/4a36acaf2edda3cc10f68df10de93901203f92d4.jpg',
				nickname: '太阳叔叔',
				title: '湖北人民广播电台少儿频道主持人',
				slogan: '湖北人民广播电台少儿频道主持人，金话筒获得者湖北人民广播电台少儿频道主持人，金话筒获得者',
				entryWork: {
					voiceTitle: '小蝌蚪找妈妈'
				}
			}
		}
	},
	head() {
		return {
			title: '个人中心'
		}
	},
	created() {
		/*this._getCurrentInfo()*/
	},
	beforeMount() {
		this._getShareConfig('', true)
	},
	
	computed: {
		disableCls() {
			return this.songReady ? '' : 'disable'
		},
		playIcon() {
			return this.playing ? 'icon-bofang' : 'icon-pause'
		}
	},
	methods: {
		
		setSongProgress(percent, flag) {
			if(percent==1){
				this.end();
				return;
			}
			if(this.$refs.audio.currentTime==percent*this.currentSong.duration){
				return;
			}
			this.$refs.audio.currentTime = percent*this.currentSong.duration
			if(!flag) {
				this.playing = flag
			}
			else{
				if(!this.playing) {
					this.togglePlaying()
				}
			}
		},
		ready() {
			this.songReady= true;
		},
		errorSong() {
			this.songReady= true;
		},
		updateTime(e) {
			let currentTime = e.target.currentTime | 0;
			let totalTime = this.currentSong.duration;
			this.currentTime = this.format(currentTime);
			this.percent = currentTime / totalTime ;
		},
		end() {
			this._loop()
		},
		togglePlaying() {
			this.playing = !this.playing
			if(this.playing) {
				clearTimeout(this.timer)
				this.timer=setTimeout(() => {
					const audio=this.$refs.audio;
					audio.play()
				},30)
			}
			else {
				clearTimeout(this.timer)
				this.timer=setTimeout(() => {
					const audio=this.$refs.audio;
					audio.pause()
				},30)
			}
		},
		format(n) {
			let m=0;
			let s=0;
			m= n / 60 | 0;
			s= n % 60;
			let padS=this._pad(s)
			return `${m}:${padS}`
		},
		_getCurrentInfo() {
			getData('/api/contestant/current').then(res => {
				this._hasStatus(res)
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
		_normalizeData(res) {
			this.singer = res.error
			this.currentSong.duration = res.error.entryWork.duration / 1000;
			this.currentSong.url = res.error.entryWork.voiceUrl;
		},
		_hasStatus(res) {
			if(res.status == 406) {
				this.error = res.message;
				this.$refs.errorTip.show()
			}
			else if(res.status == 302) {
				window.location = res.error;
			}
			else if(res.status == 401) {
				this.$router.push('/bind')
			}
			else if(res.status == 200) {
				this._normalizeData(res);
			}
		},
		_loop() {
			this.$refs.audio.currentTime=0;
			
			this.$refs.audio.play();
		},
		_pad(num,n=2){
			let len=num.toString().length
			while(len<n) {
				num='0' +num
				len++
			}
			return num
		}
	},
	components: {
		Scroll,
		ProgressBar,
		ErrorTip
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.music {
	display: flex;
	.progress-wrapper {
		display: flex;
		align-items: center;
		width: 80%;
		margin: 0px auto;
		padding: 10px 0;
		.time {
			color: $color-text;
			font-size: $font-size-small;
			flex: 0 0 30px;
			line-height: 30px;
			width: 30px;
			&.time-l {
			  text-align: left;
			}
			&.time-r {
			  text-align: right;
			}
		}
		.progress-bar-wrapper {
			flex: 1;
		}
	}
	.operators {
		display: flex;
		align-items: center;
		.icon {
			flex: 1;
			color: $color-theme;
			&.disable {
			  color: $color-theme-d;
			}
			i {
			  font-size: 30px;
			}
		}
		
		.i-center {
			text-align: center;
			i {
			  font-size: 30px;
			}
		}
		
	}
}

.me-wrap {
	min-height: 100vh;
	background: $color-background-d;
	
	.top {
		padding: 30px 16px 16px;
		@include border-type-1px($color-text-ll, dashed)
		.singer-top {
			display: flex;
			align-items: flex-end;
			.icon {
				text-align: center;
				padding-bottom: 12px;
				i {
					font-size: $font-size-large-x;
				}
				p {
					line-height: 1.5;
				}
			}
			.head-wrap {
				flex: 1;
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
					color: $color-text-d;
					font-size: $font-size-large;
					line-height: 2;
					padding-top: 12px;
				}
			}
		}
		
		
	}
	.music-wrap {
		background: $color-background;
		padding: 16px;
		&:last-of-type {
			background: $color-background-d;
			text-align: center;
		}
		h2 {
			font-size: $font-size-medium-x;
			color: $color-text-d;
			padding-bottom: 10px;
		}
		p {
			line-height: 1.5;
		}
	}
	
}

</style>