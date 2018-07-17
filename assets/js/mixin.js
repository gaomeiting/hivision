import {
	getData
} from '~/api/api'

export const share = {
	data() {
		return {
			isShare: false,
			hasShare: true
		}
	},
	mounted() {
		this.hasShare = navigator.userAgent.indexOf('Lingxi') != -1
	},
	methods: {
		toggleShare() {
			this.isShare = !this.isShare;
			if (this.isShare) {
				this.$refs.share.show()
			} else {
				this.$refs.share.hide()
			}
			console.log(this.isShare)
		},
		cancle() {
			this.isShare = !this.isShare
		},
		selectShare(index) {
			let type, link;
			switch (index + 1) {
				case 1:
					type = 2;
					link = 'http://mglx.hvkid.com/share'
					//window.alert(lx)
					this.shareWX(link, type);
					break;
				case 2:
					type = 1;
					link = 'http://mglx.hvkid.com/share'
					this.shareWX(link, type);
					break;
			}
		},
		selectSharehome(index) {
			let type, link;
			switch (index + 1) {
				case 1:
					type = 2;
					link = 'http://mglx.hvkid.com'
					this.shareWX(link, type);
					break;
				case 2:
					type = 1;
					link = 'http://mglx.hvkid.com'
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
		}
	}
}