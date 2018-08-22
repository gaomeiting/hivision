<template>
<div class="list-wrap">
	<ul class="vote" v-if="list.length > 0">
		<li class="vote-item" v-for="(item, index) in list " :key="index" @click.stop="goNext(item)">
		  	<div class="head"> <img :src="item.coverImg" alt=""></div>
		  	<div class="text">
		  		<h3>{{item.title}}<strong v-if="item.pnum > 0">{{item.pnum}}人录制</strong></h3>
		  		<p>{{item.content}}</p>
		  	</div>
		  	<div class="icon" @click.stop="goNext(item)">
		  		<p>录制</p>
		  	</div>
		</li>
	</ul>
	<div class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length === 0 && !more"></no-result>
		<p v-if="list.length>0 && !more">我是有底线的</p>
	</div>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "base/no-result/no-result"
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
		},
		goNext(item) {
			this.$emit('goNext', item)
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
			width: 64px;
			height: 94px;
			overflow: hidden;
			background-color: $color-text-d;
			margin-right: 10px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.text {
			flex: 1;
			h3 {
				line-height: 1.5;
				strong {
					color: $color-theme;
					padding-left: 1em;
				}
			}
			p {
				padding-top: 6px;
				line-height: 1.5;
				@include ellipsis(2);
			}
		}
		.icon {
			text-align: center;
			color: $color-theme;
			i {
				font-size: $font-size-large;
			}

			>p:last-child {
				/* padding-top: 10px; */
				border: 1px solid $color-theme;
				padding: 4px 10px;
				border-radius: 12px;
				background: $color-theme;
				color: $color-background;
				margin-left: 4px;
			}
		}
	}

}
</style>