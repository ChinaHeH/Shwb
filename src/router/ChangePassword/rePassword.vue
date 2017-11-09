<template>
  <main class="uc-login">
    <div>
      <uc-form class="form" :rForm="rForm" :dForm="dForm" :rrules="rules" ref="form1"></uc-form>
      <el-button type="primary" class="btn" @click="Submit()">确认修改</el-button>
    </div>

  </main>
</template>

<script>
  import { Button } from 'element-ui';
  import {CONSTANT} from '../../util/constant';
  import { _xiugaimima } from '../../util/ajax';
  import Form from '~packages/form/form.vue';
  export default {
    data () {
      return {
        rForm: {
          password: '',
          newPassword:'',
          rePassword : ''
        },
        dForm: [
          {
            type: 'password',
            key: 'password',
            label: '旧密码',
            placeholder: '请输入旧密码'
          }, {
            type: 'password',
            key: 'newPassword',
            label: '新密码',
            placeholder: '请输入新密码'
          },{
            type: 'password',
            key: 'reNewPassword',
            label: '确认新密码',
            placeholder: '确认新密码'
          }
        ],
        quanxian:"",
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          reNewPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    components: {
      ElButton: Button,
      UcForm: Form
    },
    mounted(){

    },
    methods: {
      Submit(){
        var _this = this;

        this.$refs.form1.$refs.ruleForm.validate(valid => {
          if (valid) {
//            console.log(_this.$refs.form1.ruleForm.password)
//            console.log(_this.$refs.form1.ruleForm.newPassword)
//            console.log(_this.$refs.form1.ruleForm.reNewPassword)
            if(_this.$refs.form1.ruleForm.newPassword != _this.$refs.form1.ruleForm.reNewPassword){
              CONSTANT.methods.tips('您两次输入的新密码不一致!', '提示');
            }else {
              console.log(JSON.parse(localStorage.getItem('userMenu')).userName)
              var oldpassword = CONSTANT.methods.MD5Methods({username:JSON.parse(localStorage.getItem('userMenu')).userName,password:_this.$refs.form1.ruleForm.password});
              var newpassword = CONSTANT.methods.MD5Methods({username:JSON.parse(localStorage.getItem('userMenu')).userName,password:_this.$refs.form1.ruleForm.newPassword});
              _xiugaimima({oldPassword:oldpassword,password:newpassword}).then(function (response) {
                var data = response.data;
                console.log("***************************");
                console.log(data);
                if (data.status) {
					CONSTANT.methods.tips(data.error_msg || '修改密码成功!', '确定',function(){
						_this.$refs.form1.ruleForm.password="";
						_this.$refs.form1.ruleForm.newPassword="";
						_this.$refs.form1.ruleForm.reNewPassword="";
					});
                } else {
                  CONSTANT.methods.tips(data.error_msg || '修改密码失败!', '提示');
                }
              }).catch(function (res) {
                CONSTANT.methods.tips(res || '修改密码异常!', '提示');
              });
            }
          } else {
            console.log('error submit!!');
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  .uc-login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f5f6f7;
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