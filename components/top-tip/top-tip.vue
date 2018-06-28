d<template>
<transition name="drop">
<div class="top-tip" v-if="flag">
	<slot></slot>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	delay: {
		type: Number,
		default: 3000
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
		
	},
	hide() {
		this.flag=false;
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.top-tip {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 500;
	background: #fff;
	box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
	&.drop-enter-active, &.drop-leave-active {
	  transition: all 0.2s line;
	  opacity: 1;
	}
	&.drop-enter, &.drop-leave-to {
	  transform: translate3d(0, -100%, 0);
	  opacity: 0;
	}
	
}
</style>