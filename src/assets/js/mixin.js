import {
	getData,
	getDataHide
} from 'api/api'
import wx from 'weixin-js-sdk'
//http://mglx.hvkid.com/share
//http://mgt.hvkid.cn:9000/
export const share = {
	data() {
		return {
			isShare: false,
			isWx: false
		}
	},

	beforeMount() {
		this.$nextTick(() => {
			this.isWx = this.versions()
		})
	},

	methods: {
		toggleShare() {
			this.isShare = !this.isShare;
			if (this.isShare) {
				this.$refs.share.show()
			} else {
				this.$refs.share.hide()
			}
		},
		cancle() {
			this.isShare = !this.isShare
		},
		selectShare(index) {
			let id = this.$route.params.id;
			let type, link;
			let nickname = this.$route.query.nickname
			let title = `我是${nickname}，我参加了“嗨未来”与声俱来·声咖大赛，快来支持我吧！`
			switch (index + 1) {
				case 1:
					type = 2;
					link = `http://mglx.hvkid.com/singer/?name=lingxi&id=${id}`
					this.shareWX(link, type, title);
					break;
				case 2:
					type = 1;
					link = `http://mglx.hvkid.com/singer/?name=lingxi&id=${id}`
					this.shareWX(link, type, title);
					break;
			}

		},
		selectSharehome(index, title, desc) {
			let type, link;
			switch (index + 1) {
				case 1:
					type = 2;
					link = 'http://mglx.hvkid.com/?name=lingxi'
					this.shareWX(link, type, title, desc);
					break;
				case 2:
					type = 1;
					link = 'http://mglx.hvkid.com/?name=lingxi'
					this.shareWX(link, type, title, desc);
					break;
			}
		},
		shareWX(link, type, title, desc) {
			lx.shareWXCallback({
				shareType: 'text', //分享类别：text 分享链接；image 分享图片；local 本地图片路径
				title: title || '嗨未来 儿童有声阅读计划 声咖大赛用爱发声 用心陪伴 与一线明星同台演播', //分享标题
				desc: desc || '万元奖金/神秘大礼包等你拿有声俱来声咖大赛 用爱为孩子们发声', //分享描述
				link, //分享连接
				imgUrl: 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg', //分享小图标
				type, //是否分享到朋友圈:1 朋友圈 2 好友
				isShowSheet: 0, //ios读取该字段，1或者空为显示分享app弹框，0不展示弹框

				success: function(data) {
					//alert('分享成功');
				}
			});
		},
		versions() {
			var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			} else {
				return false
			}
		}
	}
};
export const loadBtn = {
	data() {
		return {
			name: ''
		}
	},
	created() {
		let hasQuery = window.location.href.split("?")[1];
		if (hasQuery) {
			let lingxi = window.location.href.split("?")[1].indexOf('name=lingxi') != -1
			this.name = lingxi
		}
	}
};
export const wxShare = {
	methods: {
		hasIos() {
			let u = navigator.userAgent
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		},
		wxHide(response) {
			let _this = this;
			wx.config({
				debug: false,
				appId: response.appId,
				timestamp: response.timestamp,
				nonceStr: response.nonceStr,
				signature: response.signature,
				jsApiList: [
					'checkJsApi',
					'hideMenuItems',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'uploadVoice',
					'onVoicePlayEnd'
				]
			});
			wx.ready(function() {
				wx.hideMenuItems({
					menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:share:facebook"]
				});
			})
			wx.error(function(res) {
				alert(res.errMsg);
			});
		},

		wxS(response, url, title, desc, avatar) {
			wx.config({
				debug: false,
				appId: response.appId,
				timestamp: response.timestamp,
				nonceStr: response.nonceStr,
				signature: response.signature,
				jsApiList: [
					'checkJsApi',
					'hideMenuItems',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'uploadVoice',
					'onVoicePlayEnd'
				]
			});
			wx.ready(function() {
				let shareData = {
					imgUrl: avatar || 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg', //图片地址
					link: url,
					title: title || '嗨未来 儿童有声阅读计划 声咖大赛用爱发声 用心陪伴 与一线明星同台演播',
					desc: desc || '万元奖金/神秘大礼包等你拿有声俱来声咖大赛 用爱为孩子们发声',
					success: function(res) {
						//window.alert(res)
						//alert('已分享');
					},
					fail: function(res) {
						alert('分享失败');
					}
				};
				wx.onMenuShareAppMessage(shareData);
				wx.onMenuShareTimeline(shareData);
				wx.onMenuShareQQ(shareData);
				wx.onMenuShareWeibo(shareData);
				wx.onMenuShareQZone(shareData);
			});
			wx.error(function(res) {
				alert(res.errMsg);
			});
		},
		versions() {
			var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			} else {
				return false
			}
		},
		getUrl() {
			return window.sessionStorage.getItem('location')

		},
		setUrl() {
			let location = window.location.href;
			if (!window.sessionStorage.getItem('location')) {
				window.sessionStorage.setItem('location', location)
			}

		},
		_findIndex(arr, val) {
			return arr.findIndex((item) => {
				return val == item
			})
		},
		_getShareConfig(url, isShow, title = '', desc = '', avatar = 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg') {
			let arrHref = ['http://mglx.hvkid.com/#/me', 'http://mglx.hvkid.com/', 'http://mglx.hvkid.com/#/vote']
			if (this._findIndex(arrHref, window.location.href) != -1) {
				this.setUrl();
			}
			let params = {}
			let urlParams = this.getUrl();
			params = this.hasIos() ? {
				url: urlParams
			} : {}
			getDataHide('/api/wechat/sdkconfig.json', params).then(res => {
				let config = res;
				if (!isShow) {
					this.wxS(config, url, title, desc, avatar)
				} else {
					this.wxHide(config)
				}
			}).catch(err => {
				if (err && err.data) {
					this.error = `${err.data.status}${err.data.error}`
					this.$refs.errorTip.show()
				} else {
					this.error = '接口调试中请等待'
				}
			})
		}
	}
};
export const commonWxConfig = {
	methods: {
		_getCurrentInfoWx(id, nickname, avatar) {
			if (!this.versions()) return;
			if (id && nickname) {
				let url = `http://mgt.hvkid.cn:9000/#/singer/?id=${id}`
				let title = `我是${nickname}，我参加了“嗨未来”与声俱来·声咖大赛，快来支持我吧！`
				this._getShareConfig(url, '', title, '', avatar)
				return;
			}
			getDataHide(`/api/user/current`).then(res => {
				if (res.status == 200) {
					//console.log(res.data.id)
					let id = res.data.id
					if (id === 0) {
						let url = `http://mgt.hvkid.cn:9000/#/`
						let title = `我参加了“嗨未来”与声俱来·声咖大赛，快来支持我吧！`
						let avatar = res.data.avatar;
						this._getShareConfig(url, '', title, '', avatar)
					} else {
						let url = `http://mgt.hvkid.cn:9000/#/singer/?id=${id}`
						let title = `我是${res.data.nickname}，我参加了“嗨未来”与声俱来·声咖大赛，快来支持我吧！`
						let avatar = res.data.avatar;
						this._getShareConfig(url, '', title, '', avatar)
					}


				} else {
					let url = 'http://mgt.hvkid.cn:9000/#/'
					this._getShareConfig(url)
				}
			}).catch(err => {
				if (err && err.data) {
					this.error = `${err.data.status}${err.data.message}`
				} else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		},
	}
};
export const audioHandler = {
	data() {
		return {
			currentSongIndex: -1,
			flag: false,
			currentTime: '',
			totalTime: '',
			songReady: false,
			song: false
		}
	},
	methods: {
		settingCurrentSong(index) {
			if (index === this.currentSongIndex) {
				//歌曲切换
				this.flag = !this.flag;
				this.flag ? this.$refs.audio.play() : this.$refs.audio.pause()
			} else {
				this.song = true;
				this.currentSongIndex = index
				this.$refs.audio.load()
				setTimeout(() => {
					this.song = false
					this.$refs.audio.play();
				}, 1000)
				this.flag = true;

			}
		},
		ready() {
			this.songReady = true;
		},
		updateTime(e) {
			let currentTime = e.target.currentTime | 0;
			let totalTime = this.$refs.audio.duration | 0;
			let diff = totalTime * 1 - currentTime * 1
			this.currentTime = "- " + this.format(diff);
			//console.log(this.percent, e.target.currentTime, totalTime, "updateTime")
		},
		end() {
			//console.log("end")
			this.flag = false;
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