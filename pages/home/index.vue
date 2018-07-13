<template>
	<scroll class="page" :data="list">
		<div class="form-wrap">
			<div class="dome-list-wrap">
				<dome-list :list="list"></dome-list>
			</div>
			<div class="list-wrapper">
				<p> <i class="iconfont icon-settings"></i> <span>个人设置</span> </p>
				<p> <i class="iconfont icon-msnui-v"></i> <span>等级认证</span> </p>
				<p> <i class="iconfont icon-hetong"></i> <span>合同签约</span> </p>
				<p> <i class="iconfont icon-kefu"></i> <span>联系客服</span> </p>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">

import Scroll from '~/components/scroll/scroll'
import DomeList from '~/components/dome-list-title/dome-list-title'
import { getData } from '~/api/api'
	export default {
		data() {
			return {
				list: [],
				num: 20,
				type: 1
			}
		},
		
		created() {
			getData('/api/user/profile.json').then(res => {
				this.list.push(res)
			}).catch(err => {
				console.log(err.error)
			})
		},
		mounted() {
			 
		},
		methods: {
			

		},
		components: {
			
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
		i {
			margin-right: 12px;
		}
	}
}
</style>