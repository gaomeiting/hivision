<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	<div v-if="slider.length" class="slider-wrapper" ref="slider">
		<slider>
			<div v-for="(item, index) in slider" :key="index" @click.stop="goByNav(index)">
				<a href="javascript:;">
					<img :src="item.picUrl" @load="imgLoad">
				</a>
			</div>
		</slider>
	</div>
	<div class="row-wrap">
	<div class="pic-wrapper" ref="picWrapper">
	  <ul class="pic-list" ref="picList">
			<li class="pic-item" v-for="(item, index) in stories" :key="index" @click.stop="goStory(item)">
				<img :src="item.coverImg">
			</li>
	  </ul>
    </div>
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
import BScroll from "better-scroll";
import Slider from "base/slider/slider"
import Scroll from 'base/scroll/scroll'
import Switches from 'base/switches/switches'
import VoteList from 'base/singer-list/singer-list'
import ErrorTip from 'base/error-tip/error-tip'
import { wxShare, commonWxConfig } from 'assets/js/mixin'
import { getData } from 'api/init'
export default {
	mixins: [wxShare, commonWxConfig],
	data() {
		return {
			
			error: '',
			slider: [ {
				picUrl: '/static/home_bg.png',
				url : '/profile'
			}],
			switches: [{ name: '最佳人气选手' }, { name: '最新参赛选手' }],
			currentPage: 0,
			size: 10,
			load: false,
			more: true,
			pullUp: true,
			beforeScroll: true,
			switchIndex: 0,
			list: [],
			stories: []
		}
	},
	head() {
		return {
			title: '与声俱来·声咖大赛'
		}
	},
	created() {
		this._getCurrentInfoWx()
		this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		this._getStoriesData();
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
		goByNav(index) {
			this.$router.push(this.slider[index].url)
		},
		goStory(item) {
			this.$router.push(`/selectbook/${item.id}`)
		},
		goByName(item) {
			//console.log(item.id)
			this.$router.push({
				path: '/singer',
				query: {
					id : item.id
				}
			})
		},
		switchItem(index) {
			this.switchIndex = index;
		}, 
		hasMoreData() {
			if(!this.more) return;
			this.currentPage+=1;
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		},
		_initPics() {
	        if (this.stories.length>0) {
	          let picWidth = 64;
	          let margin = 6;
	          let width = (picWidth + margin) * this.stories.length - margin;
	          this.$refs.picList.style.width = width + 'px';
	          this.$nextTick(() => {
	            if (!this.picScroll) {
	              this.picScroll = new BScroll(this.$refs.picWrapper, {
	                scrollX: true,
	                eventPassthrough: 'vertical'
	              });
	            } else {
	              this.picScroll.refresh();
	            }
	          });
	        }
	    },
		_getStoriesData() {
			getData('/api/audition_story/').then(res => {
				if(res.status == 200) {
					this.stories = res.data
					this.$nextTick(()=> {
						this._initPics()
					})
				}
			}).catch(err => {
				if(err.data) {
					this.error = `${err.data.message}`;
					this.$refs.errorTip.show();
				}
			})
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
					this.error = `${err.data.message}`
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
.row-wrap {
	padding: 16px 16px 0;
}
 .pic-wrapper{
	width: 100%;
    overflow: hidden;
    white-space: nowrap;
    .pic-list{
		font-size: 0;
      .pic-item{
			display: inline-block;
			margin-right: 6px;
			width: 64px;
			height: 94px;
			img {
				width: 100%;
				min-height: 100%;
			}
            &:last-child {
            	margin: 0;
            }
                
        }
  	}
 }
.vote-wrap {
	min-height: 100vh;
	background: $color-background-d;
	.switches-wrap {
		padding-top: 16px;
	}
}

</style>