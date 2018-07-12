<template>
<div class="list-wrap">
	<ul>
		
		<li v-for="(item, index) in list" :key="index">
			<figure>
				<img :src="item.avatar" alt="">
			</figure>
			<div class="content">
				<p>
					<strong>{{item.nickname}}</strong>
					<i v-if="item.idCard.substr(-2,1) % 2" class="iconfont icon-nan"></i>
					<i v-else class="iconfont icon-nv"></i> 
					<i v-if="item.grade" class="iconfont icon-msnui-v"></i>
					<small v-if="item.grade">{{item.grade}}</small>
				</p>
				<p class="tags">
					<span v-for="(tag, tagIndex) in item.preference.styles.split(',')" :key="tagIndex">{{tag}}</span>
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
	}
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
			.icon-msnui-v {
				color: $color-theme;
			}
			figure {
				flex: 0 0 44px;
				width: 44px;
				height: 44px;
				overflow: hidden;
				border-radius: 25px;
				margin-right: 12px;
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
							&:first-child {
								margin-left: 0;
							}
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
							color: $color-dialog-background;
							&.active {
								color: $color-background-d;
							}
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