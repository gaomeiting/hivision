import {
	getData
} from '~/api/api'

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
			console.log(this.isWx, "isWx")
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
			switch (index + 1) {
				case 1:
					type = 2;
					link = `http://mglx.hvkid.com/share/?name=lingxi&id=${id}`
					this.shareWX(link, type);
					break;
				case 2:
					type = 1;
					link = `http://mglx.hvkid.com/share/?name=lingxi&id=${id}`
					this.shareWX(link, type);
					break;
			}
			//http://mglx.hvkid.com/share
			//http://mgt.hvkid.cn:9000/
		},
		selectSharehome(index) {
			let type, link;
			switch (index + 1) {
				case 1:
					type = 2;
					link = 'http://mglx.hvkid.com/?name=lingxi'
					this.shareWX(link, type);
					break;
				case 2:
					type = 1;
					link = 'http://mglx.hvkid.com/?name=lingxi'
					this.shareWX(link, type);
					break;
			}
		},
		shareWX(link, type) {
			lx.shareWXCallback({
				shareType: 'text', //分享类别：text 分享链接；image 分享图片；local 本地图片路径
				title: '嗨未来 儿童有声阅读计划 声咖大赛用爱发声 用心陪伴 与一线明星同台演播', //分享标题
				desc: '万元奖金/神秘大礼包等你拿有声俱来声咖大赛 用爱为孩子们发声', //分享描述
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

		if (this.$route.query.name) {
			this.$nextTick(() => {
				this.name = this.$route.query.name
			})
		}
	}
};
export const wxShare = {
	methods: {
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
					'uploadVoice'
				]
			});
			wx.ready(function() {
				wx.hideMenuItems({
					menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:share:facebook"]
				});
				/*wx.onVoiceRecordEnd({
					// 录音时间超过一分钟没有停止的时候会执行 complete 回调
					complete: function(res) {
						_this.localId = res.localId;
						console.log("12345")
					}
				});*/
			})
			wx.error(function(res) {
				alert(res.errMsg);
			});
		},
		wxS(response, url) {
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
					'onMenuShareQZone'
				]
			});
			wx.ready(function() {
				let shareData = {
					imgUrl: 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg', //图片地址
					link: url,
					title: '嗨未来 儿童有声阅读计划 声咖大赛用爱发声 用心陪伴 与一线明星同台演播',
					desc: '万元奖金/神秘大礼包等你拿有声俱来声咖大赛 用爱为孩子们发声',
					success: function(res) {
						alert('已分享');
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
		_getShareConfig(url, isShow) {
			if (!this.versions()) return;
			getData('/api/wechat/sdkconfig.json').then(res => {
				let config = res;
				if (!isShow) {
					this.wxS(config, url)
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
}