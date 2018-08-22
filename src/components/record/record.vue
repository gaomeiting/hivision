<template>
<!-- <scroll class="page" ref="scroll"> -->
<div class="vote-wrap" ref="vote">
	<h2 class="title">请录制下面的演播内容</h2>
	<p class="text">
		注意：<br>
		1. 录制过程中请勿插播广告；<br>
		2. 请勿播违反国家法律法规的相关内容；<br>
		3. 录制时长：60S左右。
	</p>  
	<div class="text" v-html="story.content">
		<!-- {{story.content}} -->
	</div>
	<div class="btn-wrap">
		<submit-btns :id="id" @postDataServerId="postDataServerId"></submit-btns>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
	<alert ref="alert" :text="text" @confirm="alert"></alert>
</div>

<!-- </scroll> -->
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import ErrorTip from 'base/error-tip/error-tip'
import Alert from 'base/alert/alert'
import SubmitBtns  from 'base/submit-dome-btns/submit-dome-btns'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData, postData } from 'api/api'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			error: '',
			switches: [{ name: '最佳人气作品' }, { name: '最新参赛作品' }],
			isShow: false,
			text: '',
			story: {},
			id: ''
		}
	},
	created() {
		this._getCurrentInfoWx()
		let id = this.$route.query.id;
		this.id = id;
		this._getSingerDetails(id);
	},
	methods: {
		alert() {
			this.$router.push('/dome')
		},
		postDataServerId(audioId) {
			let id = this.$route.query.id;
			
			getData(`/api/audition_story/${id}/player`, {
		  		mediaId: audioId
		  	}).then(res => {
		  		this.text = "上传成功"
				this.$refs.alert.show()
		  	}).catch(err => {
		  		if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
		  	})
		},
		_getSingerDetails(id) {
			getData(`/api/audition_story/${id}`).then(res=> {
				if(res.status===200) {
					this.story = res.data
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		}
	},
	components: {
		Scroll,
		ErrorTip,
		SubmitBtns,
		Alert
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.btn-wrap {
	width: 100%;
	padding: 16px 16px 0;
	background: $color-background-d;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 800;
	box-shadow: 0 2px 6px rgba(0,0,0,0.1);
	i {
		padding-right: 8px;
	}
}
.vote-wrap {
	min-height: 100vh;
	padding-bottom: 44px;
	/* background: $color-background-d; */
	.title {
		line-height: 1.5;
		padding: 12px 16px;
		background: $color-background;
	}
	.text {
		line-height: 2;
		padding: 16px;
	}
	
}

</style>