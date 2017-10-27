<template>
  <main class="uc-home-edit">
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" ref="companyForm"></uc-form>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _updateCompanyProfile, _getCompanyProfile } from '../../util/ajax';
  import Form from '~packages/form/form.vue';

  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司简介'));
        } else if (value.length > 1024) {
          callback(new Error('公司简介长度不等超过1024(不区分汉字字母)'));
        } else {
          callback();
        }
      };
      var dForm = [];

      //  公司简介
      dForm.push({
        type: 'textarea',
        key: 'word',
        label: '公司简介',
        placeholder: '请输入公司简介',
        class: 'uc-form-textarea'
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
          word: ''
        },
        dForm: dForm,
        rules: {
          word: [
            { required: true, message: '公司简介不能为空', trigger: 'blur, change' },
            { validator: validatePass, trigger: 'blur, change' }
          ]
        }
      };
    },
    components: {
      UcForm: Form
    },
    methods: {
      getCompanyProfile () {
        var _this = this;

        _getCompanyProfile().then(function (response) {
          var data = response.data;

          if (data.status) {
            _this.rForm.word = data.data.word;
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取公司首页简介信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取公司首页简介信息异常!', '提示');
        });
      },
      formSubmit (_this) {
        var params = {
          word: _this.$refs.companyForm.ruleForm.word
        };

        _this.$refs.companyForm.$refs.ruleForm.validate(valid => {
          if (valid) {
            _updateCompanyProfile(params).then(function (response) {
              var data = response.data;

              if (data.status) {
                CONSTANT.methods.tips('更新公司简介成功!', '提示', function (value) {
                  if (value === 'confirm') {
                    location.href = location.origin + '/#/companyinfo';
                  }
                });
              } else {
                CONSTANT.methods.tips(data.error_msg || '更新公司简介失败!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(res || '更新公司简介异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      }
    },
    mounted () {
      this.getCompanyProfile();
    }
  };
</script>
<style lang="scss" scoped>
 .uc-form-textarea{
   >textarea{
     height: 300px;
   }

 }
</style>