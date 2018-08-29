<template>
<div class="list-wrap">
	<ul class="vote" v-if="list.length > 0">
		<li class="vote-item" v-for="(item, index) in list " :key="index" v-if="index>0">
		  	
		  	<div class="pk-wrap">
		  		<div @click.stop="goByName(item.redPlayer)">
		  			<figure>
			  			<img :src="item.redPlayer.avatar">
			  		</figure>
			  		<p>{{item.redPlayer.nickname}}</p>
		  		</div>
		  		<div>
		  			<figure>
			  			<img src="./pk_icon.jpg">
			  		</figure>
		  		</div>
		  		<div @click.stop="goByName(item.bluePlayer)">
		  			<figure>
			  			<img :src="item.bluePlayer.avatar">
			  		</figure>
			  		<p>{{item.bluePlayer.nickname}}</p>
		  		</div>
			</div>
		</li>
	</ul>
	<div class="result-wrap" v-if="load">
		<loading></loading>
	</div>
	<div v-else class="result-wrap">
		<no-result title="空空如也~~" v-if="list.length === 0"></no-result>
	</div>
</div>
  
</template>

<script type="text/ecmascript-6">
import NoResult from "base/no-result/no-result"
import Loading from 'base/loading/loading'
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
		}
		
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
	.vote-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px 16px;
		margin-bottom: 16px;
		&:last-child {
			margin-bottom: 0;
		}
		@include border-type-1px($color-text-ll, dashed)
		&:last-child {
			@include border-type-1px($color-background-d, dashed)
		}
		> div {
			&:nth-child(2) {
				margin: 6px 0;
			}
		}
		
		.pk-wrap {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			> div {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				&:nth-child(2) {
					figure {
						width: 56px;
						height: 56px;
						overflow: hidden;
						margin-top: -22px;
						img {
							width: 100%;
							min-height: 100%;
						}
					}
				}
				&:last-child, &:first-child {
					figure {
						width: 56px;
						height: 56px;
						overflow: hidden;
						border-radius: 50%;
						img {
							width: 100%;
							min-height: 100%;
						}
					}
					p {
						padding-top: 8px;
						line-height: 1.5;
					}
				}
			}
		}
	}

}
</style>