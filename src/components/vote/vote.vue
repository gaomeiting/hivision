<template>
<scroll class="page" ref="scroll" :data="list" :pullUp="pullUp" @scrollEnd="hasMoreData" :beforeScroll="beforeScroll">
<div class="vote-wrap" ref="vote">
	<div class="down-loaded-wrap" v-show="name">
		<down-loaded></down-loaded>
	</div>
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
	
</div>
<div class="search-wrap">
	<div class="header" @click.stop="goByAvatar" :style="'background-image:url('+avatar+')'"></div>
	<div class="search-box" @click.stop.prevent="goSearchSingers">输入选手昵称/编号搜索</div>
	<div class="icon-wrap" v-if="shareIcon" @click.stop="settingShare">
		<i class="iconfont icon-fenxiang"></i>
	</div>
</div>
<div class="share-icons-wrap">
	<share-icons ref="share" @cancle="cancle" @selectShare="selectSharehome"></share-icons>
</div>
<error-tip ref="errorTip" :error="error"></error-tip>
<share-tip ref="shareTip"></share-tip>
</scroll>
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import Slider from "base/slider/slider"
import Scroll from 'base/scroll/scroll'
import Switches from 'base/switches/switches'
import VoteList from 'base/singer-list/singer-list'
import DownLoaded from 'base/down-loaded/down-loaded'
import ShareIcons from 'base/share-icons/share-icons'
import ErrorTip from 'base/error-tip/error-tip'
import ShareTip from 'base/share-tip/share-tip'
import { share, wxShare, commonWxConfig, loadBtn } from 'assets/js/mixin'
import { wxFnVer, lingxiFn } from 'assets/js/version'
import { getData } from 'api/init'
import { mapGetters } from 'vuex'
export default {
	mixins: [share, wxShare, commonWxConfig, loadBtn],
	data() {
		return {
			
			error: '',
			slider: [ {
				picUrl: '/st/home_bg.png',
				url : '/enroll'
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
			stories: [],
			shareIcon: '',
			avatar: 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg'
		}
	},
	
	created() {
		this.shareIcon = wxFnVer() || lingxiFn()
		this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		this._getStoriesData();
		if(this.token) {
			console.log("获取token")
			this._getCurrentInfo()
		}
	},
	
	watch: {
		switchIndex(newVal, oldVal) {
			this.currentPage = 0;
			this.more = true;
			this.list = []
			this._getSingerList('/api/contestant', {page: this.currentPage, size: this.size, sort: this.sort})
		},
		token() {
			console.log("获取token")
			this._getCurrentInfo()
		}
	},
	computed: {
		sort() {
			return this.switchIndex ? 'createOn,desc' : 'popularNum,desc'
		},
		...mapGetters(['token'])
	},
	methods: {
		settingShare() {
			if(lingxiFn()) {
				this.toggleShare()
			}
			if(wxFnVer()) {
				this.showShareTip()
			}
		},
		showShareTip() {
			this.$refs.shareTip.show()
		},
		goSearchSingers() {
			this.$router.push('/searchSingers')
		},
		imgLoad() {
			if(!this.imgChecked) {
				this.$refs.scroll.refresh()
				this.imgChecked=true;
			}
		},
		goByAvatar() {
			this.$router.push('/me')
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
			console.log('_getSingerList');
			this.load = true;
			console.log(url, params)
			getData(url, params).then(res => {
				console.log('getData成功')
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
		
		_getCurrentInfo() {
			getData('/api/user/current').then(res => {
				console.log(res, "得到值")
				if(res.status === 200) {
					this.avatar = res.data.avatar
				}
			}).catch(err => {
				if(err && err.data) {
					this.error = `${err.data.message}`
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
		ErrorTip,
		Slider,
		Switches,
		VoteList,
		DownLoaded,
		ShareIcons,
		ShareTip
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
.page {
	top: 72px;
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
			overflow: hidden;
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
 .search-wrap {
		display: flex;
		align-items: center;
		padding: 16px;
		background-color: $color-background-d;
		width: 100%;
		position: fixed;
		top: 0;
		.search-box {
			flex: 1;
			border: 1px solid $color-background;
			line-height: 2.5;
			border-radius: 6px;
			text-indent: 1em;
		}
		.header {
			width: 32px;
			height: 32px;
			overflow: hidden;
			border-radius: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center center;
			margin-right: 10px;
		}
		.icon-wrap {
			padding-left: 16px;
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