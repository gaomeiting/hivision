<template>
<transition name="fade" mode="out-in">
	<div>
		<div class="form-wrap">
			<sub-title title="个人信息"></sub-title>
			<div class="form-content">
				<p class="item">昵称</p>
				<p class="item">
					<input type="text" v-model="form.title" placeholder="请输入昵称">
				</p>
				<p class="item">真实姓名</p>
				<p class="item">
					<input type="text" v-model="form.name" placeholder="请输入真实姓名">
				</p>
				<p class="item">身份证号</p>
				<p class="item">
					<input type="text" v-model="form.identity" placeholder="请输入身份证号">
				</p>
				<p class="item">选择城市</p>
				<p class="item">
					<span class="city" @click.stop.prevent="switchCity" style="padding-left: 1em">{{ city.NAME }}</span>
					<!-- <input type="text" v-model="form.city" readonly placeholder="选择你所在的城市" @click.stop.prevent="switchCity"> -->
				</p>
				<p class="item">可录音时间</p>
				<p class="item tags-wrap">
					<span v-for="(time, index) in times" :class="{'active' : indexs.times === index}" :key="index" @click.stop.prevent="setTimeTag(index)"> {{ time.val }} </span>
				</p>
				<p class="item tags-title"> <span>擅长风格</span> <span>（最多选五项）</span></p>
				<p class="item tags-wrap">
					<span v-for="(tag, index) in tags" :key="index" @click="selectTags(index)" ref="tag"> {{ tag.val }} </span>
				</p>
				<p class="item">
					<a class="btn btn-all" href="javascript:;" @click="submitHandler">下一步</a>
				</p>
			</div>
			<top-tip ref="topTip">
				<p class="top-tip-text">{{error}}</p>
			</top-tip>
			
		</div>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import SubTitle from '~/components/htitle/htitle'
import TopTip from '~/components/top-tip/top-tip'
import { Message } from 'element-ui'
import { postData } from '~/api/api'
	export default {
		data() {
			return {
				form: {
					title: '中户',
					name: '高山',
					identity: '130633199301230654',
					time: '',
					styles: []
				},
				tags: [
					{ val: '新闻播报' },
					{ val: '大气稳重' },
					{ val: '家常聊天' },
					{ val: '激昂气势' },
					{ val: '悠扬抒情' },
					{ val: '动感活力' },
					{ val: '庄重威严' },
					{ val: '冷淡感性' },
					{ val: '走心煽情' },
					{ val: '浑厚沧桑' },
					{ val: '甜美可爱' }
				],
				times: [
					{ val: '0.5 ~ 1.0 小时' },
					{ val: '1.0 ~ 2.0 小时' },
					{ val: '2.0 ~ 4.0 小时' },
					{ val: '4.0 ~ <8 class="0"></8> 小时' },
				],
				indexs: {
					times: null,
					styles: []
				},
				error: ''
				
			}
		},
		
		computed: {
			...mapGetters(['city'])
		},

		methods: {
			
			settingCity(item) {
				this.form.city = item.NAME;
			},
			switchCity() {
				//console.log(12345)
				this.$router.push('/city')
			},
			submitHandler() {
				//let isIDCard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				let isIDCard=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				let isName = /^([\u4e00-\u9fa5]){2}$/
				let isTitle = /^[\w\u4e00-\u9fa5]{6,8}$/

				this._setFormTag();
				if(!this.form.title) {
					this.error = "昵称不能为空"
					this.$refs.topTip.show()
				}
				else if(!this.form.name) {
					this.error = '姓名不能为空'
					this.$refs.topTip.show()
				}
				else if(isName.test(this.form.name) == false) {
					this.error = '请输入正确的姓名格式'
					this.$refs.topTip.show()
				}
				else if(!this.form.identity) {
					this.error = '身份证号不能为空'
					this.$refs.topTip.show()
				}
				else if(isIDCard.test(this.form.identity) == false) {
					this.error = '身份证号格式不正确'
					this.$refs.topTip.show()
				}
				else if(!this.city) {
					this.error = '选择你所在的城市'
					this.$refs.topTip.show()
				}
				else if(!this.form.time) {
					this.error = '您还没有选择录音时长'
					this.$refs.topTip.show()
				}
				else if(!this.form.styles.length) {
					this.error = '您还没有选择擅长风格'
					this.$refs.topTip.show()
				}
				else {
					this.error = ''
					postData('/api/bind/onbording.json', {
					  idcard: this.form.identity,
					  location: this.city.NAME,
					  nickname: this.form.title,
					  realname: this.form.name,
					  record_time: this.form.time,
					  styles: this.form.styles.join(',')
					}).then(res => {
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				}
				console.log(this.form.time, this.error)
			},
			setTimeTag(index) {
				this.indexs.times = index;
			},
			settingTags() {
				if(this.form.identity) {
					console.log(this.form.identity.splice(-1, 1))
				}

			},
			selectTags(index) {

				let subIndex = this._findIndex(this.indexs.styles, index)
				let tag = this.$refs.tag[index]
				if(subIndex !== -1) {
					this.indexs.styles.splice(subIndex, 1)
					tag.classList.remove('active')
				}
				else {
					if(this.indexs.styles.length > 4) {
						Message("最多选5项", "")
						return;
					}
					this.indexs.styles.push(index)
					tag.classList.add('active')
				}
			},
			computedCls(index) {
				let subIndex = this._findIndex(this.indexs.styles, index)
				this.active[index] = subIndex !== -1
			},
			_setFormTag() {
				this.form.styles = [];
				let styles = this.indexs.styles;
				if(styles.length > 0) {
					styles.forEach(item => {
						this.form.styles.push(this.tags[item].val)
					})
				}
				if( this.indexs.times !== null ) {
					this.form.time =  this.times[this.indexs.times].val
				}
				//console.log(this.form.time, "_setFormTag")
			},
			_findIndex(list, obj) {
				return  list.findIndex(item => {
					return item === obj;
				})
			}

		},
		components: {
			SubTitle,
			TopTip
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	padding: 16px;
}
.top-tip-text {
	color: $color-background-d;
	line-height: 3;
	text-align: center;
}
.form-wrap {
	border: 1px solid $color-text-ll;
	background: $color-background-d;
	padding: 10px 16px 30px;
	border-radius: 5px;
	
	.form-content {
		padding: 16px 0;
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;

			&.tags-wrap {
				flex-wrap: wrap;
				justify-content: space-between;
				span {
					display: inline-block;
					margin: 0 0 10px 0;
					padding: 4px;
					border-radius: 4px;
					background: $color-theme-d;
					&.active {
						background: $color-theme;
						color: $color-background-d;
					}
				}
			}
			&.tags-title {
				span:last-child {
					font-size: 80%;
				}
			}
			&:first-of-type {
				input {
					margin-right: 0;
				}
			}
			&:nth-of-type(2n-1) {
				color: $color-text-d;
			}
			input, .city {
				flex: 1;
				border: 1px solid $color-text-ll;
				border-radius: 4px;
				margin-right: 8px;
				padding: 12px 0;
			}
			
			.btn {
				color: $color-background-d;
				padding: 0 30px;
				line-height: 44px;
				height: 44px;
				background: $color-theme;
				border-radius: 4px;
				&.btn-all {
					display: block;
					width: 100%;
					text-align: center;
				}
			}
		}
	}
}
.tip-text-wrap {
	h3 {
		line-height: 2.5;
		font-size: $font-size-large;
		color: $color-text-d;
	}
	p {
		line-height: 1.6;
	}
}
</style>