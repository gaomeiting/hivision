<template>
<transition name="drop">
<div class="top-tip" v-if="flag">
	<i @click.stop.prevent="hide()" class="iconfont icon-shanchu"></i>
	
	<a href="http://lingxi.10086.cn/wap/?n=16011216">
		<img src="~assets/images/lingxi.png">
	</a>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
name: 'downLoaded',
props: {
	img: {
		type: String,
		default: 'lingxi'
	},
	
},
data() {
	return {
		flag: true
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
@import "~assets/scss/variable";

.top-tip {
	/* position: fixed;
	top: 0;
	left: 0;
	right: 0; */
	z-index: 500;
	background: rgba(0,0,0,0.8);
	display: flex;
	align-items: center;
	padding: 10px 16px;
	&.drop-enter-active, &.drop-leave-active {
	  transition: all 0.3s;
	}
	&.drop-enter, &.drop-leave-to {
	  transform: translate3d(0, -100%, 0);
	}
	i {
		padding-right: 8px;
		color: $color-text-d;
	}
	a {
		flex: 1;
		display: block;
		img {
			width: 100%;
		}
	}
}
</style>