<template>

	<div>
		<error v-if="errMsg" :error="errMsg" :key="1"></error>
		<div v-else class="form-wrap" :key="0">
			<div class="avatar-wrap">
				<p>上传头像</p>
				<el-upload class="avatar-uploader" action="/api/media/avatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
			<div class="form-content">
				
				<p class="item">昵称/团队名称</p>
				<p class="item">
					<input type="text" v-model="form.title" placeholder="对外显示使用,个人填写昵称,团队填写团队名称">
				</p>
				<p class="item">真实姓名</p>
				<p class="item">
					<input type="text" v-model="form.name" placeholder="真实姓名,团队填写负责人,后续获奖联系使用">
				</p>
				<p class="item">身份证号</p>
				<p class="item">
					<input type="text" v-model="form.identity" placeholder="不对外显示,仅作为后续获奖证明身份使用">
				</p>
				<p class="item">手机号码</p>
				<p class="item">
					<input type="tel" v-model="form.tel" placeholder="请输入手机号码,将作为确认你身份的重要依据">
				</p>
				<p class="item">电子邮箱</p>
				<p class="item">
					<input type="text" v-model="form.email" placeholder="请输入您常用邮箱,方便我们后续与你联系">
				</p>
				<p class="item">个人/团队简介</p>
				<p class="item">
					<input type="text" v-model="form.info" placeholder="例如:专业配音主播,第三届金嗓子大赛获得者">
				</p>
				<p class="item">参赛宣言</p>
				<p class="item">
					<input maxlength="16" type="text" v-model="form.declaration" placeholder="请输入自己的参赛宣言(16字以内)">
				</p>
				<p class="item">
					<a class="btn btn-all" href="javascript:;" @click="submitHandler">确认报名</a>
				</p>
			</div>
			<top-tip ref="topTip">
				<p class="top-tip-text">{{error}}</p>
			</top-tip>
			
		</div>
	</div>

</template>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import TopTip from '~/components/top-tip/top-tip'
import Error from '~/components/error/error'
import { Message } from 'element-ui'
import { postData } from '~/api/api'
	export default {
		data() {
			return {
				/*form: {
					title: '上海',
					name: '高山',
					identity: '130833199401230664',
					tel: '18201491299',
					email: '1959151877@qq.com',
					info: '16岁（含）以上配音员以及声音条件良好的配',
					declaration: '16岁（含）以上配音员以及声音条',
					avatarId: ''
				},*/
				form: {
					title: '',
					name: '',
					identity: '',
					tel: '',
					email: '',
					info: '',
					declaration: '',
					avatarId: ''
				},
				error: '',
				text: '',
				imageUrl: '',
				errMsg: ''
				
			}
		},
		created() {
			
		},
		computed: {
			...mapGetters(['city'])
		},

		methods: {
			handleAvatarSuccess(res, file) {
				//console.log(res, file)
				this.form.avatarId = file.response.url;
			    this.imageUrl = URL.createObjectURL(file.raw);
			    console.log(file, res)
			},
			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg' || 'image/png';
				const isLt5M = file.size / 1024 / 1024 < 5;
				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG或png 格式!');
				}
				if(!isLt5M) {
					this.$message.error('上传头像图片大小不能超过5M');
				}
				return isJPG && isLt5M;
			},
			settingCity(item) {
				this.form.city = item.NAME;
			},
			switchCity() {
				this.$router.push('/city')
			},
			submitHandler() {
				let isIDCard=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				let isName = /^([\u4e00-\u9fa5]){2+}$/
				let isTitle = /^[\w\u4e00-\u9fa5]{6,8}$/
				console.log(this.form.avatarId)
				if(!this.form.avatarId) {
					this.error = "请先上传头像"
					this.$refs.topTip.show()
				}
				else if(!this.form.title) {
					this.error = "昵称不能为空"
					this.$refs.topTip.show()
				}
				else if(!this.form.name) {
					this.error = '姓名不能为空'
					this.$refs.topTip.show()
				}
				else if(isName.test(this.form.isName)) {
					this.error = '请填写正确的姓名格式'
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
				else if(!this.form.tel) {
					this.error = '手机号码不能为空'
					this.$refs.topTip.show()
				}
				else if(/^1[34578]\d{9}$/.test(this.form.tel) == false) {
					this.error = '手机号码格式不正确'
					this.$refs.topTip.show()
				}
				else if(!this.form.email) {
					this.error = '邮箱不能为空'
					this.$refs.topTip.show()
				}
				else if(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z]{2,5}$/.test(this.form.email) == false) {
					this.error = '请输入正确的邮箱格式'
					this.$refs.topTip.show()
				}
				else if(!this.form.info) {
					this.error = '个人团队简介不能为空'
					this.$refs.topTip.show()
				}
				else if(!this.form.declaration) {
					this.error = '参赛宣言不能为空'
					this.$refs.topTip.show()
				}

				else {
					this.error = ''
					postData('/api/contestant/signup', {
					  avatar: this.form.avatarId,
					  email: this.form.email,
					  idCard: this.form.identity,
					  mobile: this.form.tel ,
					  nickname: this.form.title ,
					  realname: this.form.name ,
					  slogan: this.form.declaration ,
					  title: this.form.info
					}).then(res => {

						/*this.setUser({
							id: res.id,
							name: this.form.title,
							declaration: this.form.declaration
						})
						let str = JSON.stringify({
							id: res.id,
							name: this.form.title,
							declaration: this.form.declaration
						}) 

						localStorage.setItem('user', str) */
						this.$router.push(`/success/${res.id}`)
						/*window.alert(localStorage.user)*/
					}).catch(err => {
						
						if(err.data.status == 409) {
							this.error = '数据重复'
							this.$refs.topTip.show()
						}
						else if(err.data.details) {
							this.error = err.data.details[0].defaultMessage
							this.$refs.topTip.show()
						}
						else {
							this.errMsg = `${err.data.status}${err.data.error}`
						}

					})
					
				}
			},
			confirm() {
				this.$router.push('/bind')
			},
			testIndentity(indentity) {
				let isIDCard=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				if(isIDCard.test(indentity) == false) {
					this.error = '身份证号格式不正确'
					this.$refs.topTip.show()
					return false
				}
				else {
					return true
				}
			},
			
			
			
	        ...mapMutations({
	        	'setUser' : 'SET_USER'
	        })

		},
		components: {
			TopTip,
			Error
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
			&:nth-of-type(2n) {
				@include border-1px($color-text-ll);
			}
			&:last-of-type {
				padding-top: 16px;
			}
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
.avatar-wrap {
	margin: 0 auto;
	p {
		line-height: 2;
		color: $color-text-d;
	}
	.avatar-uploader {
		width: 88px;
		margin: 0 auto;
	}
}
.avatar-uploader .el-upload {
display: inline-block;
border: 1px dashed #d9d9d9;
position: relative;
overflow: hidden;

}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 88px;
height: 88px;
line-height: 88px;
text-align: center;
border: 1px dashed #d9d9d9;
border-radius: 44px;
}
.avatar {
width: 88px;
height: 88px;
border-radius: 44px;
display: block;
}
</style>