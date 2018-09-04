<template>
	<scroll class="page" ref="scroll">
		<div class="home" ref="home">
			<div class="contain">
				<div class="main">
					<figure>
						<img  src="./code.jpg" alt="">
					</figure>
					<h2>用爱发声、用心陪伴</h2>
					<p v-if="user.nickname">我是{{user.nickname}}</p>
					<p v-if="user.slogan">{{user.slogan}}</p>
				</div>
				
			</div>
			<div class="down-loaded-wrap" v-show="name">
				<down-loaded></down-loaded>
			</div>
		</div>
		<div class="target-wrap">
			<div class="target" ref="target" v-if="jpg">
				<img :src="jpg">
				<p>长按保存到相册即可分享到朋友圈</p>
			</div>
		</div>
		<error ref="error" :error="error" @hide="hideError"></error>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import DownLoaded from 'components/down-loaded/down-loaded'
import Error from 'components/error-tip/error-tip'
import html2canvas from 'html2canvas'
import { loadBtn } from 'assets/js/mixin'
import { getData } from 'api/api'
	export default {
		mixins: [loadBtn],
		data() {
			return {
				user: {},
				error: '',
				jpg: ''
			}
		},
		created() {
			getData('/api/contestant/current').then(res => {
				this._hasStatus(res)
			}).catch(err => {
				if(err && err.data) {
					this.error = `${err.data.error}`;
				}
				else {
					this.error = '程序调试中请稍等'
				}
				this.$refs.error.show()
			})
		},
		
		methods: {
			hideError() {
				if(this.error) this.error = ''
			},
			convertCanvasToImage() {
				let el = this.$refs.home;
				let _this = this;
				html2canvas(el).then(function(canvas) {
				    _this.jpg = _this.convertCanvasToBase64(canvas);
				});
			},
			convertCanvasToBase64(canvas){
			    
			     return canvas.toDataURL("image/jpg");
			},
			_normalizeData(res) {
				this.user = res.data;
				this.$nextTick(() => {
					this.convertCanvasToImage()
				})
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
			}
		},
		components: {
			Scroll,
			DownLoaded,
			Error
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";

.target-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 899;
	top: 0;
	left: 0;
	background: $color-theme;
	.target {
		width: 75%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
		box-shadow: 0 1px 4px rgba(0,0,0,0.1);
		> img {
			width: 100%;
		}
		> p {
			text-align: center;
			line-height: 1.5;
			color: $color-background-d;
		}
	}
}
.home {
	
	> .contain {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 44px;

		&:first-child {
			background-image: url('./share_bg.jpg');
			background-size: cover;
			background-position: center top;
			background-repeat: no-repeat;
			position: relative;
			color: $color-background-d;
			.main {
				width: 100%;
				position: absolute;
				top: 48%;
				figure {
					width: 120px;
					height: 120px;
					overflow: hidden;
					margin: 0 auto;
					img {
						width: 100%;
						min-height: 100%;
					}
				}
				h2 {
					font-size: $font-size-large-x;
					color: $color-theme;
					text-align: center;
					line-height: 2.5;
				}
				p {
					font-size: $font-size-large;
					color: $color-sub-theme;
					line-height: 1.5;
					text-align: center;
					padding: 0 16px;
				}
			}
		}
	}
}

</style>