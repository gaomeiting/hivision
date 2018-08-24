<template>

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
					<a class="btn btn-all" href="javascript:;" @click.stop.prevent="handleSubmit" >确定</a>
				</p>
			</div>
			<part title="重要提示" paragraph="请输入您报名参赛时候的手机号码，确认身份后即可进入个人中心，维护管理您的个人资料。"></part>
			
		</div>
</template>
<script type="text/ecmascript-6">
import SubTitle from 'base/htitle/htitle'
import Part from 'base/part/part'
import { Message } from 'element-ui'
import { postData } from 'api/api'
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
		head() {
			return {
				title: '与声俱来·声咖大赛'
			}
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
	            	if(this.timer) this.timer = null;
	            	postData('/api/bind/binding.json',{
	                    mobile: this.form.tel,
  						vcode: this.form.code
	                }).then(res => {
	                	this.$router.back()
	                    //this._switchPage(res)
	                }).catch(err => {
	                	this._handlerError(err);
	                    
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
	                	this._handlerError(err);
	                })
	                
	            }
	        },
	        _handlerError(err) {
	        	if(err && err.data) {
	        		if(err.data.status == 404) {
	        			this.$router.back()
	        			//this.$router.push('/profile')
	        		}
            		Message({
			          message: `${err.data.message}`,
			          type: 'error'
			        });

            	}
            	else {
            		Message({
			          message: '接口调试中',
			          type: 'error'
			        });
            	}
    		},
	        _timer() {
	            let time = 60;
	            clearInterval(this.timer);
	            this.timer = setInterval(() => {
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
	        _switchPage(id) {
	        	if(!id) {
	        		this.$router.push('/profile')
	        	}
	        	else {
	        		this.$router.push('/me')
	        	}
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