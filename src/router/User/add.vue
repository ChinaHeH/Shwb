<template>
  <main class="uc-slider-add">
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" ref="userForm"></uc-form>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _addUser } from '../../util/ajax';
  import Form from '~packages/form/form.vue';

  export default {
    data () {
      var dForm = [];

      //  用户名
      dForm.push({
        type: 'input',
        key: 'userName',
        label: '用户名',
        placeholder: '请输入用户名'
      });
      //  密码
      dForm.push({
        type: 'password',
        key: 'password',
        label: '密码',
        placeholder: '请输入密码'
      });
      //  邮箱
      dForm.push({
        type: 'input',
        key: 'email',
        label: '邮箱',
        placeholder: '请输入邮箱'
      });
      //  提交按钮
      dForm.push({
        type: 'button',
        btnType: 'primary',
        key: 'button',
        label: '确定',
        click: () => {
          this.formSubmit(this);
        }
      });
      return {
        rForm: {
          userName: '',
          password: '',
          email: ''
        },
        dForm: dForm,
        rules: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur, change' },
            { min: 1, max: 20, message: '用户名长度为1~20', trigger: 'blur, change' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur, change' },
            { min: 6, max: 16, message: '密码长度为6~16', trigger: 'blur, change' }
          ],
          email: [
            { required: true, message: '邮箱地址不能为空', trigger: 'blur, change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
          ]
        }
      };
    },
    components: {
      UcForm: Form
    },
    methods: {
      formSubmit (_this) {

        var params = {};

        _this.$refs.userForm.$refs.ruleForm.validate(valid => {
          if (valid) {
            var password = CONSTANT.methods.MD5Methods({username: _this.$refs.userForm.ruleForm.userName, password: _this.$refs.userForm.ruleForm.password});

            params = {
              userName: _this.$refs.userForm.ruleForm.userName,
              password: password,
              email: _this.$refs.userForm.ruleForm.email
            };
            _addUser(params).then(function (response) {
              var data = response.data;

              if (data.status) {
                location.href = location.origin + '/#/userlist';
              } else {
                CONSTANT.methods.tips(data.error_msg || '新增用户成功!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(res || '新增用户成功异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      }
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: center!important;
  }
</style>
<style lang="scss" scoped>

</style>