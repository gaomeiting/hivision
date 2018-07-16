<template>
	<scroll class="page" :data="list" ref="scroll">
		<div class="home">
			<div class="contain">
				<div class="logos">
					<ul>
						<li>主办机构</li>
						<li>
							<div>
								<figure>
									<img src="~/assets/images/logo1.png">
								</figure>
								<p>中国版权协会</p>
							</div>
							<!-- <div>
								<figure>
									<img src="~/assets/images/logo2.png">
								</figure>
								<p>中国移动咪咕文化科技集团</p>
							</div> -->
						</li>
					</ul>
					<ul>
						<li>联合举办</li>
						<li>
							<div>
								<figure>
									<img src="~/assets/images/logo4.png">
								</figure>
								<p>咪咕数字传媒</p>
							</div>
							<div>
								<figure>
									<img src="~/assets/images/logo3.png">
								</figure>
								<p>叮当配</p>
							</div>
						</li>
					</ul>
				</div>
				<p class="share-icon" @click.stop.prevent="toggleShare">
					<i class="iconfont icon-fenxiang"></i>
				</p>
			</div>
			
			<div class="info" ref="info_0">
				<h2>
					ABOUT <br>
					COMPETITION <br>
					大赛介绍
				</h2>
				<p>
					“嗨未来”儿童有声阅读计划之“与声俱来”声咖大赛是专为孩子们征集用爱发声的配音员，通过专业知识解读，最终将给孩子听得懂的有声节目，全程以用爱发声为核心，所征集内容将面向全国少年儿童免费播出，传递无声的爱；
				</p>
				<p>该赛事也是国内首个专为儿童征集优秀配音员的高端赛事，由中国版权协会主办，咪咕数字传媒有限公司和叮当配联合举办。</p>
				<p>进入决赛的前6强选手，将有机会获得万元奖金，成为《嗨未来》的签约声咖，长期为小朋友录制儿童作品，更有机会与国内一线明星同台演播，同框宣传。</p>
			</div>
			<div class="info" ref="info_1">
				<h2>
					AWARDS SETTING <br>
					奖项设置
				</h2>
				<h2>
					<strong>万</strong>元奖金/神秘礼包等你拿签约声咖 常年持续录制
				</h2>
				<figure>
					<img src="~/assets/images/bg1.jpg">
				</figure>
				<p>
					与一线明星同台演播，同框宣传。<br>
					用爱发声，你就是宝贝心中的声音大咖
				</p>
				
			</div>
			<div class="info" ref="info_2">
				<h2>
					ENTRYGUIDE <br>
					参赛指引
				</h2>
				<div class="time-line">
					<ul>
						<li>
							<div>
								<h4>大赛报名 </h4>
								<p>7月19日～8月19日</p>
							</div>
							<div></div>
						</li>
						<li>
							<div></div>
							<div>
								<h4> 投票海选 </h4>
								<p>8月1日～8月23日</p>
							</div>
							
						</li>
						<li>
							<div>
								<h4>专业PK </h4>
								<p>8月24日~9月20日</p>
							</div>
							<div></div>
						</li>
						<li>
							<div></div>
							<div>
								<h4> 明星共读</h4>
								<p>9月20日～10月30日</p>
							</div>
							
						</li>
						<li>
							<div style="border-right: none">
								<h4>颁奖盛典 </h4>
								<p>11月15日</p>
							</div>
							<div></div>
						</li>
					</ul>
					<ul>
						<li><i class="iconfont icon-chenggong active"></i></li>
						<li><i class="iconfont icon-chenggong"></i></li>
						<li><i class="iconfont icon-chenggong"></i></li>
						<li><i class="iconfont icon-chenggong"></i></li>
						<li><i class="iconfont icon-chenggong"></i></li>
					</ul>
				</div>
				
				
				
			</div>
			<div class="info" ref="info_3">
				<h2>
					ENTRY <br>
					CONDITIONS <br>
					参赛条件
				</h2>
				<p>
					16岁（含）以上配音员以及声音条件良好的配音爱好者；
				</p>
				<p>个人或团队方式报名均可；</p>
				<p>参赛声音作品须内容健康，不涉及色情、暴力以及反动言论；</p>
				<p>参赛声音作品控制在8～10分钟左右，以讲述一个故事，教孩子一个道理或知识点为主；</p>
				<p>参赛者需要用爱发声，有亲和力、有趣、能打动孩子。</p>
			</div>
			<div class="info" ref="info_4">
				<h2>
					ATTENTION <br>
					注意事项
				</h2>
				<h4>
					参赛协议
				</h4>
				<p>
					（一）版权说明
				</p>
				<p>1、参赛选手对其参赛音频作品负有法律责任。如参赛者盗用、抄袭他人作品而产生法律纠纷，由参赛者承担法律责任，与主办单位无关。盗用、抄袭他人作品一经查实将立刻取消比赛资格</p>
				<p>2、所有参赛作品，组委会有权在赛事宣传出版、与本活动相关的一切宣传推广活动中进行无偿使用。主办单位拥有将该参赛作品编制成录像带、光盘或任何形式赛事周边、相片、摄影作品等赛事衍生品，予以推广的权利。</p>
				<p>
					（二）参赛须知
				</p>
				<p>参赛人员一旦完成报名手续即表示同意并完全理解关于“嗨未来”活动组委会的一切规划，并同意申明。请参赛者投稿前仔细阅读本次大赛之参赛协议。</p>
			</div>
			<div class="info" ref="info_5">
				
				<h4>
					咨询热线
				</h4>
				<p>
					153 4887 4512
				</p>
				<h4>
					官方邮箱
				</h4>
				<p>
					hvision@ddpeiyin.com
				</p>
				<h4>
					官方微信公共号
				</h4>
				<figure>
					<img src="~/assets/images/code.jpg" alt="">
				</figure>
			</div>
		</div>
		<div class="btns">
			<a href="javascript:;" class="btn" @click.stop="regist">立即报名</a>
			<i class="iconfont icon-gengduo" @click="settingMenu"></i>
		</div>
		<div class="menu-wrap">
			<menu-list ref="menu" @selectMenu="selectMenu"></menu-list>
		</div>
		<div class="share-icons-wrap">
			<share-icons ref="share" @cancle="cancle" @selectShare="selectSharehome"></share-icons>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '~/components/scroll/scroll'
