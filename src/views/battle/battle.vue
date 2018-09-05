<template>
<scroll class="page" ref="scroll" :data="list">
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
	
	<div class="vote-list">
		<battle-list :list="list" :load="load" @goByName="goByName" @goByBook="goByBook"></battle-list>
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
// @ is an alias to /src
import Slider from "components/slider/slider"
import Scroll from 'components/scroll/scroll'
import BattleList from 'components/battle-list/battle-list'
import DownLoaded from 'components/down-loaded/down-loaded'
import ShareIcons from 'components/share-icons/share-icons'
import ErrorTip from 'components/error-tip/error-tip'
import ShareTip from 'components/share-tip/share-tip'
import { share, wxShare, commonWxConfig, loadBtn } from 'assets/js/mixin'
import { CreatePKgroup } from 'assets/js/pkGroup'
import { wxFnVer, lingxiFn } from 'assets/js/version'
import { getData } from 'api/init'
import { mapGetters } from 'vuex'
export default {
  name: 'battle',
  mixins: [share, wxShare, commonWxConfig, loadBtn ],
  data() {
		return {
			
			error: '',
			slider: [ {
				picUrl: '/home_bg.png',
				url : '/enroll'
			}],
			load: false,
			more: true,
			list: [],
			stories: [],
			shareIcon: '',
			avatar: 'http://st.ddpei.cn/hv/mglx/img/hvlogo.jpg'
		}
	},
	
	created() {
		console.log("battle 12345")
		this.shareIcon = wxFnVer() || lingxiFn()
		this._getSingerList('/api/pk/?page=0&size=60&sort=top,desc')
		if(this.token) {
			this._getCurrentInfo()
		}
	},
	
	watch: {
		token() {
			this._getCurrentInfo()
		}
	},
	computed: {
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
		goByBook(bookId, pkGroupId) {
			console.log(pkGroupId)
			this.$router.push({
				path: `/selectbook/${bookId}`,
				query: {
					pkGroupId
				}
			})
		},
		_getSingerList(url, params) {
			this.load = true;
			getData(url, params).then(res => {
				this.load = false;
				if(res.status===200) {
					this.list= this._normalizeData(res.data)
				}
			}).catch(err => {
				this.load = false;
				if(err.data) {
					this.error = `${err.data.message}`
					this.$refs.errorTip.show()
				}
			})
		},
		_normalizeData(list) {
			let res = []
			list.forEach(item => {
				let bookId = item.id;
				let bookName = item.title;
				let pkGroupId = item.pkGroup.id;
				let redPlayer = item.pkGroup.redPlayer;
				let bluePlayer = item.pkGroup.bluePlayer;
				res.push(CreatePKgroup({bookId, bookName, pkGroupId, redPlayer, bluePlayer}))
			})
			return res;
		},
		_getCurrentInfo() {
			getData('/api/user/current').then(res => {
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
	BattleList,
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
.vote-list {
	padding: 16px;
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