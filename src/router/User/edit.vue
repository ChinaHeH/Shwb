<template>
  <main class="uc-user-update">
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" ref="userForm"></uc-form>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getUser, _updateUser } from '../../util/ajax';
  import Form from '~packages/form/form.vue';

  export default {
    data () {
      return {
        rForm: {
          userName: '',
          password: '',
          email: ''
        },
        dForm: [],
        rules: {
          userName: [
            { required: true }
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
      getUser () {
        var _this = this;

        var params = {
          id: _this.$route.params.id
        };

        _getUser(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            _this.dealData(data.data);
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取用户信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取用户信息异常!', '提示');
        });
      },
      dealData (data) {
        var dForm = [];

        //  用户名
        dForm.push({
          type: 'input',
          key: 'userName',
          label: '用户名',
          placeholder: '请输入用户名',
          disabled: true
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
        this.dForm = dForm;
        this.rForm.userName = data.userName;
        this.rForm.password = data.password;
        this.rForm.email = data.email;
      },
      formSubmit (_this) {
        _this.$refs.userForm.$refs.ruleForm.validate(valid => {
          if (valid) {
            var password = CONSTANT.methods.MD5Methods({username: _this.$refs.userForm.ruleForm.userName, password: _this.$refs.userForm.ruleForm.password});

            var params = {
              id: _this.$route.params.id,
              password: password,
              email: _this.$refs.userForm.ruleForm.email
            };

            _updateUser(params).then(function (response) {
              var data = response.data;

              if (data.status) {
                location.href = location.origin + '/#/userlist';
              } else {
                CONSTANT.methods.tips(data.error_msg || '修改个人信息失败!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(res || '修改个人信息异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      }
    },
    mounted () {
      this.getUser();
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