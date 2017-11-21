<template>
         <div class="login" @keydown.enter="loginSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="loginData" :rules="ruleValidate">
                        <FormItem prop="userName">
                            <Input v-model="loginData.loginId">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input v-model="loginData.loginPassword">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="loginSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入正确用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5'
export default {
    data () {
        return {
            loginLoading:false,
            loginData: {
                loginId: '',
                loginPassword: ''
            },
            ruleValidate: {
                loginId: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                ],
                loginPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    props:['loading'],
    methods: {
        loginSubmit() {
            let _this=this
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loginLoading=true
                    if(this.loginData.loginId=='admin'&&this.loginData.loginPassword=='admin'){
                        this.loginLoading=false
                            this.$Message.success('登录成功!')
                            this.$Notice.open({
                                title: '登录成功',
                                desc: '欢迎回来！',
                                duration: 3
                            })
                            // this.$store.state.hasLogin=true
                            sessionStorage.setItem("hasLogin", 'yes')
                            // this.$store.commit('setHasLogin',true)
                            this.$router.push('/home')
                    }else{
                        this.loginLoading=false
                        this.$Message.error('用户名或密码失败!请重新登录')
                    }
                    //  console.log(returnCitySN["cip"]+','+returnCitySN["cname"])  
                    // let data={
                    //     loginId:this.loginData.loginId,
                    //     loginPassword:md5(this.loginData.loginPassword)
                    //     }
                    // console.log(md5(this.loginData.loginPassword))
                    // this.$http.post('/api/userInfor/adminLogin',qs.stringify(data)).then(response => {
                    //     if(response.data.code===200){
                    //         this.loginLoading=false
                    //         this.$Message.success('登录成功!')
                    //         this.$Notice.open({
                    //             title: '登录成功',
                    //             desc: '欢迎回来！',
                    //             duration: 3
                    //         })
                    //         // this.$store.state.hasLogin=true
                    //         sessionStorage.setItem("hasLogin", 'yes')
                    //         // this.$store.commit('setHasLogin',true)
                    //         this.$router.push('/home')
                    //     }else{
                    //         this.loginLoading=false
                    //         this.$Message.error('用户名或密码失败!请重新登录')
                    //     }
                    // },error =>{
                    //         this.loginLoading=false
                    //         this.$Message.error('服务器连接失败！')
                    // })
                } else {
                    this.$Message.error('输入格式有误!');
                    this.loginLoading=false
                }
            })
        }
    },
    mounted () {
        // if(sessionStorage['hasLogin']==='yes'){
        //     this.$router.push('/home');
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,body{
    height:100%!important
}
.login{
    width: 100%;
    height: 100%;
    background: url(../assets/img/bg_person.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    }
.login-con{
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
}
.login-header{
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
}

.login .form-con{
    padding: 10px 0 0;
}
 .login .login-tip{
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
}
</style>
