<template>
<div class="list-wrap">
	<ul class="vote" v-if="list.length > 0">
		<li class="vote-item" v-for="(item, index) in list " :key="index" @click.stop="goByName(item)">
		  	<div class="head" :style="'background-image: url('+item.avatar+');'">
		  		
		  	</div>
		  	<div class="text">
		  		<h3>{{item.nickname}} <strong v-if="item.popularNum">{{item.popularNum}} <small>票</small></strong></h3>
		  		<p>{{item.slogan}}</p>
		  	</div>
		  	<div class="icon">
		  		<p>
		  			<i class="iconfont icon-jiantouyou"></i>
		  		</p>
		  	</div>
		</li>
	</ul>
	<div class="result-wrap" v-if="load">
		<loading></loading>
	</div>
	<div v-else class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length === 0"></no-result>
		<p v-if="list.length>10 && !more">我是有底线的</p>
	</div>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "components/no-result/no-result"
import Loading from 'components/loading/loading'
export default {
	props: {
		currentIndex: {
			type: Number,
			default: 0
		},
		list: {
			type: Array,
			default() {
				return []
			}
		},
		more: {
			type: Boolean,
			default: true
		},
		load: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		
		goByName(item) {
			this.$emit('goByName', item)
		},
		
	},
	components: {
		NoResult,
		Loading
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.result-wrap {
	padding-top: 8px;
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
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
			background-color: $color-text-d;
			margin-right: 10px;
			p{
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 28px;
				background: rgba(0,0,0,0.5);
				text-align: center;
				color: $color-theme;
				&.active {
					background-image: url('/loading.gif');
					background-size: 28px 28px;
					 background-repeat: no-repeat;
					  background-position: center center;
				}
				i {
					line-height: 56px;
					font-size: 28px;
				}
			}
			
		}
		.text {
			flex: 1;
			h3 {
				line-height: 1.5;
				strong {
					color: $color-background-d;
					background: $color-theme;
					background: linear-gradient(left, $color-theme-d, $color-theme);
					padding: 1px 12px;
					border-radius: 20px;
				}
			}
			p {
				padding-top: 6px;
			}
		}
		.icon {
			text-align: center;
			&.active {
				color: $color-theme;
			}
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