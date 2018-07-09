<template>
<div class="list-wrap">
	<ul>
		
		<li>
			<figure>
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530695406815&di=df1b14bcc63249b1f2a4f03da398fded&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fcefc1e178a82b901e004bbc17f8da9773812ef93.jpg" alt="">
			</figure>
			<div class="content">
				<p>
					<strong>用户名称用户名称用户名称</strong>
					<i class="iconfont icon-nan"></i>
					<i class="iconfont icon-nan"></i>
					<small>3</small>
				</p>
				 <p class="dialog" v-if="!type">
					<i class="iconfont icon-nan"></i>
					<strong>00:30</strong>
					<span class="triangle-left"></span>
				</p>
				<p class="tags" v-if="type">
					<span>新闻播报</span>
					<span>新闻播报</span>
					<span>新闻播报</span>
				</p>
			</div>
		</li>
	</ul>
</div>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	list: {
		type: Array,
		default() {
			return []
		}
	},
	type: {
		type: Number,
		default: 0
	}
},
methods: {
	
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.list-wrap {
	ul {
		li {
			background: $color-background-d;
			padding: 10px;
			margin-bottom: 10px;
			display: flex;
			flex-wrap: wrap;
			@include border-1px($color-text-ll);
			&:last-child {
				margin-bottom: 0;
				@include border-1px($color-background-d);
			}
			figure {
				flex: 0 0 44px;
				width: 44px;
				height: 44px;
				overflow: hidden;
				border-radius: 25px;
				img {
					width: 100%;
					min-height: 100%;
				}
			}
			.content {
				flex: 1;
				p {
					display: flex;
					align-items: flex-start;
					&.tags {
						flex-wrap: wrap;
						margin-top: 10px;
						span {
							background: $color-theme-d;
							color: $color-text-l;
							padding: 0.2em 0.4em;
							border-radius: 4px;
							margin: 0 4px 8px;
						}
					}
					&.dialog {
						width: 140px;
						height: 30px;
						background: $color-theme;
						border-radius: 4px;
						color: $color-background-d;
						margin-left: 0.4em;
						margin-top: 8px;
						position: relative;
						.triangle-left {
							position: absolute;
							top: 50%;
							@include triangle( 12px, 6px, $color-theme, -90deg)
							/* width: 0;
							height: 0;
							border-left: 6px solid transparent;
							border-right: 6px solid transparent;
							border-bottom: 12px solid red;
							transform: translate3d(-80%, 0, 0) rotate(-90deg); */
						}
						strong {
							display: block;
							width: 100%;
							height: 100%;
							line-height: 30px;
							text-align: center;
							padding-right: 0;
						}
						i {
							position: absolute;
							line-height: 30px;
							padding-left: 0.4em;
							padding-right: 0;
						}
					}
					strong {
						padding-right: 0.4em;
					}
					small {
						
					}
					i {
						&:first-of-type {
							padding-right: 0.4em;
						}
					}
				}
			}
			
		}
	}
}

</style>