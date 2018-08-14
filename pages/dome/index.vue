<template>
<scroll class="page" ref="scroll" :data="list">
<div class="vote-wrap" ref="vote">
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
import Scroll from '~/components/scroll/scroll'
import BookList from '~/components/books-me/books-me'
import ErrorTip from '~/components/error-tip/error-tip'
import Confirm from '~/components/confirm/confirm'
import { wxShare } from '~/assets/js/mixin'
import { getData, deleteData } from '~/api/api'

export default {
	mixins: [wxShare],
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
	head() {
		return {
			title: '与声俱来·声咖大赛'
		}
	},
	created() {
		this.$nextTick(() => {
			let list = this.$route.query.list
			//console.log(list.length)
			if(list && list != 'undefined') {
				this.list = JSON.parse(list)
			}
		})
	},
	beforeMount() {
		this._getShareConfig('', true)
		
	},
	methods: {
		confirm() {
			if(this.type === 0) {
				this._deleteOne()
			}
			else if(this.type === 1) {
				this.$router.push(`/record/?id=${this.id}`)
			}
		},
		record(item) {
			this.id = item.id;

			this.text = '重新录制会覆盖之前的作品内容,确定要重新录制内容吗？'
			this.type = 1;
			this.$refs.confirm.show()
		},
		deleteOne(item, index) {
			this.id = item.id;
			this.currentIndex = index;
			this.text = '确定删除该作品吗?'
			this.type = 0;
			this.$refs.confirm.show()
		},
		goSelectBook() {
			this.$router.push('/selectbook')
		},
		_deleteOne() {
			///api/contestant/current/entrywork/{id}?workId=2
			deleteData(`api/contestant/current/entrywork/${this.id}?workId=${this.id}`).then(res => {
				this.list.splice(this.currentIndex, 1)
			}).catch(err => {
				this.error = `${err.data.status}${err.data.error}${err.data.message}`
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