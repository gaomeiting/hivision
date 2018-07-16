<template>
<transition name="confirm-fade">
<div class="confirm" v-show="flag" @click.stop="cancle">
	<div class="confirm-wrapper">
		<div class="confirm-content">
			<div class="text">
				<ul>
					<li v-for="(item, index) in list" :key="index" @click="selectShare(index)">
						<p><i class="iconfont" :class="item.icon"></i></p>
						<p>{{item.text}}</p>
					</li>
					
				</ul>
			</div>
			<div class="operate">
				<div class="operate-btn" @click.stop="cancle">{{cancleBtnText}}</div>
			</div>
		</div>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	confirmBtnText: {
		type: String,
		default: '确认'
	},
	cancleBtnText: {
		type: String,
		default: '取消'
	},
	list: {
		type: Array,
		default() {
			return [
				{ icon: 'icon-wxfriends', text: '微信好友'},
				{ icon: 'icon-pengyouquan', text: '微信朋友圈'}
			]
		}
	}
},
data() {
	return {
		flag: false
	}
},
methods: {
	
	selectShare(index) {
		this.$emit('selectShare', index)
	},
	show() {
		this.flag=true;
	},
	hide() {
		this.flag=false;
	},
	cancle() {
		this.$emit('cancle');
		this.hide()
	},
	confirm() {
		this.$emit('confirm');
		this.hide()
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";

.confirm {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background-color: rgba(0,0,0,0.3);
	&.confirm-fade-enter-active {
		animation: confirm-fadein 0.3s;
		.confirm-content {
			animation: confirm-zoom 0.3s;
		}
	}
	&.confirm-fade-leave-active {
		animation: confirm-fadeout 0.4s;
	}
	.confirm-wrapper {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		.confirm-content {
			background: $color-background-d;
			.text {
				padding: 19px 15px;
				line-height: 22px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-text-l;
				ul {
					display: flex;
					li {
						flex: 1;
						i {
							font-size: $font-size-large-xx;
							color: $color-theme-d;
						}
					}
				}
			}
			.operate {
				display: flex;
				align-items: center;
				text-align: center;
				font-size: $font-size-medium-x;
				.operate-btn {
					flex: 1;
					line-height: 22px;
					padding: 10px 0;
					border-top: 1px solid $color-background;
					color: $color-text-d;
					&.left {
						border-right: 1px solid $color-background;
					}
				}
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
	  transform: scale(0) translate3d(0, -100%, 0);
	}
	50% {
	  transform: scale(1.1) translate3d(0, 10%, 0);
	}
	100% {
	  transform: scale(1) translate3d(0, 0, 0);
	}
}
@keyframes confirm-zoomout {
	0% {
	  transform: scale(1) translate3d(0, 0, 0);
	}
	100% {
	  transform: scale(0) translate3d(0, -100%, 0);
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