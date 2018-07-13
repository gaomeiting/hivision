<template>
	
 	<div id="area" v-if="flag">
 		<div class="content">
	 		<scroll class="area-con-wrap" :data="cityLists" :probe-type="probeType" :listenScroll="listenScroll" @scroll="scroll" ref="listview">
	 			<div class="area-con">
		 			<div class="hot-city" ref="group">
		 				<h3 class="title">热门城市</h3>
		 				<ul class="hot-city-con">
		 					<li v-for="(city, index) in cityLists" :key="index" v-if="city.isHotCity"><a href="javascript:;" @click.stop.prevent="selectCity(city, $event)">{{city.NAME}}</a></li>
		 				</ul>
		 			</div>
		 			<div class="com-city"  v-for="(letter, index) in letters" :key="index" v-if="index !== 0"  ref="group">
		 				<h3 class="title">{{letter}}</h3>
		 				<ul class="hot-city-con">
		 					<li v-for="(city, index) in cityLists" :key="index" v-if="letter==city.letter"><a href="javascript:;" @click.stop.prevent="selectCity(city, $event)">{{city.NAME}}</a></li>
		 				</ul>
		 			</div>
	 			</div>
	 		</scroll>
	 		<div class="area-list-wrap">
		 		<div class="area-list" @touchstart.stop.prevent="onShortcutTouchStart"  @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
		 			<a class="letter" v-for="(letter, index) in letters" :key="index" @click.stop.prevent="selectLetter(index, $event)" :data-index="index">{{letter}}</a>
		 		</div>
	 		</div>
 		</div>
 	</div>
</template>
<script>
import Scroll from '~/components/scroll/scroll'
import { mapMutations } from 'vuex'
import { list } from '~/assets/js/city'
const TITLE_HEIGHT = 0
const ANCHOR_HEIGHT = 22;
export default {
	data() {
		return {
			letters: ['#','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
			cityLists: [],
      			scrollY: -1,
			currentIndex: 0,
			diff: -1,
			flag: true
		}
	},
	created() {
		this.touch= {}
  		this.probeType = 3
  		this.listHeight = []
  		this.listenScroll = true
		this.cityLists = list
		
	},
	watch: {
  		cityLists () {
  			this.$nextTick(() => {
	  			this._calculateHeight()
	  		})
  		},
  		scrollY(newY) {
  			//滚动到顶；
  			if(newY>0) {
  				this.currentIndex = 0;
  				return;
  			}
  			//滚动到中间；
  			for(let i= 0; i<this.listHeight.length-1; i++) {
  				let Height1=this.listHeight[i];
  				let Height2=this.listHeight[i+1];
  				if( -newY >= Height1 && -newY < Height2 ) {
  					this.diff = Height2 + newY
  					this.currentIndex = i;
  					return;
  				}
  			}
  			//滚动到底部；
  			this.currentIndex=this.listHeight.length-2
  		},
  		diff(newVal) {
		        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
		        if (this.fixedTop === fixedTop) {
		          return
		        }
		        this.fixedTop = fixedTop
		        if(this.$refs.fixed) {
		        	this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
		        }
		}
  	},
	methods: {
		show() {
			this.flag = true;
		},
		hide() {
			this.flag = false;
		},
		selectLetter(index,event) {
			if(!event._constructed){
	    			return;
	    		}
    			let el = this.$refs.arealist[index-1]
    			this.areaScroll.scrollToElement(el, 500)
		},
		selectCity(item,event) {
			if(!event._constructed){
	    			return;
	    		}
	    	this.setCity(item);
	    	this.$router.back()
		},
		onShortcutTouchStart(e) {
  			let index= e.target.dataset.index-1;
  			let el=this.$refs.group[index];
  			this._scrollTo(index);
  			let firstTouch= e.touches[0];
  			this.touch.y1=firstTouch.pageY;
  			this.touch.anchorIndex=index;
  		},
  		onShortcutTouchMove(e) {
  			let firstTouch= e.touches[0];
  			this.touch.y2=firstTouch.pageY;
  			this.delta=this.touch.y2-this.touch.y1;
  			let index= (this.delta / ANCHOR_HEIGHT | 0) + parseInt(this.touch.anchorIndex);
  			let el=this.$refs.group[index];
  			this._scrollTo(index);
  		},
  		scroll(pos) {
  			this.scrollY=pos.y
  		},
  		_scrollTo(index) {
  			if (!index && index !== 0) {
				return
			}
			if (index < 0) {
				index = 0
			}
			else if (index > this.listHeight.length - 2) {
				index = this.listHeight.length - 2
			}
			this.scrollY = -this.listHeight[index]
  			this.$refs.listview.scrollToElement(this.$refs.group[index], 0);
		},
		_calculateHeight() {
			this.listHeight = [];
			const groups= this.$refs.group;
			let sumH=0
			this.listHeight.push(sumH)
			for( let i=0; i < groups.length ; i++) {
				sumH += groups[i].offsetHeight;
				this.listHeight.push(sumH)
			}
		},
		...mapMutations({
			'setCity': 'SET_CITY'
		})
		
	},
	components: {
		Scroll
	}
}
</script>
<style scoped lang="scss">
@import "~assets/scss/mixin";
#area {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #fff;
	z-index: 900;
	overflow: hidden;
	.area-con-wrap {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	h3 {
		text-align: center;
		position: relative;
		background: #fff;
		z-index: 900;
		span {
			height: 40px;
			line-height: 40px;
			font-size: 18px;
		}
		.icon-shanchu {
			position: absolute;
			top: 12px;
			right: 12px;
			color: #ec534a;
			font-size: 1.4em;
		}
	}
	.com-city {
		.title {
			line-height: 28px;
			background: #f7f7f7;
			text-align: left;
			padding-left: 12px;
		}
		li {
			height: 38px;
			line-height: 38px;
			padding: 0 12px;
			a {
				display: block;
				color: #666;
				@include border-1px(#f7f7f7);
			}
		}
	}
	.hot-city {
		.title {
			line-height: 28px;
			background: #f7f7f7;
			text-align: left;
			padding-left: 12px;
			padding-top: 10px;
		}
		>ul {
			font-size: 0;
			background: #f7f7f7;
		}
		li {
			width: 33.33%;
			box-sizing: border-box;
			background: #f7f7f7;
			padding: 10px 12px;
			display: inline-block;
			a {
				display: block;
				height: 48px;
				line-height: 48px;
				text-align: center;
				font-size: 14px;
				background: #fff;
				color: #666;
				white-space: nowrap;
			}
		}
	}
	.area-list-wrap {
		position: absolute;
		right: 0;
		top: 40px;
		bottom: 0;
		width: 38px;
		text-align: center;
		overflow: hidden;
		.area-list {
			position: absolute;
			top: 50%;
			transform: translate3d(0, -50%, 0);
			width: 38px;
			text-align: center;
			z-index: 900;
			a {
				display: block;
				width: 100%;
				line-height: 1.4;
			}	
		}	
		
	}
}
</style>