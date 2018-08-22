<template>
<transition name="fade">
<div class="share" v-show="flag" @click.stop="hide">
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	
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
@import "~assets/scss/variable";

.share {
	width: 100%;
	height: 100vh;
	position: fixed;
	z-index: 900;
	left: 0;
	top: 0;
	background-image: url('/static/share-tip.png');
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}
</style>