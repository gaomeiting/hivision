<template>
<transition name="fade" mode="out-in">
	
	<div class="form-content">
		<p class="item" v-if="voice === null">
			<a v-if="flag"  class="btn btn-all" href="javascript:;" @click.stop.prevent="getUserAndStartRecord"><i class="iconfont icon-maikefeng"></i>开始录音</a>
			<a v-else class="btn btn-all btn-pause active" href="javascript:;" @click.stop.prevent="stopRecord"></a>
			
		</p>
		<p class="item" v-else>
			<!-- <a v-if="flag"  class="btn btn-all" href="javascript:;" @click.stop.prevent="startRecord"><i class="iconfont icon-chexiao"></i>重录</a> -->
			<a v-if="!flag" class="btn btn-all btn-pause active" href="javascript:;" @click.stop.prevent="stopRecord"><i class="iconfont icon-weibiaoti519"></i></a>
		</p>
		<p class="item" v-if="!time">
			<a v-if="voice && flag"  class="btn btn-blue" style="margin-right: 12px;" href="javascript:;" @click.stop.prevent="startRecord"><i class="iconfont icon-chexiao"></i>重录</a>
			<a href="javascript:;" v-if="voice && voice.localId" class="btn btn-blue" @click.stop.prevent="uploadVoice" style="margin-right: 12px;"> <i class="iconfont icon-shangchuan"></i> 提交</a>
			<a href="javascript:;" v-if="voice && voice.localId" class="btn btn-blue" @click.stop.prevent="switchVoice"> <i class="iconfont" :class=" voicePlay ? 'icon-pause' : 'icon-bofang'"></i>试听</a>
		</p>
		<p v-if="time" style="text-align: center;">你还可以录{{time}}s</p>
		<confirm ref="confirm" :text="text" @confirm="confirm"></confirm>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import wx from 'weixin-js-sdk'
import { getData, postData } from 'api/api'
import Confirm from 'base/confirm/confirm'
	export default {
		
		data() {
			return {
				voice: null,
				flag: true,
				timer: null,
				text: '',
				type: 0,
				time: 0,
				voicePlay: true
			}
		},
		
		methods: {
			confirm() {
				if(this.type === 0) {
					this._startRecord()
				}
			},
			switchVoice() {
				console.log(this.voicePlay)
				if(this.voicePlay) {
					this.playVoice();
				}
				else {
					this.pauseVoice();
				}
			},
			voiceRecordEnd() {
				let _this = this;
				wx.onVoiceRecordEnd({
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
		  	
		  	this.text = '您真的要重新录制音频吗'
		  	this.$refs.confirm.show()
		  	this.type = 0;
		    
		  },
		  stopRecord() {
		  	let _this = this;
		  	this.flag = true
		  	if(this.timer) {
		  		clearInterval(this.timer)
		  		this.time = 0;
		  	}

		  	wx.stopRecord({
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
		    wx.playVoice({
		      localId: _this.voice.localId
		    });
		    this.voicePlay = false;
		    
		  },
		  pauseVoice() {
		  	let _this = this
		  	wx.pauseVoice({
				localId: _this.voice.localId
			});
			this.voicePlay = true;
		  },
		  voicePlayEnd() {
		  	console.log('this.voicePlayEnd()')
		  	let _this = this
		  	wx.onVoicePlayEnd({
				success: function (res) {
					this.voicePlay = true;
				 console.log(res.localId)
				}
			});
		  },
		  // 4.8 上传语音
		  uploadVoice () {
		  	let _this = this
		    if (_this.voice.localId == '') {
		      alert('请先使用 startRecord 接口录制一段声音');
		      return;
		    }
		    wx.uploadVoice({
		      localId: _this.voice.localId,
		      success: function (res) {
		        //alert('上传语音成功，serverId 为' + res.serverId);
		        //_this.voice.serverId = res.serverId;
		        _this.$emit('postDataServerId', res.serverId)
		       
		      }
		    });
		  },
		  getUserAndStartRecord() {
		  	this._getCurrentInfo()
		  },
		  _startRecord () {
		  	let _this = this
		  	if(this.timer) clearInterval(this.timer)
		  	wx.startRecord({
			      cancel: function () {
			        alert('用户拒绝授权录音');
			      },
			      success: function(res) {
			      	_this._timer()
			      	_this.flag = false
			      },
			      fail: function(res) {
			      	window.alert(res.errMsg)
			      	if(_this.timer) {
			      		clearInterval(_this.timer);
			      		_this.time = 0;
			      	}
			      }
			    });
		  },
		  _getCurrentInfo() {
				getData('/api/user/current').then(res => {
					this._hasStatus(res)
				}).catch(err => {
					if(err && err.data) {
						this.text = `${err.data.status}${err.data.message}`
					}
					else {
						this.text = '接口调试中'
					}
					this.$refs.confirm.show()
				})
			},
			
			_hasStatus(res) {
				if(res.status == 406) {
					this.error = res.message;
					this.$refs.confirm.show()
				}
				else if(res.status == 302) {
					location = res.error;
				}
				else if(res.status == 401) {
					this.$router.push('/bind')
				}
				else if(res.status == 200) {
					if(!res.data.id) {
						this.text = '您不是选手不能录制音频'
						this.type = 1;
						this.$refs.confirm.show()
					} else {
						this._startRecord();
					}
				}
			},
		  
		  _timer() {
	            this.time = 60;
	            clearInterval(this.timer);
	            this.timer = setInterval(() => {
	                if(this.time<= 0) {
	                    this.time = 0;
	                    if(this.timer) clearInterval(this.timer);
	                    return;
	                }
	                this.time--;
	                //console.log(this.time)
	                //console.log(time, "timer")
	                if(this.time < 1) {
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
			&.btn-pause {
				background-image: url('/st/audio.gif');
				background-size: 112px 32px;
				background-position: center center;
				background-repeat: no-repeat;
			}
		}
	}
}

</style>