<template>
  <main>
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" ref="customerForm"></uc-form>
  </main>
</template>

<script>
  import {CONSTANT, reg} from '../../util/constant';
  import { _addCustomer } from '../../util/ajax';
  import Form from '~packages/form/form.vue';

  export default {
    data () {
      var validateTelphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司电话'));
        } else if (!reg.telphone.test(value) && !reg.cellphone.test(value)) {
          callback(new Error('请输入正确的固话或者手机号码'));
        } else {
          callback();
        }
      };
      var validateCellphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司电话'));
        } else if (!reg.cellphone.test(value)) {
          callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }
      };
      var dForm = [{
        type: 'input',
        key: 'customerName',
        label: '客户名称',
        placeholder: '请输入客户名称'
      },
      {
        type: 'input',
        key: 'address',
        label: '客户地址',
        placeholder: '请输入客户地址'
      },
      {
        type: 'input',
        key: 'phone',
        label: '公司电话',
        placeholder: '请输入公司电话'
      },
      {
        type: 'input',
        key: 'contactName',
        label: '联系人',
        placeholder: '请输入联系人'
      },
      {
        type: 'input',
        key: 'contactPhone',
        label: '联系电话',
        placeholder: '请输入联系电话'
      },
      {
        type: 'radio',
        key: 'showFlg',
        label: '展示状态',
        options: [{
          label: '展示',
          value: '1'
        }, {
          label: '不展示',
          value: '2'
        }]
      }];

      //  登录名
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
      //  上传图片
      dForm.push({
        type: 'uploadfile',
        key: 'logo',
        uploaderFilesObj: {
          label: '上传logo图片',
          required: true,
          selectId: 'logo_uploader',
          dropId: 'logo_container',
          total: 1,
          mimeTypes: [{title: 'Image files', extensions: 'jpg,jpeg,gif,png'}],
          multiSelection: false,
          files: [],
          showTip: false,
          tips: '请选择上传logo图片'
        }
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
          customerName: '',
          address: '',
          phone: '',
          contactName: '',
          contactPhone: '',
          showFlg: '',
          userName: '',
          password: '',
          email: '',
          logo: ''
        },
        dForm: dForm,
        rules: {
          customerName: [
            { required: true, message: '客户名称不能为空', trigger: 'blur, change' },
            { min: 1, max: 20, message: '客户名称长度为1~20', trigger: 'blur, change' }
          ],
          address: [
            { required: true, message: '客户地址不能为空', trigger: 'blur, change' },
            { min: 1, max: 200, message: '客户地址长度为1~200', trigger: 'blur, change' }
          ],
          phone: [
            { required: true, message: '公司电话不能为空', trigger: 'blur, change' },
            { validator: validateTelphone, message: '请输入正确的公司电话', trigger: 'blur, change' }
          ],
          contactName: [
            { required: true, message: '联系人不能为空', trigger: 'blur, change' },
            { min: 1, max: 20, message: '联系人长度为1~20', trigger: 'blur, change' }
          ],
          contactPhone: [
            { required: true, message: '联系电话不能为空', trigger: 'blur, change' },
            { validator: validateCellphone, message: '请输入正确的联系电话', trigger: 'blur, change' }
          ],
          showFlg: [
            { required: true, message: '请选择展示状态', trigger: 'change' }
          ],
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
        var uploadfile = _this.$refs.customerForm.$refs.uploadfile[0];
        var files = uploadfile.uploaderFiles.files;
        var flag = false;
        var params = {};

        if (files.length <= 0) {
          flag = false;
          uploadfile.uploaderFiles.showTip = true;
        } else {
          flag = true;
          uploadfile.uploaderFiles.showTip = false;
        }

        _this.$refs.customerForm.$refs.ruleForm.validate(valid => {
          if (valid && flag) {
            var password = CONSTANT.methods.MD5Methods({username: _this.$refs.customerForm.ruleForm.userName, password: _this.$refs.customerForm.ruleForm.password});

            params = {
              customerName: _this.$refs.customerForm.ruleForm.customerName,
              address: _this.$refs.customerForm.ruleForm.address,
              phone: _this.$refs.customerForm.ruleForm.phone,
              contactName: _this.$refs.customerForm.ruleForm.contactName,
              contactPhone: _this.$refs.customerForm.ruleForm.contactPhone,
              showFlg: _this.$refs.customerForm.ruleForm.showFlg,
              logo: files[0].url.split('?imageView2')[0],
              userName: _this.$refs.customerForm.ruleForm.userName,
              password: password,
              email: _this.$refs.customerForm.ruleForm.email
            };
            _addCustomer(params).then(function (response) {
              var data = response.data;

              if (data.status) {
                location.href = location.origin + '/#/customerlist';
              } else {
                CONSTANT.methods.tips(data.error_msg || '新增客户成功!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(res || '新增客户成功异常!', '提示');
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

</style>