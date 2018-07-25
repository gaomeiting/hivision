<template>
<h3 class="form-title">{{ title }}</h3>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	title: {
		type: String,
		default: '绑定手机号'
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.form-title {
	font-size: $font-size-large;
	color: $color-text-d;
	line-height: 2.5;
	@include dashed-1px($color-text-ll);
}
</style>