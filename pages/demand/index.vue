<template>
<transition name="fade" mode="out-in">
	<div class="page">
		<div class="form-wrap">
			<div class="head">
				<switches :switches="switches"></switches>
			</div>
			<div class="task-list-wrap">
				<task-list></task-list>
			</div>
		</div>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import Switches from '~/components/switches/switches'
import TaskList from '~/components/task-list/task-list'
	export default {
		data() {
			return {
				switches: [
					{ name: '全部'},
					{ name: '年龄性别'},
					{ name: '语言风格'}
				]
			}
		},
		mounted() {
			 
		},
		methods: {
			

		},
		components: {
			Switches,
			TaskList
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	padding: 16px;
}
.task-list-wrap {
	padding-top: 20px;
}

</style>