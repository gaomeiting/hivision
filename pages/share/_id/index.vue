<template>
	<scroll class="page" ref="scroll">
		<div class="home">
			<div class="contain">
				<div class="main">
					<figure>
						<img src="~/assets/images/code.jpg" alt="">
					</figure>
					<h2>用爱发声、用心陪伴</h2>
					<p v-if="user.realname">我是{{user.realname}}</p>
					<p v-if="user.slogan">{{user.slogan}}</p>
				</div>
				
			</div>
			<div class="down-loaded-wrap" v-show="name">
				<down-loaded></down-loaded>
			</div>
			<error v-if="error" :error="error"></error>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import DownLoaded from '~/components/down-loaded/down-loaded'
import Error from '~/components/error/error'
import { loadBtn } from '~/assets/js/mixin'
import { getData } from '~/api/api'
	export default {
		mixins: [loadBtn],
		data() {
			return {
				user: {},
				error: ''
			}
		},
		created() {
			/*if(window.localStorage.user) this.user = JSON.parse(window.localStorage.user)*/
			let id = this.$route.params.id;
			getData(`/api/contestant/${id}`).then(res => {
				this.user = res;
			}).catch(err => {
				if(err && err.data) {
					this.error = `${err.data.status}${err.data.error}`;
				}
				else {
					this.error = '程序调试中请稍等'
				}
			})
		},
		methods: {
			
		},
		components: {
			Scroll,
			DownLoaded,
			Error
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
			background-position: center top;
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