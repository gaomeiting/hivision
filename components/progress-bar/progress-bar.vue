<template>
<div class="progress-bar" ref="progressBar">
	<div class="bar-inner" @click.stop.prevent="setProgressPos">
		<div class="progress" ref="progress"></div>
		<div class="progress-btn-wrapper" ref="progressBtn" @click.stop.prevent @mousedown.stop.prevent="progressTouchstart" @mousemove.stop.prevent="progressTouchmove" @mouseup.stop.prevent="progressTouchend" @mouseout.stop.prevent="progressTouchend">
			<div class="progress-btn"></div>
		</div>
	</div>
</div>
</template>
<script type="text/ecmascript-6">
const progressBtnWidth = 15
/*const transform = prefixStyle('transform')*/
export default {
props: {
	percent: {
		type: Number,
		default: 0
	}
},
created() {
	this.touch= {};
},
watch : {
	percent(newPercent) {
		this._initProgress(newPercent)
		//console.log(newPercent, "newPercent")
	}
},
methods: {
	progressTouchstart(e) {
		this.touch.startX=e.pageX;
		this.touch.flag=true;
		this.touch.left=this.$refs.progress.offsetWidth
	},
	progressTouchmove(e) {
		if(!this.touch.flag) return;
		let left=0;
		let width= this.$refs.progressBar.offsetWidth - progressBtnWidth;
		this.touch.delta=e.pageX-this.touch.startX;
		left=this.touch.left + this.touch.delta
		this.touch.offsetLeft=Math.max(left,0) && Math.min(width, left);
		this._offsetLeft(this.touch.offsetLeft)
		if(this.touch.offsetLeft !== width){
			this.triggerPercent(this.touch.offsetLeft, false)
		}
		this.triggerPercent(this.touch.offsetLeft, true)
	},
	progressTouchend() {
		if(!this.touch.flag) return;
		this.touch.flag=false;
		this.triggerPercent(this.touch.offsetLeft, true)
	},
	triggerPercent(offsetLeft, flag) {
		let width= this.$refs.progressBar.offsetWidth - progressBtnWidth;
		let percent = offsetLeft / width
		this.$emit('triggerPercent', percent, flag)
	},
	setProgressPos(e) {
		let width= this.$refs.progressBar.offsetWidth - progressBtnWidth;
		let offsetLeft = Math.min(width,e.offsetX);
		this.triggerPercent(offsetLeft, true)
	},
	_initProgress(percent) {
		let width= this.$refs.progressBar.offsetWidth - progressBtnWidth;
		if(width<0 || this.touch.flag) return;
		let offsetLeft = percent * width;
		this._offsetLeft(offsetLeft)
	},
	_offsetLeft(offsetLeft) {
		let progress=this.$refs.progress;
		let progressBtn= this.$refs.progressBtn;
		progress.style.width=offsetLeft+"px";
		progressBtn.style['transform']=`translate3d(${offsetLeft}px,0,0)`;
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/css">
  @import "~assets/scss/variable";

.progress-bar {
	width: 100%;
	height: 30px;
	cursor: pointer;
	.bar-inner {
		position: relative;
		top: 13px;
		height: 4px;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		.progress {
			position: absolute;
			height: 100%;
			background: #4285f4;
		}
		.progress-btn-wrapper {
			position: absolute;
			left: -8px;
			top: -13px;
			width: 30px;
			height: 30px;
			.progress-btn {
				position: relative;
				top: 7px;
				left: 7px;
				box-sizing: border-box;
				width: 16px;
				height: 16px;
				border: 3px solid rgba(255,255,255,0.6);
				border-radius: 50%;
				background: #4285f4;
			}
		}
	}
}
</style>