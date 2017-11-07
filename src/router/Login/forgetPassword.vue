<template>
  <main class="uc-login">
    <div>
      <header>忘记密码</header>

      <div class="step1" v-if="showStep == 1">
        <uc-form class="form" :rForm="rForm" :dForm="dForm" :rrules="rules" ref="form1"></uc-form>
        <el-button type="primary" class="btn" @click="sendEmail()">发送邮件</el-button>
      </div>

      <div class="step2" v-if="showStep == 2">
        <p class="msg">邮件已发送至</p>
        <p class="email">{{email}}</p>
        <p class="msg">请查收并确认</p>

        <!--<div @click="go()">   忘记密码的修改密码？</div>-->
      </div>

      <div class="step1" v-if="showStep == 3">
        <uc-form class="form" :rForm="thirdrForm" :dForm="thirddForm" :rrules="thirdrules" ref="form2"></uc-form>
        <el-button type="primary" class="btn" @click="sendEmail()">确认修改</el-button>
      </div>

    </div>

  </main>
</template>

<script>
  import { Button } from 'element-ui';
  import {CONSTANT} from '../../util/constant';
  import { _loginIn,_forgetPassword } from '../../util/ajax';
  import Form from '~packages/form/form.vue';
  export default {
    data () {
      return {
        showStep:1,                         //默认显示第一个tab
        email:"",          //邮件
        //step1中的数据
        rForm: {
          username: '',
        },
        dForm: [
          {
            type: 'input',
            key: 'username',
            label: '用户名',
            placeholder: '请输入用户名'
          }
        ],
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        },
        //step3中的数据
        thirdrForm: {
          password: '',
          repassword: '',
        },
        thirddForm: [
          {
            type: 'password',
            key: 'password',
            label: '密码',
            placeholder: '请输入密码'
          },
          {
            type: 'password',
            key: 'repassword',
            label: '确认密码',
            placeholder: '请再次请输入密码'
          }
        ],
        thirdrules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          repassword:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        },
      };
    },
    components: {
      ElButton: Button,
      UcForm: Form
    },
    methods: {

      //发送邮件
      sendEmail(){
        var _this = this;
        var paramsFirst = {
          userName:_this.rForm.username
        };
//        console.log(paramsFirst);
        this.$refs.form1.$refs.ruleForm.validate(valid => {
          if (valid) {
            _forgetPassword(paramsFirst).then(function (response) {
              console.log(response);
              var data = response.data;

              if (data.status) {
                 _this.showStep = 2;
                 _this.email = data.data.email

              } else {
                CONSTANT.methods.tips(data.error_msg || '发送邮件失败!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(""+res || '发送邮件异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      },
      go(){
        location.href = location.origin + '/#/changePassword';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .uc-login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("../../images/bg.jpg");}
  .uc-login > div{
     width: 300px;
     position: absolute;
     left: 50%;
     top: 50%;
     height: 300px;
     transform: translate(-50%,-50%);
     transform-origin: 0;
     border-radius: 15px;
     background-color: white;
     overflow: hidden;
     padding: 30px 40px;
     box-shadow: 0 0 20px rgba(101, 99, 99, 0.9);}

  .uc-login > div >header{
     font-size: 24px;
     color: #4c4c4c;
     font-weight: 700;
     margin-top: 0;
     margin-bottom: 22px;
   }
  .uc-login > div > .step1 >.form{
    margin-top: 60px;
     padding: unset;
   }
  .uc-login > div > p{
     font-size: 12px;
     text-align: right;
     margin-bottom: 15px;
     cursor: pointer;}
  .uc-login > div > p:hover{
     color: #20a0ff;
   }
  .btn{
     width: 100%;
   }
  .uc-login > div > .step2{
    margin-top: 60px;
  }
  .uc-login > div > .step2 > p{
    text-align: center;
    line-height: 35px;
    font-size: 18px;
    color: #4c4c4c;
  }
  .uc-login > div > .step2 > .email{
    color: #20a0ff;
  }
</style>