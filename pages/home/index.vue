<template>
<transition name="fade" mode="out-in">
	<scroll class="page">
		<div class="form-wrap">
			<div class="dome-list-wrap">
				<dome-list :type="type"></dome-list>
			</div>
			<div class="list-wrapper">
				<p> <i class="iconfont icon-nan"></i> <span>个人设置</span> </p>
				<p> <i class="iconfont icon-nan"></i> <span>等级认证</span> </p>
				<p> <i class="iconfont icon-nan"></i> <span>合同签约</span> </p>
				<p> <i class="iconfont icon-nan"></i> <span>联系客服</span> </p>
			</div>
		</div>
	</scroll>
</transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import TaskTitle from '~/components/task-list-title/task-list-title'
import Part from '~/components/part/part'
import SubmitBtns from '~/components/submit-dome-btns/submit-dome-btns'
import DomeList from '~/components/dome-list/dome-list'
import { getData } from '~/api/api'
	export default {
		data() {
			return {
				switches: [
					{ name: '全部'},
					{ name: '年龄性别'},
					{ name: '语言风格'}
				],
				num: 20,
				type: 1
			}
		},
		
		created() {
			getData('/api/user/profile.json').then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err.error)
			})
		},
		mounted() {
		},
		methods: {
			

		},
		components: {
			TaskTitle,
			Part,
			SubmitBtns,
			DomeList,
			Scroll
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	padding: 16px 0;
	background: $color-background-d;
}
.task-list-wrap {
	padding-top: 20px;
}
.dome-list-wrap {
	@include border-1px($color-text-ll);
}
.list-wrapper {
	line-height: 50px;
	padding: 0 16px;
	p {
		@include border-1px($color-text-ll);
	}
}
</style>