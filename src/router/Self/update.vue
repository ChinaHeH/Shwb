<template>
  <main class="uc-user-update">
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" ref="userForm"></uc-form>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getUserInfo, _updateUserInfo } from '../../util/ajax';
  import Form from '~packages/form/form.vue';

  export default {
    data () {
      return {
        rForm: {
          userName: '',
          email: ''
        },
        dForm: [],
        rules: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      };
    },
    components: {
      UcForm: Form
    },
    methods: {
      getUserInfo () {
        var _this = this;

        _getUserInfo().then(function (response) {
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

        //  用户姓名
        dForm.push({
          type: 'input',
          key: 'userName',
          label: '用户名',
          placeholder: '请输入用户名',
          disabled: true
        });
        //  邮箱
        dForm.push({
          type: 'input',
          key: 'email',
          label: '邮箱',
          placeholder: '请输入邮箱地址'
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
        this.rForm.email = data.email;
      },
      formSubmit (_this) {
        _this.$refs.userForm.$refs.ruleForm.validate(valid => {
          if (valid) {
            _updateUserInfo({email: _this.$refs.userForm.ruleForm.email}).then(function (response) {
              var data = response.data;

              if (data.status) {
                location.href = location.origin + '/#/personinfo';
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
      this.getUserInfo();
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss" scoped>

</style>