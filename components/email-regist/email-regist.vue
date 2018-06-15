<template>
    <section class="form-wrap">
        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <el-form-item prop="name">
                <el-input v-model="formValidate.name" placeholder="请输入邮箱名"></el-input>
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
export default {
    data() {
        return {
            formValidate: {
                name: '',
                pwd: '',
                pwdRepeat: '',
                checked: true
                
            },
            ruleValidate: {
                name: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
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
    created() {
        
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.formValidate)
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
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