<template>
<transition name="drop">
<div class="top-tip" v-if="flag">
	<p>{{error}}</p>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	delay: {
		type: Number,
		default: 3000
	},
	error: {
		type: String,
		default: ''
	}
},
data() {
	return {
		flag: false
	}
},
methods: {
	show() {
		this.flag=true;
		clearTimeout(this.timer)
		this.timer=setTimeout(()=>{
			this.flag=false
		}, this.delay)
	},
	hide() {
		this.flag=false;
		this.$emit('hide')
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";

.top-tip {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 500;
	background: $color-theme;
	p {
		text-align: center;
		line-height: 1.5;
		padding: 10px;
		color: $color-background;
	}
	&.drop-enter-active, &.drop-leave-active {
	  transition: all 0.3s;
	}
	&.drop-enter, &.drop-leave-to {
	  transform: translate3d(0, -100%, 0);
	}
}
</style>