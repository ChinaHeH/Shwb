<template>
  <main class="uc-login">
    <div>
      <header>上海百特后台管理</header>
      <uc-form class="form" :rForm="rForm" :dForm="dForm" :rrules="rules" ref="form1"></uc-form>
      <p>忘记密码？</p>
      <el-button type="primary" class="btn" @click="formSubmit()">登录</el-button>
    </div>

  </main>
</template>

<script>
  import { Button } from 'element-ui';
  import {CONSTANT} from '../../util/constant';
  import { _loginIn } from '../../util/ajax';
  import Form from '~packages/form/form.vue';
  export default {
    data () {
      return {
        rForm: {
          username: '',
          password: ''
        },
        dForm: [
          {
            type: 'input',
            key: 'username',
            label: '用户名',
            placeholder: '请输入用户名'
          }, {
            type: 'password',
            key: 'password',
            label: '密码',
            placeholder: '请输入密码'
          }
        ],
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
      ElButton: Button,
      UcForm: Form
    },
    methods: {
      formSubmit () {
        var _this = this;

        this.$refs.form1.$refs.ruleForm.validate(valid => {
          if (valid) {
            var password = CONSTANT.methods.MD5Methods({username: _this.$refs.form1.ruleForm.username, password: _this.$refs.form1.ruleForm.password});

            _loginIn({userName: _this.$refs.form1.ruleForm.username, password: password}).then(function (response) {
              var data = response.data;

              if (data.status) {
                window.EVENTVUE.$emit('userMenu', data.data);
                localStorage.setItem('menu', JSON.stringify(data.data.navigation));
                localStorage.setItem('jwtToken', data.data.jwtToken);
                location.href = location.origin + '/#/home';
              } else {
                CONSTANT.methods.tips(data.error_msg || '登录失败!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(res || '登录异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .uc-login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("../../images/bg.jpg");
    >div{
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
      box-shadow: 0 0 20px rgba(101, 99, 99, 0.9);
      >header{
        font-size: 24px;
        color: #4c4c4c;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 22px;
      }
      >.form{
        padding: unset;
      }
      >p{
        font-size: 12px;
        text-align: right;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover{
          color: #20a0ff;
        }
      }
      >.btn{
        width: 100%;
      }
    }
  }
</style>