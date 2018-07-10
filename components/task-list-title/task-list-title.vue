<template>
<transition name="drop">
<div class="list-wrap">
	<ul>
		<li v-for="(item, index) in list" :key="index">
			<div class="title">
				<figure>
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530695406815&di=df1b14bcc63249b1f2a4f03da398fded&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fcefc1e178a82b901e004bbc17f8da9773812ef93.jpg" alt="">
				</figure>
				<p>{{item.client.clientName}}</p>
				<p>{{item.createOn}}</p>
				<p :class="{'active' : item.status == '进行中'}">{{item.status}}</p>
				
			</div>
			<p class="content">{{item.content}}</p>
			<div class="foot">
				<p>
					<span>{{item.requirements.gender}}</span>&nbsp;
					<span>{{item.requirements.speed}}</span>&nbsp;
					<span>{{item.requirements.styles}}</span>
				</p>
				<p v-if="item.stat.responseCnt">{{item.stat.responseCnt}}人已参与</p>
			</div>
		</li>
		
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
			return []
		}
	}
},
methods: {
	
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
.list-wrap {
	ul {
		li {
			border-bottom: 1px solid $color-text-ll;
			background: $color-background-d;
			padding: 10px;
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
			.title {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				figure {
					width: 22px;
					height: 22px;
					overflow: hidden;
					border-radius: 25px;
					img {
						width: 100%;
						min-height: 100%;
					}
				}
				p {
					padding-left: 0.4em;
					white-space: nowrap;
					&:nth-child(3) {
						flex: 1;
						text-align: right;
					}
					&.active {
						color: $color-theme;
					}
				}
			}
			.content {
				line-height: 1.5;
				color: $color-text-d;
				padding: 8px 0 16px;

			}
			.foot {
				display: flex;
				align-items: center;
				p {
					span {
						border: 1px solid $color-text-ll;
						border-radius: 4px;
						padding: 0 0.5em;
						font-size: $font-size-small;
					}
					&:last-child {
						flex: 1;
						text-align: right;
					}
				}
			}
		}
	}
}

</style>