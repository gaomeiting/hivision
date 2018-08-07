<template>
<transition name="fade" mode="out-in">
	<!-- <div>
		<p  class="btn btn-all" href="javascript:;" @click.stop.prevent="startRecord"><i class="iconfont icon-huatong"></i>点击开始录音</p>
	</div> -->
	<div class="form-content">
		<p class="item" v-if="voice === null">
			<a v-if="flag"  class="btn btn-all" href="javascript:;" @click.stop.prevent="getUserAndStartRecord"><i class="iconfont icon-huatong"></i>点击开始录音</a>
			<a v-else class="btn btn-all active" href="javascript:;" @click.stop.prevent="stopRecord"><i class="iconfont icon-nan"></i>停止录音</a>
			
		</p>
		<p class="item" v-else>
			<a v-if="flag"  class="btn btn-all" href="javascript:;" @click.stop.prevent="startRecord"><i class="iconfont icon-shuaxin"></i>重新录音</a>
			<a v-else class="btn btn-all active" href="javascript:;" @click.stop.prevent="stopRecord"><i class="iconfont icon-weibiaoti519"></i>停止录音</a>
		
			
		</p>
		<p class="item">
			<a href="javascript:;" v-if="voice && voice.localId" class="btn btn-blue" @click.stop.prevent="uploadVoice" style="margin-right: 12px;"> <i class="iconfont icon-tijiao"></i> 提交</a>
			<a href="javascript:;" v-if="voice && voice.localId" class="btn btn-blue" @click.stop.prevent="playVoice"> <i class="iconfont icon-bofang"></i> 试听</a>
		</p>
		<confirm ref="confirm" :text="text" @confirm="confirm"></confirm>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">

import { getData, postData } from '~/api/api'
import Confirm from '~/components/confirm/confirm'
	export default {
		props: {
			
		},
		data() {
			return {
				voice: null,
				flag: true,
				timer: null,
				text: ''
			}
		},
		methods: {
			confirm() {
				this.$router.push('/bind')
			},
			voiceRecordEnd() {
				console.log("VoiceRecordEnd")
				let _this = this;
				window.wx.onVoiceRecordEnd({
				// 录音时间超过一分钟没有停止的时候会执行 complete 回调
				complete: function (res) {
					console.log("自动停止")
					_this.localId = res.localId;
					this.flag = true;
				}
				})
			},
			// 4.2 开始录音
		  startRecord () {
		  	let _this = this
		  	if(this.timer) clearInterval(this.timer)

		  	this._timer()
		    window.wx.startRecord({
		      cancel: function () {
		        alert('用户拒绝授权录音');
		      },
		      success: function(res) {
		      	_this.flag = false
		      }
		    });
		  },
		  stopRecord() {
		  	let _this = this;
		  	this.flag = true
		  	window.wx.stopRecord({
				success: function (res) {
					_this.voice = res;
				}
			})
		  },
		  playVoice () {
		  	let _this = this
		  	if (_this.voice.localId == '') {
		      alert('请先使用 startRecord 接口录制一段声音');
		      return;
		    }
		    window.wx.playVoice({
		      localId: _this.voice.localId
		    });
		  },
		  // 4.8 上传语音
		  uploadVoice () {
		  	let _this = this
		    if (_this.voice.localId == '') {
		      alert('请先使用 startRecord 接口录制一段声音');
		      return;
		    }
		    window.wx.uploadVoice({
		      localId: _this.voice.localId,
		      success: function (res) {
		        //alert('上传语音成功，serverId 为' + res.serverId);
		        //_this.voice.serverId = res.serverId;
		        _this._postDataServerId(res.serverId)
		      }
		    });
		  },
		  getUserAndStartRecord() {
		  	this.startRecord()
		  	/*getData('/api/contestant/current').then(res => {
		  		this.startRecord()
			}).catch(err => {
				this.text = `${err.status}${err.error}${err.message}`
				this.$refs.confirm.show()
			})*/
		  },
		  _postDataServerId(audioId) {
		  	postData('/api/bind/audio.json', {
		  		audioId
		  	}).then(res => {
		  		console.log("成功")
		  	}).catch(err => {
		  		console.log(err)
		  	})
		  },
		  _timer() {
	            let time = 60;
	            clearInterval(this.timer);
	            this.timer = setInterval(() => {
	                if(time<= 0) {
	                    time = 0;
	                    if(this.timer) clearInterval(this.timer);
	                    return;
	                }
	                time--;
	                //console.log(time, "timer")
	                if(time < 1) {
	                    clearInterval(this.timer)
	                    //this.tip="获取验证码"
	                    this.stopRecord()
	                    this.flag=true;
	                }
	            },1000)
	        }
		},
		components: {
			Confirm
		}
		
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.form-content {
	.total {
		color: $color-text-d;
		padding-top: 18px;
	}
	.item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		justify-content: center;
		&:first-of-type {
			input {
				margin-right: 0;
			}
		}
		input {
			flex: 1;
			border: 1px solid $color-text-ll;
			border-radius: 4px;
			margin-right: 10px;
			padding: 11px 0;
		}
		
		.btn {
			color: $color-background-d;
			padding: 0 22px;
			line-height: 44px;
			height: 44px;
			background: $color-theme;
			border-radius: 4px;
			i {
				padding-right: 0.2em;
			}
			&.active {
				background: $color-sub-theme;
			}
			&.btn-blue {
				background: $color-sub-theme;
				&.active {
					background: $color-background-d;
					color: $color-text-d;
					border: 1px solid $color-text-ll;
				}
			}
			&.btn-all {
				display: block;
				width: 100%;
				text-align: center;
			}
		}
	}
}

</style>