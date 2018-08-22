<template>
<transition name="confirm-fade">
<div class="confirm" v-show="flag">
	<ul class="confirm-content">
		<li v-for="(item, index) in list" :key="index" @click.stop.prevent="selectMenu(index)">{{item}}</li>
	</ul>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default() {
			return ['大赛介绍', '奖项设置', '参赛指引', '参赛条件', '注意事项', '联系我们'];
		}
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
	},
	selectMenu(index) {
		console.log(index, 'selectMenu')
		this.$emit('selectMenu', index, this.flag);
		this.hide();
	}
	
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";

.confirm {
	&.confirm-fade-enter-active {
		animation: confirm-fadein 0.3s;
		.confirm-content {
			animation: confirm-zoom 0.3s;
		}
	}
	&.confirm-fade-leave-active {
		animation: confirm-fadeout 0.4s;
	}
	ul {
		li {
			height: 44px;
			padding: 0 12px;
			background: $color-background;
			line-height: 44px;
			@include border-1px($color-text);
			&:last-child {
				@include border-1px($color-background);
			}
		}
	}
	
}
@keyframes confirm-fadein {
	0% {
	  opacity: 0;
	}
	100% {
	  opacity: 1;
	}
}

@keyframes confirm-zoom {
	0% {
	  transform: scale(0);
	}
	50% {
	  transform: scale(1.1);
	}
	100% {
	  transform: scale(1);
	}
}
@keyframes confirm-zoomout {
	0% {
	  transform: scale(1);
	}
	100% {
	  transform: scale(0);
	}
}
@keyframes confirm-fadeout {
	0% {
	  opacity: 1;
	}
	100% {
	  opacity: 0;
	}
}
</style>