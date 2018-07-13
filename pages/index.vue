<template>
	<scroll class="page" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
		<div class="form-wrap">
			<div class="head">
				<switches :switches="switches"></switches>
			</div>
			<div class="task-list-wrap">
				<task-list :list="list" :loading="loading" :hasMore="hasMore"></task-list>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import Switches from '~/components/switches/switches'
import TaskList from '~/components/task-list/task-list'
import { getData } from '~/api/init'
	export default {
		data() {
			return {
				switches: [
					{ name: '全部'},
					{ name: '年龄性别'},
					{ name: '语言风格'}
				],
				loading: false,
				page: 0,
				size: 10,
				list: [],
				pullUp: true,
				hasMore: false,
				beforeScroll: true
			}
		},
		created() {
			this.probeType = 3
			this.listenScroll=true
			this._getData();
		},
		methods: {
			hasMoreData() {
				if(!this.hasMore) {
					return;
				}

				this.page = this.page + 1;
				this._getData()
			},
			_getData() {
				this.loading = true;
				getData('/api/demand/list.json', {page: this.page, size: this.size}).then(res => {
					//this.loading = false;
					if(this.page+1 > res.pages) {
						this.hasMore = false;
					}
					else {
						this.list = [...this.list, ...res.data];
						this.hasMore = true;
					}
					
				}).catch(err => {
					console.log(err)
				})
			}

		},
		components: {
			Switches,
			TaskList,
			Scroll
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