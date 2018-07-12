<template>
<transition name="fade" mode="out-in">
	<scroll class="page" :data="data">
		<div class="form-wrap">
			<div class="task-list-wrap">
				<task-title :list="list"></task-title>
			</div>
			<part v-if="list[0] && list[0].status=='进行中'" title="试音内容" paragraph="如需发送更清晰的音频样音，请发邮箱到XXXXX，发送时请注明你的姓名、手机号。"></part>
			<submit-btns v-if="list[0] && list[0].status=='进行中'" :num="num"></submit-btns>
			<dome-list :list="audioList"></dome-list>
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
				list: [],
				num: 20,
				id: 0,
				audioList: [],
				data: []
			}
		},
		created() {
			this.id = this.$route.params.id;
			if(!this.$route.params.id) {
				return;
			}
			this._getTaskDetail(this.id);
		},
		methods: {
			_getTaskDetail(id) {
				let urlDemand = `/api/demand/${id}.json`;
				let urlAudio = `/api/audio/${id}/list.json`;
				let demandList = getData(urlDemand).then(res => {
					this.list.push(res)
					this.num = res.stat.responseCnt;
					return this.list;
				}).catch(err => {
					console.log(err)
				})
				let audioList = getData(urlAudio, {status: 'show'}).then(res => {
					this.audioList = res;
					return this.audioList;
				}).catch(err => {
					console.log(err)
				})
				Promise.all([demandList, audioList]).then((res) => {
					this.data = res;
				}).catch(err => {
					console.log(err)
				})
			}

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
	padding: 0 16px;
	background: $color-background-d;
}
.task-list-wrap {
	padding-top: 20px;
}

</style>