import MenuList from '~/components/menu/menu'
import ShareIcons from '~/components/share-icons/share-icons'
import { share } from '~/assets/js/mixin'
	export default {
		mixins: [ share ],
		data() {
			return {
				list: [1,2,3],
				flag: false
				
			}
		},
		created() {
			
		},
		methods: {
			regist() {
				this.$router.push('/profile')
			},
			settingMenu() {
				this.flag = !this.flag;
				if(this.flag) {
					this.$refs.menu.show()
				}
				else {
					this.$refs.menu.hide()
				}

				console.log(this.flag)
			},
			selectMenu(index, flag) {
				this.flag = !flag;
				console.log(this.flag)
				let refsIndex = 'info_' + index
				let el = this.$refs[refsIndex];
				this.$refs.scroll.scrollToElement(el)
			}
		},
		components: {
			Scroll,
			MenuList,
			ShareIcons
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.menu-wrap {
	position: fixed;
	bottom: 44px;
	right: 0;
	z-index: 999;
}
.share-icon {
	position: absolute;
	top: 0;
	right: 0;
	padding: 16px;
	
	
}
.btns {
	position: absolute;
	bottom: 0;
	z-index: 999;
	width: 100%;
	height: 44px;
	line-height: 44px;
	background-color: $color-highlight-background;
	display: flex;
	font-size: $font-size-large;
	.btn {
		color: $color-background-d;
		flex: 1;
		text-align: center;
	}
	i {
		padding: 0 16px;
		background: $color-text-d;
	}
}
.home {
	> .info {
		padding: 50px 20px 60px;
		min-height: 100vh;
		box-sizing: border-box;
		&:last-child {
			h4 {
				color: $color-text-d;
			}
			p { 
				text-align: center;
			}
			figure {
				margin: 0 auto;
				width: 120px;
				height: 120px;
				overflow: hidden;
				img {
					width: 120px;
					min-height: 120px;
				}
			}
		}
		.time-line {
			position: relative;
			ul{

				&:last-child {
					position: absolute;
					left: 50%;
					top: 0;
					transform: translate3d(-50%, 0,0);
					li {
						display: block;
						height: 70px;
						i {
							padding: 2px;
							background: $color-background;
							&.active {
								color: $color-theme-d;
							}
						}
					}
				}
				li {
					display: flex;
					&:nth-of-type(2n-1) {
						div:nth-of-type(2n-1) {
							border-right: 1px solid $color-text-ll;
							/* padding-right: 10px; */
						}

					}
					&:nth-of-type(2n) {
						div:nth-of-type(2n) {
							border-left: 1px solid $color-text-ll;

						}
					}
					div {
						flex: 1;
						height: 70px;
						&:first-child {
							text-align: right;
							padding-right: 10px;
						}
						&:last-child {
							padding-left: 10px;
						}
						h4 {
							color: $color-text-d;
							padding-bottom: 6px;
							position: relative;
							i {
								position: absolute;
							}
						}
					}
				}
			}
			
		}
		h2 {
			font-size: $font-size-large;
			color: $color-text-d;
			line-height: 1.5;
			padding-bottom: 20px;
			strong {
				color: $color-theme;
			}
		}
		h4 {
			text-align: center;
			line-height: 2.5;
			padding-bottom: 14px;
		}
		figure {
			width: 240px;
			height: 240px;
			overflow: hidden;
			margin: 0 auto 20px;
			img {
				width: 100%;
			}
		}
		p {
			line-height: 1.5;
			padding-bottom: 20px;
			&:last-child {
				padding-bottom: 0;
			}
		}
	}
	> .contain {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 44px;
		&:first-child {
			background-image: url('~assets/images/bg.jpg');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			position: relative;
			color: $color-background-d;
			
			.logos {
				width: 100%;
				position: absolute;
				bottom: 60px;
				display: flex;
				flex-direction: column;
				justify-content: center;

				ul {
					display: flex;
					padding-left: 20px;
					li {
						&:first-child {
							padding-right: 16px;
							font-size: $font-size-medium-x;
							white-space: nowrap;
						}
						div {
							display: flex;
							align-items: center;
							margin-bottom: 10px;
							figure {
								flex: 0 0 60px;
								margin-right: 10px;
								img {
									width: 100%;
								}
							}
							p {
								white-space: nowrap;
							}
						}
					}
				}
			}

		}
	}
}

</style>