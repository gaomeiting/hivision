<template>
<transition name="fade" mode="out-in">
	<scroll class="page">
		<div class="form-wrap">
			<div class="task-list-wrap">
				<task-title></task-title>
			</div>
			<part title="试音内容" paragraph="如需发送更清晰的音频样音，请发邮箱到XXXXX，发送时请注明你的姓名、手机号。"></part>
			<submit-btns :num="num"></submit-btns>
			<dome-list></dome-list>
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
	export default {
		data() {
			return {
				switches: [
					{ name: '全部'},
					{ name: '年龄性别'},
					{ name: '语言风格'}
				],
				num: 20
			}
		},
		created() {
			if(!this.$route.params.id) {
				return;
			}
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
	padding: 16px;
	background: $color-background-d;
}
.task-list-wrap {
	padding-top: 20px;
}

</style>