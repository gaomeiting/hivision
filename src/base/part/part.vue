<template>
<div class="tip-text-wrap">
	<h3>{{title}}</h3>
	<p>{{paragraph}}</p>
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: '绑定手机号'
	},
	paragraph: {
		type: String,
		default: ''
	} 
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.tip-text-wrap {
	h3 {
		line-height: 2.5;
		font-size: $font-size-large;
		color: $color-text-d;
	}
	p {
		line-height: 1.6;
	}
}
</style>