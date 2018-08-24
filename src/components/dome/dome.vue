<template>
<scroll class="page" ref="scroll" :data="list">
<div class="vote-wrap" ref="vote">
	<div class="title">我的故事</div>
	<div class="vote-list">
		<book-list :list="list" @deleteOne="deleteOne" @record="record"></book-list>
		<div class="result-wrapper" @click.stop="goSelectBook">
			<p ref="javascript:;" v-if="!more && list.length>0">继续录制其他故事></p>
			<p class="btn" v-else-if="list.length == 0">选择书目录制</p>
		</div>
	</div>
</div>
<error-tip ref="errorTip" :error="error"></error-tip>
<confirm ref="confirm" :text="text" @confirm="confirm"></confirm>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import BookList from 'base/books-me/books-me'
import ErrorTip from 'base/error-tip/error-tip'
import Confirm from 'base/confirm/confirm'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData, deleteData } from 'api/api'

export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			error: '',
			more: false,
			list: [],
			text: '',
			type: 0,
			id : 0,
			currentIndex: 0
		}
	},
	
	created() {
		this._getCurrentInfo()
	},
	methods: {
		confirm() {
			if(this.type === 0) {
				this._deleteOne()
			}
			else if(this.type === 1) {
				this._deleteOne()
				this.$router.push(`/record/?id=${this.id}`)
			}
		},
		record(item) {
			this.id = item.story.id;
			this.text = '重新录制会覆盖之前的作品内容,确定要重新录制内容吗？'
			this.type = 1;
			this.$refs.confirm.show()
		},
		deleteOne(item, index) {
			//console.log(item.story.id, "story.id")
			this.id = item.story.id;
			this.currentIndex = index;
			this.text = '确定删除该作品吗?'
			this.type = 0;
			this.$refs.confirm.show()
		},
		goSelectBook() {
			this.$router.push('/selectbook')
		},
		_getCurrentInfo() {
			getData('/api/contestant/currentDetail').then(res => {
				this._hasStatus(res)
			}).catch(err => {
				if(err && err.data) {
					this.error = `${err.data.message}`
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
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
				this.list = res.data
			}
		},
		_deleteOne() {
			deleteData(`/api/contestant/current/entrywork/${this.id}`).then(res => {
				this.list.splice(this.currentIndex, 1)
			}).catch(err => {
				this.error = `${err.data.message}`
				this.$refs.errorTip.show()
			})
		}
	},
	components: {
		Scroll,
		ErrorTip,
		BookList,
		Confirm
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	background: $color-background-d;
}
.vote-wrap {
	min-height: 100vh;
	
}
.title {
	line-height: 2.5;
	text-align: center;
	font-size: $font-size-large;
	color: $color-text-d;
	border-bottom: 8px solid $color-background;
}
.result-wrapper {
	padding: 16px;
	p {
		text-align: center;
		line-height: 44px;
		color: $color-theme;
	}
	.btn {
		width: 100%;
		height: 44px;
		
		background: $color-theme;
		border-radius: 6px;
		color: $color-background-d;
		font-size: $font-size-medium-x;
	}
}
</style>