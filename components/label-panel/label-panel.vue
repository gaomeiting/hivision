<template>
<div class="label-panel">
		<ul>
			<li>
				<strong>语言类别</strong>
				<span class="active">普通话</span>
				<span>外语小语种</span>
				<span>方言/民族语</span>
			</li>
			<li>
				<strong>性别</strong>
				<span>男声</span>
				<span>女声</span>
			</li>
			<li>
				<strong>性别</strong>
				<span>男声</span>
				<span>女声</span>
				<span>女声</span>
				<span>女声</span>
				<span>女声</span>
				<span>女声</span>
				<span>女声</span>
				<span>女声</span>
			</li>
		</ul>
		<p class="select-result">
			<strong>当前条件：</strong>
			<span>普通话<i class="iconfont icon-chahao"></i></span>
			<span>女生<i class="iconfont icon-chahao"></i></span>
			<em> <i class="iconfont icon-lajitong"></i>清空全部</em>

		</p>
</div>
</template>

<script type="text/ecmascript-6">
export default {
	
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
.label-panel {
	padding: 15px 15px 30px;
	border: 1px solid #f8f8f8;
	position: relative;
	> ul {
		li {
			display: flex;
			height: 40px;
			line-height: 40px;
			strong {
				display: block;
				width: 6em;
				text-align: center;
				box-sizing: content-box;
				padding-right: 20px;
			}
			span {
				display: block;
				width: 6em;
				text-align: center;
				box-sizing: content-box;
				padding-right: 20px;
				&.active {
					color: #ffa302;
				}

			}
		}
	}
	.select-result {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30px;
		background: #f3f3f3;
		line-height: 30px;
		padding: 0 15px;
		strong {
			padding-right: 15px;
		}
			span {
				display: inline-block;
				font-size: 12px;
				line-height: 1em;
				padding: 4px 8px;
				border: 1px solid #bdbdbd;
				margin-right: 10px;
				i {
					font-size: 12px;
					opacity: 0.5;
				}
			}
			em {
				.iconfont {
					color: red;
				}
			}
	}
}   
</style>