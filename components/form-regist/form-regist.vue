<template>
    <section class="form-wrap">
        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <el-form-item prop="name">
                <el-input v-model="formValidate.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="code" inline="true">
                <el-row>
                    <el-col :span='15'>
                        <el-input v-model="formValidate.code" placeholder="请输入验证码"></el-input>
                    </el-col>
                    <el-col :span='3'>&nbsp;</el-col>
                    <el-col :span='6'>
                        <p style="line-height: 38px; color: #3cc8b4; text-align:center; height: 38px; border: 1px solid #3cc8b4" @click.stop="getCode">{{tip}}</p>
                    </el-col>
                </el-row>
                
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input type='password' v-model="formValidate.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="pwdRepeat">
                <el-input type='password' v-model="formValidate.pwdRepeat" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="checked" style="text-align: right">
                <el-checkbox v-model="formValidate.checked">我已阅读并同意叮当配条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%; box-sizing: border-box" type="primary" @click.stop="handleSubmit('formValidate')">注册</el-button>
            </el-form-item>
        </el-form>
        <p style="text-align:center;"><nuxt-link to="/login">已有帐号？请登录</nuxt-link></p>
    </section>
</template>

<script>
import axios from '~/http';
export default {
    props: {
        userType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            formValidate: {
                name: '',
                code: '',
                pwd: '',
                pwdRepeat: '',
                checked: true
                
            },
            timer: null,
            tip: '获取验证码',
            flag: true,
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    {validator:function(rule,value,callback) {
                        if(/^1[34578]\d{9}$/.test(value) == false){
                            callback(new Error("请输入正确的手机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                pwdRepeat: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    {validator:(rule,value,callback) => {
                        if(this.formValidate.pwd !== value){
                            callback(new Error("两次密码输入不一致"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ],
                checked: [
                    {validator:function(rule,value,callback) {
                        if(!value){
                            callback(new Error("您还没有同意叮当配协议"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ]
            }
          
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const formValidate = this.formValidate;
                    this. _regist('/api/user/regist', { mobile : formValidate.name, password: formValidate.pwd, userType : this.userType, vcode: formValidate.code })
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        getCode() {
             if(/^1[34578]\d{9}$/.test(this.formValidate.name) == false){
                this.$Message.error("请输入正确的手机号");
            }else{
                //禁止重复点击
                if(!this.flag) {
                    this.$Message.error('请求已发送请不要重复点击');
                    return;
                }
                this.flag=false;
                this._timer()
                this._regist('/api/user/regist/vcode', {
                    mobile: this.formValidate.name
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                    if(this.timer) {
                        clearInterval(timer)
                        this.tip="获取验证码"
                        this.flag=true;
                    }
                })
            }
        },
        _timer() {
            let time = 60;
            clearInterval(this.timer);
            setInterval(() => {
                time--;
                this.tip = `${time}s`
                if(time < 0) {
                    clearInterval(timer)
                    this.tip="获取验证码"
                    this.flag=true;
                }
            },1000)
        },
        _regist( url, params) {
            return axios.post(url, params).then(res => {
                return Promise.resolve(res.data)
            }).catch(err => {
                return Promise.reject(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.form-wrap {
    width: 80%;
}
</style>