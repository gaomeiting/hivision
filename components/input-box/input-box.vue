<template>
<div class="search-box">
	<input ref="query" class="box" v-model="query" :placeholder="placeholder"/>
	<i v-show="query" @click.stop.prevent="clear" class="iconfont icon-chahao"></i>	
</div>
</template>

<script type="text/ecmascript-6">
import { debounce } from "~/assets/js/until";
export default {
	props: {
		placeholder: {
			type: String,
			default: '搜索声咖'
		}
	},
	data() {
		return {
			query: ''
		}
	},
	created() {
		this.$watch('query', debounce((newVal) =>{
			this.$emit('queryChange', newVal)
		},400))
	},
	methods: {
		clear() {
			this.query=''
		},
		setQuery(query) {
			this.query=query
		},
		blur() {
			this.$refs.query.blur()
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
.search-box {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	.icon-search {
		font-size: 16px;
		color: $color-text-d;
	}
	.box {
		flex: 1;
		color: $color-text;
		font-size: $font-size-medium;
		&::placeholder {
			color: $color-text-d;
		}
	}
	.icon-dismiss {
		font-size: 16px;
		color: $color-text-d;
	}
}   
</style>