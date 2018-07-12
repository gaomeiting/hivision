import {
	getData
} from '~/api/api'
export const wxconfig = {
	data() {
		return {
			config: null
		}
	},
	created() {
		getData('/api/wechat/sdkconfig.json').then(res => {
			this.config = res;
			window.wx.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: [
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice'
				]
			})
		}).catch(err => {
			console.log(err)
		})
	}
}