<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	<div v-if="slider.length" class="slider-wrapper" ref="slider">
		<slider>
			<div v-for="(item, index) in slider" :key="index">
				<a href="javascript:;">
					<img :src="item.picUrl" @load="imgLoad">
				</a>
			</div>
		</slider>
	</div>
	<div class="switches-wrap">
		<switches :switches="switches" :currentIndex="switchIndex" @switchItem="switchItem"></switches>
	</div>
	<div class="vote-list">
		<vote-list :more="more" :list="list" :load = "load" @goByName="goByName"></vote-list>
	</div>
	<error-tip ref="errorTip" :error="error"></error-tip>
</div>
</scroll>
</template>
<script type="text/ecmascript-6">
import Slider from "~/components/slider/slider"
import Scroll from '~/components/scroll/scroll'
import Switches from '~/components/switches/switches'
import VoteList from '~/components/singer-list/singer-list'
import ErrorTip from '~/components/error-tip/error-tip'
import { wxShare } from '~/assets/js/mixin'
import { getData } from '~/api/init'
export default {
	mixins: [wxShare],
	data() {
		return {
			
			error: '',
			slider: [ {
				picUrl: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=16e69d830f4f78f09f0b9cf349300a83/63d0f703918fa0ece5f167da2a9759ee3d6ddb37.jpg'
			},{ picUrl: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=ff6ed7cfa718972bbc3a06cad6cc7b9d/267f9e2f07082838304837cfb499a9014d08f1a0.jpg'
			}],
			switches: [{ name: '最佳人气选手' }, { name: '最新参赛选手' }],
			currentPage: 0,
			size: 10,
			load: false,
			more: true,
			pullUp: true,
			beforeScroll: true,
			switchIndex: 0,
			list: []
		}
	},
	head() {
		return {
			title: '与声俱来·声咖大赛'
		}
	},
	created() {
		/*this._getCurrentInfo()*/
		this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
	},
	beforeMount() {
		this._getShareConfig('', true)
	},
	watch: {
		switchIndex(newVal, oldVal) {
			this.currentPage = 0;
			this.more = true;
			this.list = []
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		}
	},
	computed: {
		sort() {
			return this.switchIndex ? 'createOn,desc' : 'popularNum,desc'
		}
	},
	methods: {
		imgLoad() {
			if(!this.imgChecked) {
				this.$refs.scroll.refresh()
				this.imgChecked=true;
			}
		},
		goByName(item) {
			//console.log(item.id)
			this.$router.push(`/singer/?id=${item.id}`)
		},
		switchItem(index) {
			this.switchIndex = index;
		}, 
		hasMoreData() {
			if(!this.more) return;
			this.currentPage+=1;
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		},
		
		_getSingerList(url, params) {
			this.load = true;
			getData(url, params).then(res => {
				this.load = false;
				if(res.status===200) {
					this.list= [...this.list, ...res.data]
					this._hasMore(res.total)
				}
			}).catch(err => {
				this.load = false;
				if(err.data) {
					this.error = `${err.data.status}${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		},
		_hasMore(total) {
			this.more = (this.currentPage+1) * this.size < total
		},
		
		
	},
	components: {
		Scroll,
		ErrorTip,
		Slider,
		Switches,
		VoteList
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.slider-wrapper {
	position: relative;
	width: 100%;
	overflow: hidden;	
}

.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.switches-wrap {
		padding-top: 16px;
	}
}

</style>