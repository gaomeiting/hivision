<template>
<transition name="fade" mode="out-in">
	<div class="page">
		<div class="form-wrap">
			<sub-title title="绑定手机号"></sub-title>
			<div class="form-content">
				<p class="item">
					<input type="text" v-model="form.tel" placeholder="请输入您的手机号">
				</p>
				<p class="item">
					<input type="text" v-model="form.code" placeholder="请输入验证码">
					<a class="btn" href="javascript:;" @click.stop="getCode">{{tip}}</a>
				</p>
				<p class="item">
					<a class="btn btn-all" href="javascript:;" @click.stop.prevent="handleSubmit" >下一步</a>
				</p>
			</div>
			<part title="重要提示" paragraph="Mint UI 包含丰富的 CSS 和 JS 组件，能够满足日常的移动端开发需要。通过它，可以快速构建出风格统一的页面，提升开发效率。"></part>
			
		</div>

	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import SubTitle from '~/components/htitle/htitle'
import Part from '~/components/part/part'
import { Message } from 'element-ui'
import { postData } from '~/api/api'
	export default {
		data() {
			return {
				form: {
					tel: '',
					code: ''
				},
				timer: null,
	            tip: '获取验证码',
	            flag: true,
			}
		},
		mounted() {
			 
		},
		methods: {
			handleSubmit () {
	            if(/^1[34578]\d{9}$/.test(this.form.tel) == false){
	            	Message({
			          message: "请输入正确的手机号",
			          type: 'error'
			        });
	                //Message.error("请输入正确的手机号", '');
	            }
	            else if(!this.form.code) {
	            	Message({
			          message: "请输入正确的验证码",
			          type: 'error'
			        });
	            }
	            else {
	            	///narrator/current/mobile
	            	if(this.timer) this.timer = null;
	            	postData('/api/bind/binding.json',{
	                    mobile: this.form.tel,
  						vcode: this.form.code
	                }).then(res => {
	                	console.log(res)
	                    //this._switchPage()
	                }).catch(err => {
	                    console.log(123)
	                })
	            	
	            }
	        },
			getCode() {
	             if(/^1[34578]\d{9}$/.test(this.form.tel) == false){
	             	Message({
			          message: "请输入正确的手机号",
			          type: 'error'
			        });
	            }else{
	                //禁止重复点击
	                if(!this.flag) {
	                	Message({
				          message: "请求已发送请不要重复点击",
				          type: 'error'
				        });
	                    return;
	                }
	                this.flag=false;
	                this._timer()
	                postData('/api/bind/vcode.json', {
	                	mobile: this.form.tel
	                }).then(res => {
	                	Message({
				          message: "验证码发送成功",
				          type: 'success'
				        });
	                }).catch(err => {
	                	console.log(err)
	                })
	                /*this._regist('/api/user/regist/vcode', {
	                    mobile: this.form.tel
	                }).then(res => {
	                    console.log(res)
	                }).catch(err => {
	                    console.log(err)
	                    if(this.timer) {
	                        clearInterval(timer)
	                        this.tip="获取验证码"
	                        this.flag=true;
	                    }
	                })*/
	            }
	        },
	        _timer() {
	            let time = 5;
	            clearInterval(this.timer);
	            setInterval(() => {
	                if(time<= 0) {
	                    time = 0;
	                    if(this.timer) clearInterval(this.timer);
	                    return;
	                }
	                time--;
	                this.tip = `${time}s`
	                if(time < 1) {
	                    clearInterval(this.timer)
	                    this.tip="获取验证码"
	                    this.flag=true;
	                }
	            },1000)
	        },
	        _switchPage() {
	        	this.$router.push('/addForm')
	        }

		},
		components: {
			SubTitle,
			Part
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	padding: 16px;
}
.form-wrap {
	border: 1px solid $color-text-ll;
	background: $color-background-d;
	padding: 10px 16px 30px;
	border-radius: 5px;
	
	.form-content {
		padding: 16px 0;
		@include dashed-1px($color-text-ll);
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			&:first-of-type {
				input {
					margin-right: 0;
				}
			}
			input {
				flex: 1;
				border: 1px solid $color-text-ll;
				border-radius: 4px;
				margin-right: 10px;
				padding: 12px 0;
			}
			.btn {
				color: $color-background-d;
				line-height: 44px;
				height: 44px;
				background: $color-theme;
				border-radius: 4px;
				width: 7em;
				text-align: center;
				&.btn-all {
					display: block;
					width: 100%;
					text-align: center;
				}
			}
		}
	}
}

</style>