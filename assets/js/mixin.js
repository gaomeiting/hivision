import {
	GetData
} from '~/api/api'

export const audioHandles = {
	data() {
		return {
			currentSongIndex: 0,
			percent: 0,
			currentSongChange: true
		}
	},
	computed: {
		currentSong() {
			return this.list[this.currentSongIndex] && this.list[this.currentSongIndex]['url']
		}
	},
	methods: {
		ready() {
			this.songReady = true;
		},
		error() {
			this.songReady = true;
		},
		end() {
			console.log("end")
			this.list[this.currentSongIndex].playing = false;
			this.percent = 0;
		},
		togglePlaying(index = this.currentSongIndex) {
			if (this.currentSongIndex === index) {
				this.currentSongChange = false;
			} else {
				this.percent = 0;
			}
			this.currentSongIndex = index;
			if (!this.list[index].playing) {
				this._normalData(this.list);
				setTimeout(() => {
					const audio = this.$refs.audio;
					if (audio.currentTime && this.currentSongChange) {
						audio.currentTime = 0;
					}
					audio.play()
					//设置时间
				}, 30)
			} else {
				this.$refs.audio.pause()
			}
			this.list[index].playing = !this.list[index].playing
		},
		setSongProgress(percent, flag, index) {
			this.currentSongIndex = index;
			//console.log(this.$refs.audio.duration, "duration")
			const audio = this.$refs.audio;
			if (audio.currentTime == percent * audio.duration) {
				return;
			}
			console.log(percent)
			audio.currentTime = percent * audio.duration
			this.percent = percent;
			if (!flag) {
				this.setPlaying(flag)
			} else {

				if (!this.list[this.currentSongIndex]['playing']) {
					this.togglePlaying()
				}
			}
		},
		updateTime(e) {
			if (!this.songReady) return;
			let currentTime = e.target.currentTime | 0;
			let totalTime = this.$refs.audio.duration;
			this.currentTime = this.format(currentTime);
			this.percent = currentTime / totalTime;
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
		setPlaying(flag) {
			this.list[this.currentSongIndex]['playing'] = flag
		},
		//设置播放歌曲
		_normalData(list) {
			let res = [];
			list.forEach(item => {
				item.playing = false;
				res.push(item)
			})
			return res;
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
};
export const handlePage = {
	data() {
		return {
			list: [],
			total: 14,
			currentSize: 2,
			loading: false,
			currentPage: 1
		}
	},
	methods: {
		handleSizeChange(page) {},
		_handleCurrentChange(page, url) {
			this.currentPage = page;
			this._getVoiceList(url);

		},
		_getVoiceList(url) {
			this.loading = true;
			GetData(url, {
				page: this.currentPage - 1,
				size: this.currentSize,
			}).then(res => {
				this.loading = false;
				this.list = this._normalize(res.list)
				this.total = res.total;
				console.log(this.list)
			}).catch(err => {
				console.log(err)
			})
		},
	}
};

export const isLogin = {

	methods: {
		hasLogin() {
			let data = window.localStorage.data;
			console.log(data, "localStorage")
			//console.log(JSON.parse(data).timestamp)
			//console.log(JSON.parse(data).timestamp >= new Date().getTime(), new Date(JSON.parse(data).timestamp))
			if (!data) {
				return null;
			} else if (JSON.parse(data).timestamp >= new Date().getTime()) {
				return data;
			} else {
				console.log("过期", JSON.parse(data).timestamp, new Date().getTime())
				window.localStorage.data = '';
				return null;
			}
		},
		isLoginRoute(login) {
			if (!login) this.$router.back();
		}
	}
}