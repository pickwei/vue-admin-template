<template>
    <div>
        <section class="content-header">
        <h1>
            用户列表
        </h1>
        </section>
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div style="margin: 10px;overflow: hidden">
                                <Input v-model="keyword" placeholder=" 订单号/油卡号/手机号" style="width: 200px" size='large'></Input>
                                <Button type="primary" icon="ios-search" @click='search' size='large'>搜索</Button>
                            </div>
                            <Tabl
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
        </section>
    </div>
</template>
<script>
    // import qs from 'qs';
    export default {
        data () {
            return {
            }
        },
        props:['loading'],
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.rechareBtnLoding=true
                        // this.$Message.success('验证通过!');
                        this.oilCardRecharge()
                    } else {
                        this.rechareBtnLoding=false
                        this.$Notice.info({
                            title: '提示',
                            desc: '请认真填写相关充值信息',
                            duration: 4
                        });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            oilCardRecharge(){
                var _this=this;
                let data={  
                            memberId:5528411,//默认
                            orderNumber:this.formValidate.orderNumber,
                            oilCardNumber:this.formValidate.oilCardNumber,
                            payPrice:1200,//默认
                            cardType:1,//默认
                            orderId:this.formValidate.orderId,
                            ProId:100014,//默认
                            MobilePhoneNumber:this.formValidate.MobilePhoneNumber
                         }
                this.$http.post('/api/Oidcard/payOilCardNew',data).then(response => {
                   let msg=response.data
                   console.log(msg)
                   console.log(msg.status)
                    this.rechareBtnLoding=false
                   if(msg.status===200){
                        // this.$Notice.success({
                        //     title: '订单已成功提交 胡涛工程师！',
                        //     duration: 2
                        // });
                         this.$Modal.success({
                            title: '提示',
                            content: '充值订单提交成功',
                            okText:'知道了'
                        });
                   }else if(msg.status===201){
                        // this.$Notice.warning({
                        //     title: '没有此订单信息！',
                        //     duration: 2
                        // });
                        this.$Modal.error({
                            title: '提示',
                            content: '充值订单提交失败',
                            okText:'知道了'
                        });
                   }else if(msg.status===501){
                        // this.$Notice.warning({
                        //     title: '订单号或油卡号缺失！',
                        //     duration: 2
                        // });
                        this.$Modal.error({
                            title: '提示',
                            content: '充值订单提交参数错误',
                            okText:'知道了'
                        })
                   }
                },error=>{
                    this.$Notice.error({
                            title: '服务器连接失败！',
                            duration: 0
                    })
                })
            }
        }
    }
</script>
<style lang="css" scoped>
</style>