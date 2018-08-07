<template>
<div class="list-wrap">
	<ul class="vote">
		<li class="vote-item" v-for="(item, index) in 5 " :key="index">
		  	<div class="head">
		  		<p>
		  			<i class="iconfont icon-jiantouyou"></i>
		  		</p>
		  	</div>
		  	<div class="text">
		  		<h3>小兔子吃萝卜</h3>
		  		<p>20人录制</p>
		  	</div>
		  	<div class="icon">
		  		<p>
		  			<i class="iconfont icon-jiantouyou"></i>
		  		</p>
		  		<p>112</p>
		  	</div>
		</li>
	</ul>
	<div class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length === 0"></no-result>
		<p v-if="list.length>0 && !more">我是有底线的</p>
	</div>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "~/components/no-result/no-result"
export default {
	props: {
		currentIndex: {
			type: Number,
			default: 0
		},
		list: {
			type: Array,
			default() {
				return [1]
			}
		},
		more: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		selectItem(index) {
			this.$emit('selectItem', index)
		}
	},
	components: {
		NoResult
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.result-wrap {
	p {
		text-align: center;
		line-height: 2;
	}
}
.vote {
	padding: 0 16px;
	.vote-item {
		display: flex;
		align-items: center;
		padding: 12px 0;
		@include border-type-1px($color-text-ll, dashed)
		&:last-child {
			@include border-type-1px($color-background-d, dashed)
		}
		.head {
			width: 56px;
			height: 56px;
			overflow: hidden;
			border-radius: 50%;
			border: 2px solid $color-theme;
			margin-right: 10px;
			p{
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 28px;
				text-align: center;
				color: $color-theme;
				i {
					line-height: 56px;
				}
			}
			
		}
		.text {
			flex: 1;
			h3 {
				line-height: 1.5;
				strong {
					color: $color-theme;
				}
			}
			p {
				padding-top: 6px;
			}
		}
		.icon {
			text-align: center;
			color: $color-theme;
			i {
				font-size: $font-size-large;
			}

			>p:last-child {
				padding-top: 10px;
			}
		}
	}

}
</style>