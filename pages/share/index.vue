<template>
	<scroll class="page" ref="scroll">
		<div class="home">
			<div class="contain">
				<div class="main">
					<figure>
						<img src="~/assets/images/code.jpg" alt="">
					</figure>
					<h2>用爱发声、用心陪伴</h2>
					<p v-if="user.name">我是{{user.name}}</p>
					<p v-if="user.declaration">{{user.declaration}}</p>
				</div>
				
			</div>
			
		</div>
		
		
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
	export default {
		data() {
			return {
				user: {}
			}
		},
		mounted() {
			//console.log(window, "12345")
			this.user = JSON.parse(window.localStorage.user)
		},
		methods: {
			
		},
		components: {
			Scroll
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";


.home {
	
	> .contain {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 44px;
		&:first-child {
			background-image: url('~assets/images/share_bg.jpg');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			position: relative;
			color: $color-background-d;
			.main {
				width: 100%;
				position: absolute;
				bottom: 110px;
				figure {
					width: 120px;
					height: 120px;
					overflow: hidden;
					margin: 0 auto;
					img {
						width: 100%;
						min-height: 100%;
					}
				}
				h2 {
					font-size: $font-size-large-x;
					color: $color-theme;
					text-align: center;
					line-height: 2.5;
				}
				p {
					font-size: $font-size-large;
					color: $color-sub-theme;
					line-height: 1.5;
					text-align: center;
					padding: 0 16px;
				}
			}
		}
	}
}

</style>