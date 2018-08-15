<template>
<scroll class="page" ref="scroll">
	<div class="me-wrap" ref="me">
		<div class="top" v-if="singer">
			<div class="img" :style="'background-image: url('+singer.avatar+');'"> </div>
			<h3>{{ singer.nickname }}</h3>
			<p> {{ singer.slogan }} </p>
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
		<div class="handler-wrap">
			<ul>
				<li @click.stop="goDome(singer.entryWorks)">
					<i class="iconfont icon-guanli"></i>
					<p>参赛作品管理</p>
					<i class="iconfont icon-jiantouyou"></i>
				</li>
				<li @click.stop="goPutProfile">
					<i class="iconfont icon-setup"></i>
					<p>参赛报名信息</p>
					<i class="iconfont icon-jiantouyou"></i>
				</li>
				<li @click.stop="goShareImages">
					<i class="iconfont icon-fenxiang"></i>
					<p>生成分享图片</p>
					<i class="iconfont icon-jiantouyou"></i>
				</li>
			</ul>
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

				/*url: 'http://dl.stream.qqmusic.qq.com/C400001UynRM0Noiti.m4a?vkey=BAAFF1DE5DBAF8E041FA5DC7AA7C5492AD66CA8352A4EC0F1CFC34B248AC713A1CEBA739204FE121DAF88C26469A33328DE78E7B5BC07DB6&guid=8182525974&uin=0&fromtag=66',
				duration: 227*/
			},
			currentTime: '0:00',
			playing: false,
			percent: 0,
			songReady: false,
			error: '',
			singer: {
			}
		}
	},
	head() {
		return {
			title: '个人中心'
		}
	},
	created() {
		this._getCurrentInfo()
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
		goDome(list) {
			let dome = encodeURIComponent(JSON.stringify(list))
			this.$router.push(`/dome`)
		},
		goPutProfile() {
			this.$router.push('/profile/30')
		},
		goShareImages() {
			this.$router.push('/card/30')
		},
		setSongProgress(percent, flag) {
			if(percent==1){
				this.end();
				return;
			}
			if(this.$refs.audio.currentTime==percent*this.currentSong.duration){
				return;
			}
			this.$refs.audio.currentTime = percent*this.currentSong.duration
			/*if(!flag) {
				this.playing = flag
			}
			else{
				if(this.playing) {
					this.togglePlaying()
				}
			}*/
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
					this.error = `${err.data.status}${err.data.message}`
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		},
		_normalizeData(res) {
			this.singer = res.data
			if(res.data.entryWork) {
				this.currentSong.duration = res.data.entryWork.duration / 1000;
				this.currentSong.url = res.data.entryWork.voiceUrl;
			}
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
		> ul {
			display: flex;
			padding-top: 16px;
			li {
				flex: 1;
				p {
					text-align: center;
					line-height: 1.5;
				}
			}
		}
	}
	.music-wrap {
		background: $color-background;
		padding: 16px;
		h2 {
			font-size: $font-size-medium-x;
			color: $color-text-d;
			padding-bottom: 10px;
		}
		p {
			line-height: 1.5;
		}
	}
	.handler-wrap {
		li {
			display: flex;
			padding: 0 16px;
			align-items: center;
			@include border-type-1px($color-text-ll, solid)
			i {
				@include extend-click()
			}
			p {
				flex: 1;
				line-height: 3.5;
				padding: 0 6px;
			}
		}
	}
}

</style>