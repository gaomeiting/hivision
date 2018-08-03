<template>
<scroll class="page" ref="scroll">
<div class="vote-wrap" ref="vote">
	<div v-if="slider.length" class="slider-wrapper" ref="slider">
		<slider>
			<div v-for="(item, index) in slider" :key="index">
				<a href="javascript:;">
					<img :src="item.picUrl" @load="imgLoad">
				</a>
			</div>
		</slider>
	</div>
	<div class="switches-wrap">
		<switches :switches="switches"></switches>
	</div>
	<div class="vote-list">
		<vote-list></vote-list>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Slider from "~/components/slider/slider"
import Scroll from '~/components/scroll/scroll'
import Switches from '~/components/switches/switches'
import VoteList from '~/components/vote-list/vote-list'
import ErrorTip from '~/components/error-tip/error-tip'
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/api'
export default {
	mixins: [wxShare],
	data() {
		return {
			
			error: '',
			slider: [ {
				picUrl: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=16e69d830f4f78f09f0b9cf349300a83/63d0f703918fa0ece5f167da2a9759ee3d6ddb37.jpg'
			},{ picUrl: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=ff6ed7cfa718972bbc3a06cad6cc7b9d/267f9e2f07082838304837cfb499a9014d08f1a0.jpg'
			}],
			switches: [{ name: '最佳人气排行' }, { name: '最佳新人排行' }]
		}
	},
	head() {
		return {
			title: '与声俱来·声咖大赛'
		}
	},
	created() {
		/*this._getCurrentInfo()*/
	},
	beforeMount() {
		this._getShareConfig('', true)
	},
	
	
	methods: {
		imgLoad() {
			if(!this.imgChecked) {
				this.$refs.scroll.refresh()
				this.imgChecked=true;
			}
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
		
	},
	components: {
		Scroll,
		ErrorTip,
		Slider,
		Switches,
		VoteList
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.slider-wrapper {
	position: relative;
	width: 100%;
	overflow: hidden;	
}

.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.switches-wrap {
		padding-top: 16px;
	}
}

</style>