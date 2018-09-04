<template>
<scroll class="page" ref="scroll" :data="list">
<div class="vote-wrap" ref="vote">
	<h3 class="title">我的投票记录</h3>
	<ul class="list">
		<li>
			<div>
				<p>{{vote.total}} <small>次</small></p>
				<p>共投票数</p>
			</div>
			<div>
				<p>{{vote.contestant}} <small>人</small></p>
				<p>共投选手</p>
			</div>
		</li>
	</ul>
	<h3 class="title">海选投票记录</h3>
	<ul class="list">
		<li v-for="item in list">
			<div>{{ item.date }}</div>
			<div>
				<p>{{ item.contestant }}</p>
				<p>总投递选手</p>
			</div>
			<div>
				<p>{{ item.total }}</p>
				<p>当天总投票数</p>
			</div>
		</li>
	</ul>
	
</div>
<error-tip ref="errorTip" :error="error"></error-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/scroll/scroll'
import ErrorTip from 'components/error-tip/error-tip'
import { mapGetters } from 'vuex'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData } from 'api/init'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			
			error: '',
			list: [],
			vote: {}
			
		}
	},
	
	created() {
		if(this.token) {
			this._getVoteData()
			this._getListData();
		}
	},
	watch: {
		token() {
			this._getVoteData()
			this._getListData();
		}
	},
	computed: {
		...mapGetters(['token'])
	},
	methods: {
		_getListData() {
			getData('/api/user/current/vote/history').then(res => {
				if(res.status === 200) {
					this.list = res.data;
				}

			}).catch(err => {
				if(err.data) {
					this.error = err.data.message;
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		},
		_getVoteData() {
			console.log('_getVoteData')
			getData('/api/user/current/vote').then(res => {
				if(res.status === 200) {
					this.vote = res.data;
				}

			}).catch(err => {
				if(err.data) {
					this.error = err.data.message;
				}
				else {
					this.error = '接口调试中'
				}
				this.$refs.errorTip.show()
			})
		}
	},
	components: {
		Scroll,
		ErrorTip
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";


.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.title {
		line-height: 2.5;
		font-size: $font-size-medium-x;
		padding: 0 16px;
		color: $color-text-l;
		margin-bottom: 8px;
		@include border-1px($color-background)

	}
	.list {
		&:first-of-type {
			padding: 8px 0 16px;
			border-bottom: 8px solid $color-background;
			li {
				display: flex;
				justify-content: space-around;
				p {
					&:first-child {
						font-size: $font-size-large;
					}
					small {
						font-size: $font-size-small;
					}
				}
				
			}
		}
		li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: center;
			padding: 0 16px 8px;
			@include border-1px($color-background)
			&:last-child {
				@include border-1px($color-background-d)
			}
			div {
				p {
					&:first-child {
						color: $color-text-d;
					}
					line-height: 1.5;
				}
			}
		}
	}
	
}

</style>